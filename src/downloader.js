import request from 'request';

class Downloader {

    constructor(logger){
        this.logger = logger;
    }

    downloadHTML(url){

        const log = (string, type)=> this.logger.log(string, type);

        return new Promise(

            function (resolve, reject){

                log(`START : Downloading ${url}`);
                request(url, (error, response, html) => {
                  if (!error && response.statusCode == 200) {
                        log(`FINISH: Downloading ${url}`);
                        resolve(html);
                  } else {
                    reject(error || response.statusCode);
                  }

            });
        });
    };

}

export default Downloader;
