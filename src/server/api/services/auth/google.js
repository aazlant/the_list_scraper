import fetch from 'isomorphic-fetch';

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
