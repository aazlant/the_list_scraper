import fs from 'fs';
import os from 'os';
import path from 'path';
import mkdirp from 'mkdirp';
import parseArgs from 'minimist';

// Entities
import WinstonLogger from '../src/WinstonLogger';
import Downloader from '../src/Downloader';
import Scraper from '../src/Scraper';
import Parser from '../src/Parser';
import FileRawDataRepository from '../src/RawDataRepository/File';
import FileParsedDataRepository from '../src/ParsedDataRepository/File';


// Robert C. Martin Interactor / Entity (plugin) model
// https://vimeo.com/97530863

class Interactor {

    constructor(logger, downloader, scraper, parser, fileRawDataRepository, fileParsedDataRepository) {
        this.logger = logger;
        this.downloader = downloader;
        this.scraper = scraper;
        this.parser = parser;
        this.fileRawDataRepository = fileRawDataRepository;
        this.fileParsedDataRepository = fileParsedDataRepository;
    }

    createClaimName() {
        const startTime = new Date().toString().replace(/[ :]/g, '-').replace(/[()]/g, '');
        const claimString = 'the-list-claim_' + os.hostname() + '_' + startTime + '_' + 'PROCESS_' + process.pid;
        return claimString;
    }

    initClaim(rootPath) {
        const constructPaths = (root) => {
            const directories = ['logs', 'html', 'metadata', 'tmp', 'raw_shows', 'parsed_shows'];
            for (let i = 0; i < directories.length; i++) {
                mkdirp.sync(path.resolve(root, directories[i]));
            }
        };

        this.name = this.createClaimName();
        this.claimRootPath = path.resolve(rootPath, this.name);

        const {name, claimRootPath, logger} = this;

        constructPaths(claimRootPath);

        // logFile setup
        const logFile = path.resolve(claimRootPath, 'logs/import.log');

        logger.addTransport({
            type: 'file',
            filename: logFile,
        });

        this.logger.info('claimString generated: ' + name);
        fs.appendFileSync(path.resolve(claimRootPath, 'metadata/claimName.txt'), name);
        this.logger.info(`Claim saved to ${path.resolve(claimRootPath, 'metadata/claim.txt')}`);
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
        const theListURL = 'https://www.uncorp.net/list/index.html';

        this.batchStartTime = new Date();
        const {downloader, scraper, parser, fileRawDataRepository, fileParsedDataRepository, config, batchStartTime} = this;

        this.initClaim(config.rootPath);
        fileRawDataRepository.setRootPath(this.claimRootPath);
        fileParsedDataRepository.setRootPath(this.claimRootPath);

        downloader.downloadHTML(theListURL)

            .then((html) => {
                fileRawDataRepository.saveHTML(html);
                const htmlFromDisk = fileRawDataRepository.fetchHTML();

                const rawShows = scraper.scrapeShowsFromTheList(htmlFromDisk);

                fileRawDataRepository.saveRawShows(rawShows);
                const rawShowsFromDisk = fileRawDataRepository.fetchRawShows();

                const parsedShows = parser.parseShowsFromTheList(rawShowsFromDisk);

                fileParsedDataRepository.saveParsedShows(parsedShows);
                this.logBatchTime(batchStartTime);
            })

            .catch((error)=>{
                this.logger.error(error);
            });
    }
}

const mainExport = (rootPath, options) => {
    let appRootPath;

    // #TODO: clean up this logic
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

    if (typeof options !== 'undefined') {
        if ('rootPath' in options) {
            appRootPath = options.rootPath;
        } else {
            throw new Error('No rootPath passed to application.');
        }
    }

    if (typeof appRootPath === 'undefined') {
        throw new Error('No rootPath passed to application.');
    }

    const logger = new WinstonLogger({
        type: 'console',
        label: 'the-list-logger',
        colorize: true,
        prettyPrint: true,
    });

    const downloader = new Downloader(logger);
    const scraper = new Scraper(logger);
    const parser = new Parser(logger);
    const fileRawDataRepository = new FileRawDataRepository(logger);
    const fileParsedDataRepository = new FileParsedDataRepository(logger);

    const interactor = new Interactor(logger, downloader, scraper, parser, fileRawDataRepository, fileParsedDataRepository);
    interactor.config = {
        rootPath: appRootPath,
    };

    interactor.execute();
};

export default mainExport;

if (require.main === module) {
    const opts = {
        alias: {
            'r': 'root',
        },
    };

    const argv = parseArgs(process.argv.slice(2), opts);

    const config = {
        rootPath: argv.root,
    };

    mainExport(null, config);
}
