require('babel/register');
var scraper = require('./scripts/scrape_the_list_to_claim');
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
