/* eslint-env node, mocha */
import { expect } from 'chai';
import sinon from 'sinon';
import nock from 'nock';
import fs from 'fs';
import path from 'path';

import Downloader from '../src/Downloader';
import Logger from '../src/Logger';

describe('Downloader', ()=> {
    const logger = new Logger();
    const mockedLog = sinon.stub(logger, 'log'); // eslint-disable-line no-unused-vars       

    const downloader = new Downloader(logger);
    const expectedContent = fs.readFileSync(path.resolve(__dirname, './assets/sample.html'));
    const theListURL = 'https://www.uncorp.net/list/';

    it('should download the correct HTML from a URL', () => {
        nock(theListURL)
            .get('/')
            .reply(200, expectedContent);

        downloader.downloadHTML(theListURL)
            .then((HTML)=>{
                expect(HTML).to.eql(expectedContent);
                done(); // eslint-disable-line no-undef       
            });
    });
});
