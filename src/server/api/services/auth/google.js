import fetch from 'isomorphic-fetch';
import crypto from 'crypto';
import config from '../../../config';

export const validateToken = async (token)=> {

    const tokenValidationUrl = `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`;
    const response = await fetch(tokenValidationUrl);
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Response from Google token validation API invalid');
    }
};

export const getUserInfo = async (token)=> {

    const tokenValidationUrl = `https://www.googleapis.com/oauth2/v1/userinfo`;
    const response = await fetch(tokenValidationUrl, {'headers': {'Authorization': `Bearer ${token}`}});
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Response from Google user information API invalid');
    }
};

export const googleAuthRoute = {
    method: 'POST',
    path: '/auth/google',
    config: {
        handler: async (request, reply)=> {
            const { payload: { accessToken } } = request;
            try {
                await validateToken(accessToken);
                const {id, email, name} = await getUserInfo(accessToken);
                // #TODO: check if user already exists
                // #TODO: create user in DB
                // #TODO: save token to DB - learn about worker
            } catch (error) {
                // #TODO: use stronger errors library, http://npmjs.com/package/errors
                console.error(error);
            }

        },
    },
};

export const googleRedirectRoute = {
    method: 'GET',
    path: '/auth/google/redirect',
    config: {
        handler: (request, reply)=> {
            const nonce = crypto.randomBytes(48).toString('hex');
            const redirectUri = `http://${config.appHost}:${config.appPort}/auth/google/callback`;
            const scope = `https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
            const baseUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
            const query = `?response_type=token&state=${nonce}&redirect_uri=${redirectUri}&scope=${scope}&client_id=${config.googleClientId}`;
            reply.redirect(`${baseUrl}${query}`);
        },
    },
};

export const authRoutes = [
    googleAuthRoute,
    googleRedirectRoute,
];