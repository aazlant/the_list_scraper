// #TODO: TEST, add `throw error`.

import ParsedDataRepository from '../ParsedDataRepository';


class DB extends ParsedDataRepository {
    constructor(logger, db) {
        super();
        this.logger = logger;
        this.db = db;
    }

    setRootPath(rootPath) { // eslint-disable-line no-unused-vars
        throw new Error('Not implemented.');
    }

    async saveParsedShows(parsedShows) {
        try {
            for (const parsedShow of parsedShows) {
                const date = new Date(parsedShow.date);
                let artist;
                let show;
                let join;

                try {
                    artist = await this.db.one('INSERT INTO artist (name) VALUES (${name}) RETURNING id', { name: parsedShow.band });
                    this.logger.info(`saved artist "${parsedShow.band}" to db as ID#:${artist.id}`);
                } catch (error) {
                    if (error.message.includes('duplicate key value violates')) {
                        artist = await this.db.one('SELECT id FROM artist WHERE name = ${name}', { name: parsedShow.band });
                        this.logger.warn(`duplicate artist "${parsedShow.band}" already in db as ID#:${artist.id}`);
                    }
                }

                try {
                    show = await this.db.one('INSERT INTO shows (venue, price, is_sold, ages, date, time, multi_day, pit) VALUES (${venue}, ${price}, ${soldOut}, ${ages}, ${date}, ${time}, ${multiShow}, ${pit}) RETURNING id', { venue: parsedShow.venue, price: parsedShow.price, soldOut: parsedShow.soldOut, ages: parsedShow.ages, date: date, time: parsedShow.time, multiShow: parsedShow.multiDay, pit: parsedShow.pit });
                    this.logger.info(`saved show on ${date} at "${parsedShow.venue}" to db as ID#:${show.id}`);
                } catch (error) {
                    if (error.message.includes('duplicate key value violates')) {
                        show = await this.db.one('SELECT id FROM shows WHERE venue = ${venue} AND date = ${date}', { venue: parsedShow.venue, date: date });
                        this.logger.warn(`duplicate show on ${date} at "${parsedShow.venue}" already in db as ID#:${show.id}`);
                    }
                }

                try {
                    join = await this.db.one('INSERT INTO artist_shows (show_id, artist_id) VALUES (${show_id}, ${artist_id}) RETURNING id', { show_id: show.id, artist_id: artist.id});
                    this.logger.info(`saved join show ID#:${show.id} and artist ID#:${artist.id} as ID#:${join.id}`);
                } catch (error) {
                    if (error.message.includes('duplicate key value violates')) {
                        join = await this.db.one('SELECT id FROM artist_shows WHERE show_id = ${show_id} AND artist_id = ${artist_id}', { show_id: show.id, artist_id: artist.id});
                        this.logger.warn(`duplicate join between show ID#:${show.id} and artist ID#:${artist.id} already in db as ID#:${join.id}`);
                    }
                }
            }
        } catch (error) {
            this.logger.error(error);
        }
    }

    buildArtistHashFromArtistsByShow(artistsByShow) {
        const showArtistsHash = {};

        for (const artist of artistsByShow) {
            if (!(artist.show_id in showArtistsHash)) {
                showArtistsHash[artist.show_id] = [artist.name];
            } else {
                showArtistsHash[artist.show_id].push(artist.name);
            }
        }

        return showArtistsHash;
    }

    buildParsedShows(shows, artistsHash) {
        const parsedShows = [];
        for (const show of shows) {
            const artists = artistsHash[show.id];
            parsedShows.push({
                id: show.id,
                bands: artists,
                date: show.date,
                venue: show.venue,
                time: show.time,
                soldOut: show.is_sold,
                pit: show.pit,
                multiDay: show.multi_day,
                ages: show.ages,
                price: show.price,
            });
        }
        return parsedShows;
    }

    async fetchParsedShowsWithGroupedBands() {
        try {
            const shows = await this.db.query(`
                SELECT shows.* FROM shows ORDER BY date
            `);

            const artistsByShow = await this.db.query(`
                SELECT artist_shows.show_id, artist.*
                    FROM artist_shows
                    INNER JOIN artist ON artist_shows.artist_id = artist.id
                    WHERE artist_shows.show_id IN (SELECT shows.id
                        FROM shows)
            `);

            const artistsHash = this.buildArtistHashFromArtistsByShow(artistsByShow);

            const parsedShows = this.buildParsedShows(shows, artistsHash);

            return parsedShows;
        } catch (error) {
            this.logger.error(error);
        }
    }

    async fetchParsedShowsWithGroupedBandsAfterToday() {
        try {
            const shows = await this.db.query(`
                SELECT shows.* FROM shows WHERE date >= now() ORDER BY date
            `);

            const artistsByShow = await this.db.query(`
                SELECT artist_shows.show_id, artist.*
                    FROM artist_shows
                    INNER JOIN artist ON artist_shows.artist_id = artist.id
                    WHERE artist_shows.show_id IN (SELECT shows.id
                        FROM shows
                        WHERE date >= now())
            `);

            const artistsHash = this.buildArtistHashFromArtistsByShow(artistsByShow);

            const parsedShows = this.buildParsedShows(shows, artistsHash);

            return parsedShows;
        } catch (error) {
            this.logger.error(error);
        }
    }

    async fetchParsedShows() {
        try {
            const parsedShows = await this.db.query(`
                SELECT artist.name, shows.date, shows.venue, shows.time, shows.is_sold, shows.pit, shows.multi_day, shows.ages, shows.price
                FROM artist_shows
                INNER JOIN artist ON artist_shows.artist_id = artist.id
                INNER JOIN shows ON artist_shows.show_id = shows.id
                ORDER by date
            `);

            return parsedShows;
        } catch (error) {
            this.logger.error(error);
        }
    }

}

export default DB;
