/* eslint-env node, mocha */
import { expect } from 'chai';
import sinon from 'sinon';
import WinstonLogger from '../src/winstonlogger';

describe('WinstonLogger', ()=> {
    
    let winstonlogger;

    beforeEach(()=>{

        winstonlogger = new WinstonLogger({
            type: 'console',
            label: 'mock-logger',
        }); 
    });

    it('should instantiate with a logger', () => {
        expect(winstonlogger.logger).to.exist;
    });

    it('should instantiate with Logger methods', () => {
        expect(winstonlogger.error).to.exist;
        expect(winstonlogger.warn).to.exist;
        expect(winstonlogger.info).to.exist;
        expect(winstonlogger.log).to.exist;
    });

    it('should correctly use Logger methods with appropriate metadata', () => {
        
        const info = sinon.spy();
        winstonlogger.logger.info = info;
        
        const error = sinon.spy();
        winstonlogger.logger.error = error;
        
        const warn = sinon.spy();
        winstonlogger.logger.warn = warn;

        winstonlogger.info('test message');
        winstonlogger.error('test message');
        winstonlogger.warn('test message');

        expect(info.calledWith(sinon.match(/PROCESS_\d+_winston.*test message$/))).to.be.ok;
        expect(error.calledWith(sinon.match(/PROCESS_\d+_winston.*test message$/))).to.be.ok;
        expect(warn.calledWith(sinon.match(/PROCESS_\d+_winston.*test message$/))).to.be.ok;
    });

    it('should correctly remove a transport', () => {
        expect(winstonlogger.logger.transports).not.to.eql({});
        
        winstonlogger.removeTransport('console');
        
        expect(winstonlogger.logger.transports).to.eql({});
    });

    it('should correctly add a transport', () => {        
        expect(winstonlogger.logger.transports.file).not.to.be.ok;

        winstonlogger.addTransport({
            type: 'file',
            label: 'mock-logger',
            filename: '/dev/null',
        });

        expect(winstonlogger.logger.transports.file).to.be.ok;
    });
});
