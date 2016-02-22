import config from '../../../config';
import joi from 'joi';
import * as authServices from '../../services/auth/google';
import jwt from 'jsonwebtoken';

export const googleAuthRoute = (userDataRepository)=> {
    // #TODO: check for repository
    return {
        method: 'POST',
        path: '/auth/google',
        config: {
            handler: async (request, reply)=> {
                const { payload: { accessToken } } = request;
                try {
                    await authServices.validateToken(accessToken);
                    const {id, email, name} = await authServices.getUserInfo(accessToken);
                    const authentication = {provider: 'google', payload: {id, token: accessToken}};
                    let user;

                    user = await userDataRepository.fetchUser(name, email, authentication);
                    if (!user) {
                        user = await userDataRepository.saveUser(name, email, authentication);
                    }

                    // #TODO: generate JWT via node-jsonwebtoken and return it
                    // promisify this -> jwt.sign({ sub: '...', ... }, process.env..., [callback])
                    // https://auth0.com/blog/2015/04/09/adding-authentication-to-your-react-flux-app/
                    // may not need worker: flow is transparent, does google have a similar long-lived token - provide endpoint to refresh
                } catch (error) {
                    // #TODO: use stronger errors library, http://npmjs.com/package/errors
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
            // validate: {
            //     query: {
            //         nonce: joi.string().alphanum().min(32).required(),
            //     },
            // },
            handler: (request, reply)=> {
                const { nonce } = request.query;
                const redirectUri = `http://${config.appHost}:${config.appPort}/auth/google/callback`;
                const scope = `https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
                const baseUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
                const query = `?response_type=token&state=${nonce}&redirect_uri=${redirectUri}&scope=${scope}&client_id=${config.googleClientId}`;
                reply.redirect(`${baseUrl}${query}`);
            },
        },
    };
};

export default [
    googleAuthRoute,
    googleRedirectRoute,
];
