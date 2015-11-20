import cheerio from 'cheerio';

class Scraper {

    constructor(logger){
        this.logger = logger;
    };

    scrapeShowsFromTheList(html){

        const log = (string, type) => this.logger.log(string, type);
        const shows = []

        log(`START : Scraping HTML for upcoming concerts`);

        const $ = cheerio.load(html);

        // grab all of the dates
        const $allDays = $('.day');

        $allDays.each((number, text)=> {
            // at this level, we can grab the date and number of shows on that date

            const date = $(text).find('.date').clone().find('span').remove().end().text();
            const numberOfShows = $(text).find('span').text()
            const $allShows = $(text).find('.show');


            $allShows.each((number, text)=> {
                // at this level we can grab venue and attributes for a show

                const $where = $(text).find('.where')
                const venue = $where.find('a:first-child').text()

                const attributes = $where.clone().find('a').remove().end().text();

                const $allBands = $(text).find('.band');

                $allBands.each((number, text)=> {
                    // at this level I get the text for individual bands
                    // appearing at a show. Sometimes this will have postfix
                    // info, i.e. Band Name (sat) or Band Name (Portland)

                    let band = $(text).text()
                    shows.push({
                        date,
                        numberOfShows,
                        venue,
                        attributes,
                        band
                    });
                });
            });
        });

        if (shows.length > 0) {
            log(`INFO: Found ${shows.length} shows`);
            log(`FINISH: Scraping HTML for upcoming concerts`);
            return shows;
        } else {
            throw new Error("No shows to scrape.")
        }
    };

}

export default Scraper;
