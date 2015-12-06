/* eslint-env node, mocha */
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';

import Scraper from '../src/Scraper';
import WinstonLogger from '../src/WinstonLogger';

describe('Scraper', ()=> {
    const winstonlogger = new WinstonLogger({
        type: 'console',
        label: 'mock-logger',
    });

    const scraper = new Scraper(winstonlogger);
    const HTMLContent = fs.readFileSync(path.resolve(__dirname, './assets/sample.html'));
    const expectedContent = JSON.parse(fs.readFileSync(path.resolve(__dirname, './assets/scraped_sample.json')));

    it('should instantiate with a logger', () => {
        expect(winstonlogger.logger).to.exist;
        expect(scraper.logger).to.exist;
    });

    scraper.logger.removeTransport('console');
    // ^^ seems janky

    it('should produce the correct output after scraping input', () => {
        const scrapedContent = scraper.scrapeShowsFromTheList(HTMLContent);
        expect(scrapedContent).to.eql(expectedContent);
    });
});
