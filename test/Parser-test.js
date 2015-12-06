/* eslint-env node, mocha */
import { expect } from 'chai';
import sinon from 'sinon';
import fs from 'fs';
import path from 'path';

import Logger from '../src/Logger';
import Parser from '../src/Parser';

describe('Parser', ()=> {
    const logger = new Logger();
    const mockedLog = sinon.stub(logger, 'log'); // eslint-disable-line no-unused-vars       

    const parser = new Parser(logger);
    const scrapedContent = JSON.parse(fs.readFileSync(path.resolve(__dirname, './assets/scraped_sample.json')));
    const expectedContent = JSON.parse(fs.readFileSync(path.resolve(__dirname, './assets/parsed_sample.json')));

    it('should produce the correct output after parsing input', () => {
        const parsedContent = parser.parseShowsFromTheList(scrapedContent);
        expect(parsedContent).to.eql(expectedContent);
    });
});
