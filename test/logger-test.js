/* eslint-env node, mocha */
import { expect } from 'chai';
import sinon from 'sinon';
import Logger from '../src/Logger';

describe('Logger', ()=> {

    it('should call self.log(msg, error) on error()', () => {        
        const logger = new Logger()
        const mockedLog = sinon.stub(logger, 'log');
        logger.error("test message");
        expect(mockedLog.calledWith("test message", "error")).to.be.ok;
    });

    it('should call self.log(msg, warn) on warn()', () => {
        const logger = new Logger()
        const mockedLog = sinon.stub(logger, 'log');
        logger.warn("test message");
        expect(mockedLog.calledWith("test message", "warn")).to.be.ok;
    });

    it('should call self.log(msg, info) on info()', () => {
        const logger = new Logger()
        const mockedLog = sinon.stub(logger, 'log');
        logger.info("test message");
        expect(mockedLog.calledWith("test message", "info")).to.be.ok;
    });

});
