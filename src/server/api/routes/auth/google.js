import config from '../../../config';
import crypto from 'crypto';
import * as authServices from '../../services/auth/google';
import jwt from 'jsonwebtoken';
import google from 'googleapis';
import Promise from 'bluebird';
const OAuth2 = google.auth.OAuth2;

const redirectUri = `http://${config.appHost}:${config.appPort}/auth/google/callback`;
const oauth2Client = new OAuth2(config.googleClientId, config.googleSecret, redirectUri);

export const googleAuthRoute = (userDataRepository)=> {
    // #TODO: check for repository
    return {
        method: 'POST',
        path: '/auth/google',
        config: {
            handler: async (request, reply)=> {
                const { payload: { code } } = request;
                try {
                    const getToken = Promise.promisify(oauth2Client.getToken.bind(oauth2Client));
                    const accessToken = (await getToken(code)).access_token; // QUESTION: fragile?

                    await authServices.validateToken(accessToken);
                    const {id, email, name} = await authServices.getUserInfo(accessToken);
                    const authentication = {provider: 'google', payload: {id, token: accessToken}};
                    let user;

                    // wrap below in fetchOrCreate()
                    user = await userDataRepository.fetchUser(name, email, authentication);
                    if (!user) {
                        user = await userDataRepository.saveUser(name, email, authentication);
                    }

                    const token = jwt.sign({
                        sub: user.id,
                    }, config.secret, {
                        expiresIn: '60 days',
                    });

                    reply({token});
                } catch (error) {
                    // #TODO: use stronger errors library, https://github.com/hapijs/boom
                    console.error(error);
                }
            },
        },
    };
};

export const googleRedirectRoute = ()=> {
    return {
        method: 'GET',
        path: '/auth/google/redirect',
        config: {
            handler: (request, reply)=> {
                const nonce = crypto.randomBytes(48).toString('base64');

                const scopes = [
                    'https://www.googleapis.com/auth/calendar',
                    'https://www.googleapis.com/auth/userinfo.email',
                    'https://www.googleapis.com/auth/userinfo.profile',
                ];

                const url = oauth2Client.generateAuthUrl({
                    scope: scopes,
                    state: nonce,
                });

                const token = jwt.sign({
                    url: url,
                    nonce: nonce,
                }, config.secret, {
                    expiresIn: '60 days',
                });
                reply({token});
            },
        },
    };
};

export default [
    googleAuthRoute,
    googleRedirectRoute,
];
