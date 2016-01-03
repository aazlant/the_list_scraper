import { Types } from 'hapi';
import postgres from 'pg-promise';
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

const showsRoute = {
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


module.exports = [
    showsRoute,
];
