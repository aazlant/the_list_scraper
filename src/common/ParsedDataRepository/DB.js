// #TODO: TEST

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
                    join = await this.db.one('INSERT INTO show_artist (show_id, artist_id) VALUES (${show_id}, ${artist_id}) RETURNING id', { show_id: show.id, artist_id: artist.id});
                    this.logger.info(`saved join show ID#:${show.id} and artist ID#:${artist.id} as ID#:${join.id}`);
                } catch (error) {
                    if (error.message.includes('duplicate key value violates')) {
                        join = await this.db.one('SELECT id FROM show_artist WHERE show_id = ${show_id} AND artist_id = ${artist_id}', { show_id: show.id, artist_id: artist.id});
                        this.logger.warn(`duplicate join between show ID#:${show.id} and artist ID#:${artist.id} already in db as ID#:${join.id}`);
                    }
                }
            }
        } catch (error) {
            this.logger.error(error);
        }
    }

    async fetchShowArtist(id) {
        try {
            const showArtist = await this.db.one('SELECT * FROM show_artist WHERE id = ${id}', {id: id});
            return showArtist;
        } catch (error) {
            this.logger.error(error);
        }
    }

    async fetchShow(id) {
        try {
            const showArtist = await this.db.one('SELECT * FROM shows WHERE id = ${id}', {id: id});
            return showArtist;
        } catch (error) {
            this.logger.error(error);
        }
    }

    async fetchArtist(id) {
        try {
            const showArtist = await this.db.one('SELECT * FROM artist WHERE id = ${id}', {id: id});
            return showArtist;
        } catch (error) {
            this.logger.error(error);
        }
    }

    async fetchParsedShow(artistId, showId) {
        const artist = await this.fetchArtist(artistId);
        const artistName = artist.name;
        const show = await this.fetchShow(showId);
        return {'band': artistName, 'date': show.date, 'venue': show.venue, 'time': show.time, 'soldOut': show.soldOut, 'pit': show.pit, 'multiDay': show.multiDay, 'ages': show.ages, 'price': show.price};
    }

    async fetchParsedShows() {
        try {
            const shows = [];
            const showArtists = await this.db.query('SELECT * FROM show_artist');
            for (const showArtist of showArtists) {
                const show = await this.fetchParsedShow(showArtist.artist_id, showArtist.show_id);
                shows.push(show);
            }
            return shows;
        } catch (error) {
            this.logger.error(error);
        }
    }

}

export default DB;
