import ParsedDataRepository from '../ParsedDataRepository';


class DB extends ParsedDataRepository {
    constructor(logger, db) {
        super();
        this.logger = logger;
        this.db = db;
    }

    setRootPath(rootPath) {
    }

    async saveParsedShows(parsedShows) {
        try {
            // {"band":"Phases","date":"Sun 16 Oct 2016","numberOfShows":"total_shows","venue":"Arena, Oakland","time":"6:30pm/7:30pm","soldOut":null,"pit":null,"multiDay":null,"ages":"a/a","price":"$30.50"}

            // shows:
            //     id serial,
            //     date datetime,
            //     venue varchar,
            //     price varchar,
            //     is_sold bool,
            //     ages varchar,            
            // show_artist:
            //     id serial,
            //     show_id int,
            //     artist_id int            
            // artist:
            //     id serial,
            //     name varchar

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
                        this.logger.warn(`duplicate artist "${parsedShow.band}" to db as ID#:${artist.id}`);
                    }
                }

                try { 
                    show = await this.db.one('INSERT INTO shows (venue, price, is_sold, ages, date) VALUES (${venue}, ${price}, ${soldOut}, ${ages}, ${date}) RETURNING id', { venue: parsedShow.venue, price: parsedShow.price, soldOut: parsedShow.soldOut, ages: parsedShow.ages, date: date });
                    this.logger.info(`saved show for artist "${parsedShow.band}" on ${date} at "${parsedShow.venue}" to db as ID#:${show.id}`);
                } catch (error) {
                    if (error.message.includes('duplicate key value violates')) {
                        show = await this.db.one('SELECT id FROM shows WHERE venue = ${venue} AND date = ${date}', { venue: parsedShow.venue, date: date });
                    }
                }

                try { 
                    join = await this.db.one('INSERT INTO show_artist (show_id, artist_id) VALUES (${show_id}, ${artist_id}) RETURNING id', { show_id: show.id, artist_id: artist.id});
                    this.logger.info(`saved join show ID#:${show.id} and artist ID#:${artist.id} as ID#:${join.id}`);
                } catch (error) {
                    if (error.message.includes('duplicate key value violates')) {
                        join = await this.db.one('SELECT id FROM show_artist WHERE show_id = ${show_id} AND artist_id = ${artist_id}', { show_id: show.id, artist_id: artist.id});
                    }
                }
            }

        } catch (error) {            
            this.logger.error(error);
        }
    }

    fetchedParsedShows() {
    
    }

}

export default DB;
