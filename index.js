import request from 'request';
import cheerio from 'cheerio';
import moment from 'moment';
import fs from 'fs';
import os from 'os';
import path from 'path';
import mkdirp from 'mkdirp';
import winston from 'winston';

class Logger {

    error(msg) {
        this.log(msg, 'error');
    }
    warn(msg) {
        this.log(msg, 'warn');
    }
    info(msg) {
        this.log(msg, 'info');
    }

    log(msg, type) {
        throw new Error('Not implemented');
    }
}

class WinstonLogger extends Logger {

    // options : {
    //     type: console/file,
    //     label: 'label-name',
    //     level: 'info',
    //     json: true/false,
    //     // console
    //     colorize: true/false,
    //     prettyPrint: true/false,
    //     // file
    //     filename: 'pathName'
    // }

    constructor(options){

        super();
        let transports = [];
        const {type, ...rest} = options;

        const defaults = {
            level: "info",
            json: false,
            colorize: false,
            prettyPrint: false
        };

        const optionsWithDefaults = {...defaults, ...rest};

        const {label, level, json, colorize, prettyPrint, filename} = optionsWithDefaults;

        if (type.includes("console")) {
            transports.push( new (winston.transports.Console)({
                label,
                level,
                json,
                colorize,
                prettyPrint
            }));
        };

        if (type.includes("file")) {
            transports.push( new (winston.transports.File)({
                label,
                level,
                json,
                filename
            }));
        };

        this.logger = new (winston.Logger)({
            transports
        })

    };

    addTransport(options){

        const {type, ...rest} = options;

        const defaults = {
            level: "info",
            json: false,
            colorize: false,
            prettyPrint: false
        };

        const optionsWithDefaults = {...defaults, ...rest};

        const {label, level, json, colorize, prettyPrint, filename} = optionsWithDefaults;

        if (type.includes("console")) {
            this.logger.add(winston.transports.Console, {
                level,
                json,
                colorize,
                prettyPrint
            });
        };

        if (type.includes("file")) {
            this.logger.add(winston.transports.File, {
                level,
                json,
                filename
            });
        };

    };

    removeTransport(type){

        if (type == "console") {
            self.logger.remove(winston.transports.Console);
        };

        if (type == "file") {
            self.logger.remove(winston.transports.File);
        };

    };

    log(message, type){

        const date = new Date();
        const messageWithMetadata = `${date.toString()}_PROCESS_${process.pid}_winston_import_the_list ${message}`;

        switch(type){
            case "error":
                this.logger.error(messageWithMetadata);
                break;
            case "warn":
                this.logger.warn(messageWithMetadata);
                break;
            case "info":
                this.logger.info(messageWithMetadata);
                break;
            default:
                this.logger.info(messageWithMetadata);
        }

    };

};

class Downloader {

    constructor(logger){
        this.logger = logger;
    }

    downloadHTML(url){

        const log = (string, type)=> this.logger.log(string, type);

        return new Promise(

            function (resolve, reject){

                log(`START : Downloading ${url}`);
                request(url, (error, response, html) => {
                  if (!error && response.statusCode == 200) {
                        log(`FINISH: Downloading ${url}`);
                        resolve(html);
                  } else {
                    reject(error || response.statusCode);
                  }

            });
        });
    };

}

class Scraper {

    constructor(logger){
        this.logger = logger;
    };

