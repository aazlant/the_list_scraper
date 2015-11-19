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

}

class Parser {


}

class Executor {

    regexFind(str, regex) {
        // takes a string and a regex, returns the substring if
        // it exists, otherwise null
        let result = str.match(regex);
        if (result) {
            return result[1]
        } else {
            return null;
        }
    };

    createClaimName(){
        var startTime = new Date().toString().replace(/[ :]/g,"-").replace(/[()]/g,"")
        var claimString = "the-list-claim_" + os.hostname() + "_" + startTime + "_" + "PROCESS_" + process.pid
        return claimString
    }

    initClaim(rootPath){

        let constructPaths = function(rootPath){
            var directories = ["logs", "metadata", "tmp", "shows", "parsedShows"]
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

    }

    getShows(){

        var self = this;
        var log = (string, type) => self.logger.log(string, type);
        var theListURL = "https://www.uncorp.net/list/index.html";

        return new Promise(

            function (resolve, reject){

                var shows = []
                log(`START : Scraping ${theListURL} for upcoming concerts`);
                request(theListURL, (error, response, html) => {
                  if (!error && response.statusCode == 200) {
                    let $ = cheerio.load(html);

                    // grab all of the dates
                    let $allDays = $('.day');

                    $allDays.each((number, text)=> {
                        // at this level, we can grab the date and number of shows on that date

                        let date = $(text).find('.date').clone().find('span').remove().end().text();
                        let numberOfShows = $(text).find('span').text()
                        let $allShows = $(text).find('.show');


                        $allShows.each((number, text)=> {
                            // at this level we can grab venue and attributes for a show

                            let $where = $(text).find('.where')
                            let venue = $where.find('a:first-child').text()

                            let attributes = $where.clone().find('a').remove().end().text();

                            let $allBands = $(text).find('.band');

                            $allBands.each((number, text)=> {
                                // at this level I get the text for individual bands
                                // appearing at a show. Sometimes this will have postfix
                                // info, i.e. Band Name (sat) or Band Name (Portland)

                                let band = $(text).text()
                                shows.push({
                                    date: date,
                                    numberOfShows: numberOfShows,
                                    venue: venue,
                                    attributes: attributes,
                                    band: band
                                });
                            });
                        });
                    });

                    if (shows.length > 0) {
                        log(`INFO: Found ${shows.length} shows`);
                        log(`FINISH: Scraping ${theListURL} for upcoming concerts`);
                        resolve(shows);
                    } else {
                        log("Found no shows.", "error");
                        reject("No shows found.");
                    }


                  } else {
                    reject(error || response.statusCode);
                  }

                });
        });
    };

    logBatchTime(){
        var self = this;
        var log = (string, type) => self.logger.log(string, type);

        return new Promise(
            function (resolve, reject){
                try {
                    var batchEndTime = new Date();
                    var batchTime = batchEndTime - self.batchStartTime;

                    var hours = Math.floor(batchTime / 36e5);
                    var minutes = Math.floor(batchTime % 36e5 / 60000);
                    var seconds = Math.floor(batchTime % 60000 / 1000);
                    var result = `${(hours < 10 ? "0" + hours : hours)}:${(minutes < 10 ? "0" + minutes : minutes)}:${(seconds  < 10 ? "0" + seconds : seconds)}`;

                    log(`Batch completed in: ${result}`);
                    resolve();
                } catch(e) {
                    reject(e);
                }
            }
        );
    }

    saveToFile(json, directory, filename){
        var self = this;
        var log = (string, type) => self.logger.log(string, type);

        return new Promise(
            function (resolve, reject){
                try {
                    if (typeof filename == "undefined") {
                        var filename = directory
                    }
                    var outputPath = path.resolve(self.claimRootPath, directory, `${filename}.json`)
                    log(`BEGIN : writing to ${outputPath}`);
                    fs.writeFileSync(outputPath, JSON.stringify(json));
                    log(`FINISH: writing to ${outputPath}`);
                    resolve()
                } catch(e) {
                    reject(e);
                }
            }
        );
    }

    readFromFile(directory, filename){
        var self = this;
        var log = (string, type) => self.logger.log(string, type);

        return new Promise(
            function (resolve, reject){
                try {
                    if (typeof filename == "undefined") {
                        var filename = directory
                    }
                    var inputPath = path.resolve(self.claimRootPath, directory, `${filename}.json`)
                    log(`BEGIN : reading from ${inputPath}`);
                    var json = JSON.parse(fs.readFileSync(inputPath));
                    log(`INFO: read ${json.length} items`);
                    log(`FINISH: reading from ${inputPath}`);
                    resolve(json)
                } catch(e) {
                    reject(e);
                }
            }
        );
    }

    parseShow(date, numberOfShows, venue, attributes, band){
        // date: "Tue 9 Feb 2016"
        // numberOfShows: "2 shows"
        // venue: "Great American Music Hall"

        let timeRegEx = /^.*\s([\d\:\/pm]+pm).*$/;
        let time = this.regexFind(attributes, timeRegEx);

        let soldOutRegEx = /^.*?\s(\w*\ssold out|sold out).*$/;
        let soldOut = this.regexFind(attributes, soldOutRegEx);

        let pitRegEx = /^.*?\s([pP]it!).*$/;
        let pit = this.regexFind(attributes, pitRegEx);

        let multiDayRegEx = /^.*?\s(Multi-day event).*$/;
        let multiDay = this.regexFind(attributes, multiDayRegEx);

        let agesRegEx = /^.*(21\s*\+|6\s*\+|18\s*\+|a\/a).*$/;
        let ages = this.regexFind(attributes, agesRegEx);

        let priceRegEx = /^.*(\$[^\s\)]+|free).*$/;
        let price = this.regexFind(attributes, priceRegEx);

        // time: "6:30pm/7:30pm" or "7:00am"...
        // soldOut: "sold out" or "fri sold out"
        // pit: "Pit!"
        // multiDay: "Multi-day event"
        // ages: "a/a" or "21+" ...
        // price: "$45"
        // band: "Wu-tang Clan"
        //
        return({
            band: band,
            date: date,
            numberOfShows: numberOfShows,
            venue: venue,
            time: time,
            soldOut: soldOut,
            pit: pit,
            multiDay: multiDay,
            ages: ages,
            price: price
        });
    }

