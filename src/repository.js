import fs from 'fs';
import path from 'path';

class Repository {
    constructor(logger){
        this.logger = logger;
    };

    saveToFile(content, directory, filename){
        const log = (string, type) => this.logger.log(string, type);
        const outputPath = path.resolve(directory, (filename || directory + ".json") )
        log(`BEGIN : writing to ${outputPath}`);
        fs.writeFileSync(outputPath, JSON.stringify(content));
        log(`FINISH: writing to ${outputPath}`);
    };

    readFromFile(directory, filename){
        const log = (string, type) => this.logger.log(string, type);
        const inputPath = path.resolve(directory, (filename || directory + ".json") )
        log(`BEGIN : reading from ${inputPath}`);
        const content = JSON.parse(fs.readFileSync(inputPath));
        if (inputPath.includes(".json")){
            log(`INFO: read ${content.length} items`);
        };
        log(`FINISH: reading from ${inputPath}`);
        return content;
    };
}

export default Repository;