    scrapeShowsFromTheList(html){

        const log = (string, type) => this.logger.log(string, type);
        const shows = []

        log(`START : Scraping HTML for upcoming concerts`);

        const $ = cheerio.load(html);

        // grab all of the dates
        const $allDays = $('.day');

        $allDays.each((number, text)=> {
            // at this level, we can grab the date and number of shows on that date

            const date = $(text).find('.date').clone().find('span').remove().end().text();
            const numberOfShows = $(text).find('span').text()
            const $allShows = $(text).find('.show');


            $allShows.each((number, text)=> {
                // at this level we can grab venue and attributes for a show

                const $where = $(text).find('.where')
                const venue = $where.find('a:first-child').text()

                const attributes = $where.clone().find('a').remove().end().text();

                const $allBands = $(text).find('.band');

                $allBands.each((number, text)=> {
                    // at this level I get the text for individual bands
                    // appearing at a show. Sometimes this will have postfix
                    // info, i.e. Band Name (sat) or Band Name (Portland)

                    let band = $(text).text()
                    shows.push({
                        date,
                        numberOfShows,
                        venue,
                        attributes,
                        band
                    });
                });
            });
        });

        if (shows.length > 0) {
            log(`INFO: Found ${shows.length} shows`);
            log(`FINISH: Scraping HTML for upcoming concerts`);
            return shows;
        } else {
            throw new Error("No shows to scrape.")
        }
    };

}

class Parser {

    constructor(logger){
        this.logger = logger;
    }

    regexFind(str, regex) {
        // takes a string and a regex, returns the substring if
        // it exists, otherwise null
        const result = str.match(regex);
        if (result) {
            return result[1]
        } else {
            return null;
        }
    };

    parseShowFromTheList(show){

        const {date, numberOfShows, venue, attributes, band} = show;
        // date: "Tue 9 Feb 2016"
        // numberOfShows: "2 shows"
        // venue: "Great American Music Hall"

        const { regexFind } = this;

        const timeRegEx = /^.*\s([\d\:\/pm]+pm).*$/;
        const time = regexFind(attributes, timeRegEx);

        const soldOutRegEx = /^.*?\s(\w*\ssold out|sold out).*$/;
        const soldOut = regexFind(attributes, soldOutRegEx);

        const pitRegEx = /^.*?\s([pP]it!).*$/;
        const pit = regexFind(attributes, pitRegEx);

        const multiDayRegEx = /^.*?\s(Multi-day event).*$/;
        const multiDay = regexFind(attributes, multiDayRegEx);

        const agesRegEx = /^.*(21\s*\+|6\s*\+|18\s*\+|a\/a).*$/;
        const ages = regexFind(attributes, agesRegEx);

        const priceRegEx = /^.*(\$[^\s\)]+|free).*$/;
        const price = regexFind(attributes, priceRegEx);

        // time: "6:30pm/7:30pm" or "7:00am"...
        // soldOut: "sold out" or "fri sold out"
        // pit: "Pit!"
        // multiDay: "Multi-day event"
        // ages: "a/a" or "21+" ...
        // price: "$45"
        // band: "Wu-tang Clan"
        //
        return({
            band,
            date,
            numberOfShows,
            venue,
            time,
            soldOut,
            pit,
            multiDay,
            ages,
            price
        });
    };

    parseShowsFromTheList(shows){
        const log = (string, type) => this.logger.log(string, type);
        log(`BEGIN : parsing ${shows.length} shows`);
        const parsedShows = []
        for (var i = shows.length - 1; i >= 0; i--) {
            const parsedShow = this.parseShowFromTheList(shows[i])
            parsedShows.push(parsedShow)
        };
        if (parsedShows.length != shows.length) {
            throw new Error("Show length mismatch.");
        };
        log(`INFO: parsed ${parsedShows.length} shows`);
        log(`FINISH: parsing ${parsedShows.length} shows`);
        return parsedShows;
    };

}

class Repository {
    constructor(logger){
        this.logger = logger;
    };

    saveToFile(content, directory, filename){
        console.log("here")
        const log = (string, type) => this.logger.log(string, type);
        const outputPath = path.resolve(directory, (filename || directory + ".json") )
        log(`BEGIN : writing to ${outputPath}`);
        fs.writeFileSync(outputPath, JSON.stringify(content));
        log(`FINISH: writing to ${outputPath}`);
    };

