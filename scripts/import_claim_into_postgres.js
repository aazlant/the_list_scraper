import fs from 'fs';
import os from 'os';
import path from 'path';
import mkdirp from 'mkdirp';

// Entities
import WinstonLogger from '../src/winstonlogger';
import Downloader from '../src/downloader';
import Scraper from '../src/scraper';
import Parser from '../src/parser';
import FileRepository from '../src/repository';


// Robert C. Martin Interactor / Entity (plugin) model
// https://vimeo.com/97530863

class Interactor {

    constructor(logger, downloader, scraper, parser, repository) {
        this.logger = logger;
        this.downloader = downloader;
        this.scraper = scraper;
        this.parser = parser;
        this.repository = repository;
    }

    createClaimName() {
        const startTime = new Date().toString().replace(/[ :]/g, '-').replace(/[()]/g, '');
        const claimString = 'the-list-claim_' + os.hostname() + '_' + startTime + '_' + 'PROCESS_' + process.pid;
        return claimString;
    }

    initClaim(rootPath) {
        const constructPaths = (root) => {
            const directories = ['logs', 'html', 'metadata', 'tmp', 'shows', 'parsedShows'];
            for (let i = 0; i < directories.length; i++) {
                mkdirp.sync(path.resolve(root, directories[i]));
            }
        };

        this.name = this.createClaimName();
        this.claimRootPath = path.resolve(rootPath, this.name);

        const {name, claimRootPath, logger} = this;
        const log = (message, type) => logger.log(message, type);

        constructPaths(claimRootPath);

        // logFile setup
        const logFile = path.resolve(claimRootPath, 'logs/import.log');

        logger.addTransport({
            type: 'file',
            filename: logFile,
        });

        log('claimString generated: ' + name);
        fs.appendFileSync(path.resolve(claimRootPath, 'metadata/claimName.txt'), name);
        log(`Claim saved to ${path.resolve(claimRootPath, 'metadata/claim.txt')}`);
    }

    logBatchTime(batchStartTime) {
        const log = (string, type) => this.logger.log(string, type);

        const batchEndTime = new Date();
        const batchTime = batchEndTime - batchStartTime;

        const hours = Math.floor(batchTime / 36e5);
        const minutes = Math.floor(batchTime % 36e5 / 60000);
        const seconds = Math.floor(batchTime % 60000 / 1000);
        const result = `${(hours < 10 ? '0' + hours : hours)}:${(minutes < 10 ? '0' + minutes : minutes)}:${(seconds < 10 ? '0' + seconds : seconds)}`;

        log(`Batch completed in: ${result}`);
    }

    execute() {
        const theListURL = 'https://www.uncorp.net/list/index.html';

        this.batchStartTime = new Date();
        const {downloader, scraper, parser, repository, config, batchStartTime} = this;

        this.initClaim(config.rootPath);

        downloader.downloadHTML(theListURL)

            .then((html) => {
                repository.saveToFile(html, this.claimRootPath, 'html', 'index.html');
                const htmlFromDisk = repository.readFromFile(this.claimRootPath, 'html', 'index.html');

                const shows = scraper.scrapeShowsFromTheList(htmlFromDisk);

                repository.saveToFile(shows, this.claimRootPath, 'shows');
                const showsFromDisk = repository.readFromFile(this.claimRootPath, 'shows');

                const parsedShows = parser.parseShowsFromTheList(showsFromDisk);

                repository.saveToFile(parsedShows, this.claimRootPath, 'parsedShows');
                this.logBatchTime(batchStartTime);
            })

            .catch((error)=>{
                this.logger.error(error);
            });
    }
}

const mainExport = (rootPath, options) => {
    let appRootPath;

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
    const repository = new FileRepository(logger);

    const interactor = new Interactor(logger, downloader, scraper, parser, repository);
    interactor.config = {
        rootPath: appRootPath,
    };

    interactor.execute();
};

export default mainExport;
