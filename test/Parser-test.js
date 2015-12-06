/* eslint-env node, mocha */
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';

import Parser from '../src/Parser';
import WinstonLogger from '../src/WinstonLogger';

describe('Parser', ()=> {
    const winstonlogger = new WinstonLogger({
        type: 'console',
        label: 'mock-logger',
    });

    const parser = new Parser(winstonlogger);
    const scrapedContent = JSON.parse(fs.readFileSync(path.resolve(__dirname, './assets/scraped_sample.json')));
    const expectedContent = JSON.parse(fs.readFileSync(path.resolve(__dirname, './assets/parsed_sample.json')));

    it('should instantiate with a logger', () => {
        expect(winstonlogger.logger).to.exist;
        expect(parser.logger).to.exist;
    });

    parser.logger.removeTransport('console');
    // ^^ seems janky

    it('should produce the correct output after parsing input', () => {
        const parsedContent = parser.parseShowsFromTheList(scrapedContent);
        expect(parsedContent).to.eql(expectedContent);
    });
});
