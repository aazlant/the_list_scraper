/* eslint-env node, mocha */
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import sinon from 'sinon';

import Scraper from '../src/Scraper';
import Logger from '../src/Logger';

describe('Scraper', ()=> {
    const logger = new Logger();
    const mockedLog = sinon.stub(logger, 'log'); // eslint-disable-line no-unused-vars

    const scraper = new Scraper(logger);
    const HTMLContent = fs.readFileSync(path.resolve(__dirname, './fixtures/sample.html'));
    const expectedContent = JSON.parse(fs.readFileSync(path.resolve(__dirname, './fixtures/scraped_sample.json')));

    it('should produce the correct output after scraping input', () => {
        const scrapedContent = scraper.scrapeShowsFromTheList(HTMLContent);
        expect(scrapedContent).to.eql(expectedContent);
    });
});
