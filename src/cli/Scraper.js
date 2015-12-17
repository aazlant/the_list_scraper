import cheerio from 'cheerio';

class Scraper {

    constructor(logger) {
        this.logger = logger;
    }

    scrapeShowsFromTheList(html) {
        const shows = [];

        this.logger.info(`START : Scraping HTML for upcoming concerts`);

        const $ = cheerio.load(html);

        // grab all of the dates
        const $allDays = $('.day');


        $allDays.each((dayNumber, dayText)=> {
            // at this level, we can grab the date and number of shows on that date

            const date = $(dayText).find('.date').clone().find('span').remove().end().text();
            const numberOfShows = $(dayText).find('span').text();
            const $allShows = $(dayText).find('.show');


            $allShows.each((showNumber, showText)=> {
                // at this level we can grab venue and attributes for a show

                const $where = $(showText).find('.where');
                const venue = $where.find('a:first-child').text();

                const attributes = $where.clone().find('a').remove().end().text();

                const $allBands = $(showText).find('.band');

                $allBands.each((bandNumber, bandText)=> {
                    // at this level I get the text for individual bands
                    // appearing at a show. Sometimes this will have postfix
                    // info, i.e. Band Name (sat) or Band Name (Portland)

                    const band = $(bandText).text();
                    shows.push({
                        date,
                        numberOfShows,
                        venue,
                        attributes,
                        band,
                    });
                });
            });
        });

        if (shows.length > 0) {
            this.logger.info(`INFO: Found ${shows.length} shows`);
            this.logger.info(`FINISH: Scraping HTML for upcoming concerts`);
        } else {
            throw new Error('No shows to scrape.');
        }

        return shows;
    }

}

export default Scraper;