    parseShows(shows){
        var self = this;
        var log = (string, type) => self.logger.log(string, type);

        return new Promise(
            function (resolve, reject){
                try {
                    log(`BEGIN : parsing ${shows.length} shows`);
                    var parsedShows = []
                    for (var i = shows.length - 1; i >= 0; i--) {
                        var date = shows[i]["date"]
                        var numberOfShows = shows[i]["numberOfShows"]
                        var venue = shows[i]["venue"]
                        var attributes = shows[i]["attributes"]
                        var band = shows[i]["band"]
                        //log(`INFO: parsing ${date} | ${band} | ${venue}`)
                        var parsedShow = self.parseShow(date, numberOfShows, venue, attributes, band)
                        parsedShows.push(parsedShow)
                    };
                    if (parsedShows.length != shows.length) {
                        reject("Show length mismatch.");
                    };
                    log(`INFO: parsed ${parsedShows.length} items`);
                    log(`FINISH: parsing ${parsedShows.length} shows`);
                    resolve(parsedShows)
                } catch(e) {
                    reject(e);
                }
            }
        );
    }


    execute(){
        var executionStack = ()=> {

            this.logger = new WinstonLogger({
                type: "console",
                label: "the-list-logger",
                colorize: true,
                prettyPrint: true
            });

            this.batchStartTime = new Date();

            this.initClaim(this.config.rootPath);

            this.getShows()

                .then((shows) => this.saveToFile(shows, "shows"))
                .then(() => this.readFromFile("shows"))

                .then((shows) => this.parseShows(shows))
                .then((parsedShows) => this.saveToFile(parsedShows, "parsedShows"))

                .then(()=> this.logBatchTime())
                .catch((error)=>{
                    this.logger.error(error);
                })

        }

        executionStack()
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

module.exports = mainExport

// var executor = new Executor()
// executor.execute()
