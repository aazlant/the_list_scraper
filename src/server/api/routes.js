import postgres from 'pg-promise';
import config from '../config';

import googleAuth from './routes/auth/google';

import WinstonLogger from '../../cli/WinstonLogger';
import DBParsedDataRepository from '../../common/ParsedDataRepository/DB';
import DBUserDataRepository from '../../common/UserDataRepository/DB';

const pgp = postgres();
const db = pgp({...config.dbConfig, database: config.dbConfig.name});

const logger = new WinstonLogger({
    type: 'console',
    label: 'the-list-api-server-logger',
    colorize: true,
    prettyPrint: true,
});

const dbParsedDataRepository = new DBParsedDataRepository(logger, db);
const dbUserDataRepository = new DBUserDataRepository(logger, db);

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

export default [
    showsRoute,
    ...googleAuth.map((route)=> route(dbUserDataRepository)),
];
