import { Types } from 'hapi';
import postgres from 'pg-promise';
import crypto from 'crypto';
import config from '../config';

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

// export const googleAuthRoute = {
//     method: ['GET', 'POST'], // Must handle both GET and POST
//     path: '/auth/google/callback', // The callback endpoint registered with the provider
//     config: {
//         auth: 'google',
//         handler: (request, reply)=> {
//             if (!request.auth.isAuthenticated) {
//                 return reply('Authentication failed due to: ' + request.auth.error.message);
//             }

//             // Perform any account lookup or registration, setup local session,
//             // and redirect to the application. The third-party credentials are
//             // stored in request.auth.credentials. Any query parameters from
//             // the initial request are passed back via request.auth.credentials.query.
//             return reply.redirect(`${config.appHost}:${config.appPort}/`);
//         },
//     },
// };

export const googleRedirect = {
    method: 'GET',
    path: '/auth/google',
    config: {
        handler: (request, reply)=> {
            const nonce = crypto.randomBytes(48).toString('hex');
            const redirectUri = `http://${config.appHost}:${config.appPort}/auth/google/callback`;
            const scope = `https://www.googleapis.com/auth/calendar`;
            const baseUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
            const query = `?response_type=token&state=${nonce}&redirect_uri=${redirectUri}&scope=${scope}&client_id=${config.googleClientId}`;
            reply.redirect(`${baseUrl}${query}`);
        },
    },
};

export default [
    showsRoute,
    googleRedirect,
];