    readFromFile(directory, filename){
        const log = (string, type) => this.logger.log(string, type);
        const inputPath = path.resolve(directory, (filename || directory + ".json") )
        log(`BEGIN : reading from ${inputPath}`);
        const content = JSON.parse(fs.readFileSync(inputPath));
        log(`INFO: read ${content.length} items`);
        log(`FINISH: reading from ${inputPath}`);
        return content;
    };
}

class Executor {

    constructor(){

        this.logger = new WinstonLogger({
            type: "console",
            label: "the-list-logger",
            colorize: true,
            prettyPrint: true
        });

        this.downloader = new Downloader(this.logger);
        this.scraper = new Scraper(this.logger);
        this.parser = new Parser(this.logger);
        this.repository = new Repository(this.logger);
    }

    createClaimName(){
        var startTime = new Date().toString().replace(/[ :]/g,"-").replace(/[()]/g,"")
        var claimString = "the-list-claim_" + os.hostname() + "_" + startTime + "_" + "PROCESS_" + process.pid
        return claimString
    }

    initClaim(rootPath){

        let constructPaths = function(rootPath){
            var directories = ["logs", "html", "metadata", "tmp", "shows", "parsedShows"]
            for (var i = 0; i < directories.length; i++){
                mkdirp.sync(path.resolve(rootPath, directories[i]))
            }
        }

        this.name = this.createClaimName();
        this.claimRootPath = path.resolve(rootPath, this.name);

        let {name, claimRootPath, logger} = this;
        let log = (message, type)=> logger.log(message, type);

        constructPaths(claimRootPath);

        // logFile setup
        let logFile = path.resolve(claimRootPath, "logs/import.log");

        logger.addTransport({
            type: "file",
            filename: logFile
        })

        log("claimString generated: " + name);
        fs.appendFileSync(path.resolve(claimRootPath, "metadata/claimName.txt"), name);
        log(`Claim saved to ${path.resolve(claimRootPath, "metadata/claim.txt")}`);

    };

    logBatchTime(batchStartTime){
        const log = (string, type) => this.logger.log(string, type);

        const batchEndTime = new Date();
        const batchTime = batchEndTime - batchStartTime;

        const hours = Math.floor(batchTime / 36e5);
        const minutes = Math.floor(batchTime % 36e5 / 60000);
        const seconds = Math.floor(batchTime % 60000 / 1000);
        const result = `${(hours < 10 ? "0" + hours : hours)}:${(minutes < 10 ? "0" + minutes : minutes)}:${(seconds  < 10 ? "0" + seconds : seconds)}`;

        log(`Batch completed in: ${result}`);
    };

    execute(){

        const theListURL = "https://www.uncorp.net/list/index.html"

        this.batchStartTime = new Date();
        const {downloader, scraper, parser, repository, logger, config, batchStartTime} = this;

        this.initClaim(config.rootPath);

        downloader.downloadHTML(theListURL)

            .then((html) => {
                repository.saveToFile(html, path.resolve(this.claimRootPath, "html"), "index.html");
                const htmlFromDisk = repository.readFromFile(path.resolve(this.claimRootPath, "html"), "index.html");

                const shows = scraper.scrapeShowsFromTheList(htmlFromDisk);

                repository.saveToFile(shows, path.resolve(this.claimRootPath, "shows"));
                const showsFromDisk = repository.readFromFile(path.resolve(this.claimRootPath, "shows"));

                const parsedShows = parser.parseShowsFromTheList(showsFromDisk);

                repository.saveToFile(parsedShows, path.resolve(this.claimRootPath, "parsedShows"));
                this.logBatchTime(batchStartTime);

            })

            .catch((error)=>{
                this.logger.error(error);
            })

    }
}

var mainExport = function(rootPath, options){
    if (typeof options != "undefined") {
        if ('rootPath' in options) {
            var rootPath = options.rootPath
        }
    }

    var executor = new Executor();
    executor.config = {
        rootPath: rootPath,
    }

    executor.execute()
}

export default mainExport;
