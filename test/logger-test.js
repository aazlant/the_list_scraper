/* eslint-env node, mocha */
import { expect } from 'chai';
import Logger from '../src/logger';

describe('Logger', ()=> {
    const logger = new Logger();

    it('should call self.log(msg, error) on error()', () => {
        // how do I test this?
    });
});
