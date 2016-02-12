import { Types } from 'hapi';
import postgres from 'pg-promise';
import crypto from 'crypto';
import config from '../config';

import * as google from './services/auth/google';

import WinstonLogger from '../../cli/WinstonLogger';
import DBParsedDataRepository from '../../common/ParsedDataRepository/DB';

const pgp = postgres();
const db = pgp({...config.dbConfig, database: config.dbConfig.name});

const logger = new WinstonLogger({
    type: 'console',
    label: 'the-list-logger',
    colorize: true,
    prettyPrint: true,
});

const dbParsedDataRepository = new DBParsedDataRepository(logger, db);

export const showsRoute = {
    method: 'GET',
    path: '/shows',
    config: {
        handler: {
            async: async (request, reply)=> {
                try {
                    const shows = await dbParsedDataRepository.fetchParsedShowsWithGroupedBandsAfterToday();
                    reply(shows);
                } catch (error) {
                    console.error(error);
                }
            },
        },
        // query: { name: Types.String() }
    },
};

export const googleAuthRoute = {
    method: 'POST',
    path: '/auth/google',
    config: {
        handler: async (request, reply)=> {
            const { payload: { accessToken } } = request;
            try {
                await google.validateToken(accessToken);
                const {id, email, name} = await google.getUserInfo(accessToken);
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

export const googleRedirect = {
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

export default [
    showsRoute,
    googleAuthRoute,
    googleRedirect,
];
