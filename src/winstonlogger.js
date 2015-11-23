import Logger from './logger';
import winston from 'winston';

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

    constructor(options) {
        super();
        const transports = [];
        const {type, ...rest} = options;

        const defaults = {
            level: 'info',
            json: false,
            colorize: false,
            prettyPrint: false,
        };

        const optionsWithDefaults = {...defaults, ...rest};

        const {label, level, json, colorize, prettyPrint, filename} = optionsWithDefaults;

        if (type.includes('console')) {
            transports.push( new (winston.transports.Console)({
                label,
                level,
                json,
                colorize,
                prettyPrint,
            }));
        }

        if (type.includes('file')) {
            transports.push( new (winston.transports.File)({
                label,
                level,
                json,
                filename,
            }));
        }

        this.logger = new (winston.Logger)({
            transports,
        });
    }

    addTransport(options) {
        const {type, ...rest} = options;

        const defaults = {
            level: 'info',
            json: false,
            colorize: false,
            prettyPrint: false,
        };

        const optionsWithDefaults = {...defaults, ...rest};

        const {level, json, colorize, prettyPrint, filename} = optionsWithDefaults;

        if (type.includes('console')) {
            this.logger.add(winston.transports.Console, {
                level,
                json,
                colorize,
                prettyPrint,
            });
        }

        if (type.includes('file')) {
            this.logger.add(winston.transports.File, {
                level,
                json,
                filename,
            });
        }
    }

    removeTransport(type) {
        if (type === 'console') {
            this.logger.remove(winston.transports.Console);
        }

        if (type === 'file') {
            this.logger.remove(winston.transports.File);
        }
    }

    log(message, type) {
        const date = new Date();
        const messageWithMetadata = `${date.toString()}_PROCESS_${process.pid}_winston_import_the_list ${message}`;

        switch (type) {
        case 'error':
            this.logger.error(messageWithMetadata);
            break;
        case 'warn':
            this.logger.warn(messageWithMetadata);
            break;
        case 'info':
            this.logger.info(messageWithMetadata);
            break;
        default:
            this.logger.info(messageWithMetadata);
        }
    }

}

export default WinstonLogger;
