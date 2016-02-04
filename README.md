# Bay Area Concert Calendar Application

### Setup

1) **Add the following items to `.env` at project root**:

    DB_NAME={name of database}
    DB_HOST={database host name (default:localhost)}
    DB_PORT={database port (default: 5432)}
    DB_USER={admin username}
    DB_PASSWORD={admin password}

    APISERVER_PORT={API server port (default:8080)}
    APISERVER_HOST={API server host name (default:localhost)}
    APPSERVER_PORT={APP server port (default:3000)}
    APPSERVER_HOST={APP server host name (default:localhost)}

    SECRET=a_secret_string_for_your_server

    GOOGLE_CLIENT_ID={Google oAuth client ID}
    GOOGLE_SECRET={Google oAuth secret key}

2) **Set up postgres database with correct schema**:

    npm run db:create:postgres

  (if db is already created, you can delete it with the following script)

    npm run db:delete:postgres

3) **Scrape site and save data to local claim directory**:

    npm run scraper -- -r {claim directory, i.e. ~/tmp}

4) **Copy data from claim directory into postgres**:

    npm run import -- -r {root directory} -c {claim name}

  (claim name is saved in claim directory under `{claim directory}/{claim name}/metadata/claimName.txt`)

5) **Launch API server**:

    npm run api

6) **Launch app server**:

    npm run app

App should then be available at `{APPSERVER_HOST}:{APPSERVER_POST}`.

### CLI Tools

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

(claim name is saved in claim directory under `{claim directory}/{claim name}/metadata/claimName.txt`)

*Usage:* `npm run import -- -r {root directory} -c {claim name}`

### API server

  Notes TBD

### Redux application

  Notes TBD