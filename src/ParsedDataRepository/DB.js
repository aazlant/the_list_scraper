import ParsedDataRepository from '../ParsedDataRepository';


class DB extends ParsedDataRepository {
    constructor(logger, db) {
        super();
        this.logger = logger;
        this.db = db;
    }

    setRootPath(rootPath) {
    }

    saveParsedShows(parsedShows) {
        // {"band":"Phases","date":"Sun 16 Oct 2016","numberOfShows":"total_shows","venue":"Arena, Oakland","time":"6:30pm/7:30pm","soldOut":null,"pit":null,"multiDay":null,"ages":"a/a","price":"$30.50"}

        // show:
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

        return new Promise(

            (resolve, reject) => {
                const promises = [];

                const permitDupes = (error)=> {
                    if (error.message.includes('duplicate key value violates')) {
                        this.logger.warn('Duplicate entry.');
                        return;
                    }                
                    throw error;
                };

                for (const show of parsedShows) {
                    const date = new Date(show.date);
                    promises.push(this.db.query('INSERT INTO artist (name) VALUES (${name})', { name: show.band })
                        .then(()=>{
                            this.logger.info(`inserted: {name: ${show.band}}`);
                        })
                        .catch(permitDupes)
                    );
                    promises.push(
                        this.db.query('INSERT INTO shows (venue, price, is_sold, ages, date) VALUES (${venue}, ${price}, ${soldOut}, ${ages}, ${date})', { venue: show.venue, price: show.price, soldOut: show.soldOut, ages: show.ages, date: date })
                        .then(()=>{
                            this.logger.info(`inserted: {venue: ${show.venue}, price: ${show.price}, soldOut: ${show.soldOut}, ages: ${show.ages}, date: ${date}}`);
                        })
                        .catch(permitDupes)
                    );
                }

                Promise.all(promises).then(()=>{resolve()}).catch((error)=>{reject(error)});
            }
        );
    }

    fetchedParsedShows() {
    
    }

}

export default DB;
