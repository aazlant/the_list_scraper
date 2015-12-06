class Parser {

    constructor(logger) {
        this.logger = logger;
    }

    regexFind(str, regex) {
        // takes a string and a regex, returns the substring if
        // it exists, otherwise null
        const result = str.match(regex);
        let returnValue = null;
        if (result) {
            returnValue = result[1];
        }
        return returnValue;
    }

    parseShowFromTheList(show) {
        const {date, numberOfShows, venue, attributes, band} = show;
        // date: "Tue 9 Feb 2016"
        // numberOfShows: "2 shows"
        // venue: "Great American Music Hall"

        const { regexFind } = this;

        const timeRegEx = /^.*\s([\d\:\/pm]+pm).*$/;
        const time = regexFind(attributes, timeRegEx);

        const soldOutRegEx = /^.*?\s(\w*\ssold out|sold out).*$/;
        const soldOut = regexFind(attributes, soldOutRegEx);

        const pitRegEx = /^.*?\s([pP]it!).*$/;
        const pit = regexFind(attributes, pitRegEx);

        const multiDayRegEx = /^.*?\s(Multi-day event).*$/;
        const multiDay = regexFind(attributes, multiDayRegEx);

        const agesRegEx = /^.*(21\s*\+|6\s*\+|18\s*\+|a\/a).*$/;
        const ages = regexFind(attributes, agesRegEx);

        const priceRegEx = /^.*(\$[^\s\)]+|free).*$/;
        const price = regexFind(attributes, priceRegEx);

        // time: "6:30pm/7:30pm" or "7:00am"...
        // soldOut: "sold out" or "fri sold out"
        // pit: "Pit!"
        // multiDay: "Multi-day event"
        // ages: "a/a" or "21+" ...
        // price: "$45"
        // band: "Wu-tang Clan"
        //
        return {
            band,
            date,
            numberOfShows,
            venue,
            time,
            soldOut,
            pit,
            multiDay,
            ages,
            price,
        };
    }

    parseShowsFromTheList(shows) {
        this.logger.info(`BEGIN : parsing ${shows.length} shows`);

        const parsedShows = [];
        
        for (let i = shows.length - 1; i >= 0; i--) {
            const parsedShow = this.parseShowFromTheList(shows[i]);
            parsedShows.push(parsedShow);
        }

        if (parsedShows.length !== shows.length) {
            throw new Error('Show length mismatch.');
        }

        this.logger.info(`INFO: parsed ${parsedShows.length} shows`);
        this.logger.info(`FINISH: parsing ${parsedShows.length} shows`);
        return parsedShows;
    }

}

export default Parser;
