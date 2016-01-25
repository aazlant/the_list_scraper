import request from 'request';

class Downloader {

    constructor(logger) {
        this.logger = logger;
    }

    downloadHTML(url) {
        return new Promise(

            (resolve, reject) => {
                this.logger.info(`START : Downloading ${url}`);
                request(url, (error, response, html) => {
                    if (!error && response.statusCode === 200) {
                        this.logger.info(`FINISH: Downloading ${url}`);
                        resolve(html);
                    } else {
                        reject(error || response.statusCode);
                    }
                });
            });
    }

}

export default Downloader;
