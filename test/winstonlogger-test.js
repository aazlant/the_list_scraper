/* eslint-env node, mocha */
import { expect } from 'chai';
import WinstonLogger from '../src/winstonlogger';

describe('WinstonLogger', ()=> {
    const winstonlogger = new WinstonLogger({
        type: 'console',
        label: 'mock-logger',
    });

    it('should instantiate with a logger', () => {
        return expect(winstonlogger.logger).to.exist;
    });

    it('should instantiate with Logger methods', () => {
        expect(winstonlogger.error).to.exist;
        expect(winstonlogger.warn).to.exist;
        expect(winstonlogger.info).to.exist;
        return expect(winstonlogger.log).to.exist;
    });

    it('should correctly use Logger methods', () => {
        // how do I test this?
    });

    it('should correctly remove a transport', () => {
        winstonlogger.removeTransport('console');
        return expect(winstonlogger.logger.transports).to.equal({});
        // is this failing because of the type of object that winstonlogger.logger is (EventEmitter)?
    });

    it('should correctly add a transport', () => {
        winstonlogger.addTransport({
            type: 'console',
            label: 'mock-logger',
        });
        return expect(winstonlogger.logger.transports).not.to.equal({});
    });
});
