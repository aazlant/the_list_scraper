import fs from 'fs';
import path from 'path';
import parseArgs from 'minimist';

// Entities
import WinstonLogger from '../src/WinstonLogger';
import FileParsedDataRepository from '../src/ParsedDataRepository/File';


// Robert C. Martin Interactor / Entity (plugin) model
// https://vimeo.com/97530863

class Interactor {

    constructor(logger, fileParsedDataRepository) {
        this.logger = logger;        
        this.fileParsedDataRepository = fileParsedDataRepository;        
    }

    logBatchTime(batchStartTime) {
        const batchEndTime = new Date();
        const batchTime = batchEndTime - batchStartTime;

        const hours = Math.floor(batchTime / 36e5);
        const minutes = Math.floor(batchTime % 36e5 / 60000);
        const seconds = Math.floor(batchTime % 60000 / 1000);
        const result = `${(hours < 10 ? '0' + hours : hours)}:${(minutes < 10 ? '0' + minutes : minutes)}:${(seconds < 10 ? '0' + seconds : seconds)}`;

        this.logger.info(`Batch completed in: ${result}`);
    }

    execute() {
        this.batchStartTime = new Date();
        const {fileParsedDataRepository, batchStartTime, config} = this;

        this.claimRootPath = path.resolve(config.rootPath, config.claimID);
        this.fileParsedDataRepository.setRootPath(this.claimRootPath);
                
        const parsedShows = fileParsedDataRepository.fetchParsedShows('parsed_shows.json');
        this.logger.info(`Claim retrieved from ${this.claimRootPath}`);

        console.log(parsedShows);
        this.logBatchTime(batchStartTime);           
    }
}

const mainExport = (rootPath, claimID, options) => {
    let appRootPath;
    let appClaimID;

    if (typeof rootPath === 'undefined') {
        if (typeof options !== 'undefined') {
            if ('rootPath' in options) {
                appRootPath = options.rootPath;
            } else {
                throw new Error('No rootPath passed to application.');
            }
        } else {
            throw new Error('No options hash passed to application');
        }
    }

    if (typeof claimID === 'undefined') {
        if (typeof options !== 'undefined') {
            if ('claimID' in options) {
                appClaimID = options.claimID;
            } else {
                throw new Error('No claimID passed to application.');
            }
        } else {
            throw new Error('No options hash passed to application');
        }
    }

    if (typeof options !== 'undefined') {
        if ('rootPath' in options) {
            appRootPath = options.rootPath;
        } else {
            throw new Error('No rootPath passed to application.');
        }
        if ('claimID' in options) {
            appClaimID = options.claimID;
        } else {
            throw new Error('No appClaimID passed to application.');
        }
    }

    if (typeof appRootPath === 'undefined') {
        throw new Error('No rootPath passed to application.');
    }

    if (typeof appClaimID === 'undefined') {
        throw new Error('No rootPath passed to application.');
    }

    const logger = new WinstonLogger({
        type: 'console',
        label: 'the-list-logger',
        colorize: true,
        prettyPrint: true,
    });

    const fileParsedDataRepository = new FileParsedDataRepository(logger);

    const interactor = new Interactor(logger, fileParsedDataRepository);
    interactor.config = {
        rootPath: appRootPath,
        claimID: appClaimID,
    };

    interactor.execute();
};

export default mainExport;

if (require.main === module) {
    const opts = {
        alias: {
            'r': 'root',
            'c': 'claim',
        },
    };

    const argv = parseArgs(process.argv.slice(2), opts);

    const config = {
        rootPath: argv.root,
        claimID: argv.claim,
    };

    mainExport(null, null, config);
}
