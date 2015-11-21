require('babel/register');
var scraper = require('./index.js');
var parseArgs = require('minimist');

if (require.main == module){

    var opts = {
        alias: {
            "r": "root"
        }
    }

    argv = parseArgs(process.argv.slice(2), opts)

    config = {
        rootPath: argv.root,
    }

    scraper(null, config)
}
