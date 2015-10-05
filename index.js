import request from 'request'
import cheerio from 'cheerio'
import moment from 'moment'

var log = console.log

const theListURL = "https://www.uncorp.net/list/index.html";

const regexFind = function(str, regex) {
    // takes a string and a regex, returns the substring if
    // it exists, otherwise null
    let result = str.match(regex);
    if (result) {
        return result[1]
    } else {
        return null;
    }
};

const parseShow = function(date, numberOfShows, venue, time, soldOut, ages, price, band) {
    //eventually this function could be used to write to disk
    log(" ")
    log(band, date, venue, time, soldOut, ages, price);
}

request(theListURL, (error, response, html) => {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);

    // grab all of the dates
    let $allDays = $('.day');

    $allDays.each((number, text)=> {
        // at this level, we can grab the date and number of shows on that date

        let date = $(text).find('.date').clone().find('span').remove().end().text();
        let numberOfShows = $(text).find('span').text()
        let $allShows = $(text).find('.show');


        $allShows.each((number, text)=> {
            // at this level we can grab venue and attributes for a show
            // here I also parse the attributes for time of show, whether
            // it's sold out, which ages are permitted, and the price.
            // it's possible time, soldOut and price could be null.

            let $where = $(text).find('.where')
            let venue = $where.find('a:first-child').text()

            let attributes = $where.clone().find('a').remove().end().text();

            let timeRegEx = /^.*\s([\d\:\/pm]+pm).*$/;
            let time = regexFind(attributes, timeRegEx);

            let soldOutRegEx = /^.*?\s(\w*\ssold out|sold out).*$/;
            let soldOut = regexFind(attributes, soldOutRegEx);

            let agesRegEx = /^.*(21\s*\+|6\s*\+|18\s*\+|a\/a).*$/;
            let ages = regexFind(attributes, agesRegEx);

            let priceRegEx = /^.*(\$[^\s\)]+|free).*$/;
            let price = regexFind(attributes, priceRegEx);

            let $allBands = $(text).find('.band');

            $allBands.each((number, text)=> {
                // at this level I get the text for individual bands
                // appearing at a show. Sometimes this will have postfix
                // info, i.e. Band Name (sat) or Band Name (Portland)

                // all germane variables we should have access to here:
                // date, numberOfShows, venue, time, soldOut, ages, price,
                // band
                let band = $(text).text()
                parseShow(date, numberOfShows, venue, time, soldOut, ages, price, band);
            });
        });

    });

  }
});
