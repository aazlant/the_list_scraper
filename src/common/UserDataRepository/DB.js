import UserDataRepository from '../UserDataRepository';

class DB extends UserDataRepository {

    constructor(logger, db) {
        super();
        this.logger = logger;
        this.db = db;
    }

    async saveUser(username, email, authentication) { // eslint-disable-line no-unused-vars
        try {
            try {
                const user = await this.db.one('INSERT INTO users (name, email) VALUES (${name}, ${email}) RETURNING id', { name: username, email: email });
                this.logger.info(`saved user "${email}" to db as ID#:${user.id}`);
                return user;

            } catch (error) {
                if (error.message.includes('duplicate key value violates')) {
                    const user = await this.db.one('SELECT id FROM users WHERE email = ${email}', { email: email });
                    this.logger.warn(`duplicate user "${email}" already in db as ID#:${user.id}`);
                }
            }

            // #TODO: logic for parsing auth goes here

        } catch (error) {
            this.logger.error(error);
        }
    }

    async addAuthStrategy(id, strategy) { // eslint-disable-line no-unused-vars
        throw new Error('Not implemented');
    }

    async findUserById(id) { // eslint-disable-line no-unused-vars
        throw new Error('Not implemented');
    }

}

export default DB;
