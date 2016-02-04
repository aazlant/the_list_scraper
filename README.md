# Bay Area Concert Calendar Application

### Command-line tools

1) Scrapes https://www.uncorp.net/list/index.html and parses the results, producing a claim that contains a json file for import into a database.

*Usage:* `npm run scraper -- -r {root directory}`

Produces a claim directory in root with

    |
    |-{claim name}\
       |-html\index.html
       |-logs\import.log
       |-metadata\claimName.txt
       |-parsed_shows\parsed_shows.json
       |-raw_shows\raw_shows.json
       \-tmp\

2) Copies the parsed shows from a claim into a postgres DB instance

Requires an `.env` file with the following:

    DB_NAME={dbname}
    DB_HOST={dbhost}
    DB_PORT={dbport}
    DB_USER={user}
    DB_PASSWORD={password}

Assumes three tables in the db: `artist`, `shows`, and `shows_artist`

*Usage:* `npm run import -- -r {root directory} -c {claim name}`

### API server

### Redux application