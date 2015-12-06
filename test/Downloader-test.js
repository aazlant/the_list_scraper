/* eslint-env node, mocha */
import { expect } from 'chai';
import nock from 'nock';
import fs from 'fs';
import path from 'path';

import Downloader from '../src/Downloader';
import WinstonLogger from '../src/WinstonLogger';

describe('Downloader', ()=> {
    const winstonlogger = new WinstonLogger({
        type: 'console',
        label: 'mock-logger',
    });

    const downloader = new Downloader(winstonlogger);
    const expectedContent = fs.readFileSync(path.resolve(__dirname, './assets/sample.html'));
    const theListURL = 'https://www.uncorp.net/list/';

    it('should instantiate with a logger', () => {
        expect(winstonlogger.logger).to.exist;
        expect(downloader.logger).to.exist;
    });

    downloader.logger.removeTransport('console');
    // ^^ seems janky

    it('should download the correct HTML from a URL', () => {
        nock(theListURL)
            .get('/')
            .reply(200, expectedContent);

        downloader.downloadHTML(theListURL)
            .then((HTML)=>{
                expect(HTML).to.eql(expectedContent);
            });
    });
});
