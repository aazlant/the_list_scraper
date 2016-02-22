import UserDataRepository from '../UserDataRepository';

class DB extends UserDataRepository {

    constructor(logger, db) {
        super();
        this.logger = logger;
        this.db = db;
    }

    async saveUser(username, email, authentication) { // eslint-disable-line no-unused-vars
        try {
            let user;

            try {
                user = await this.db.one('INSERT INTO users (name, email) VALUES (${name}, ${email}) RETURNING id', { name: username, email: email });
                this.logger.info(`saved user "${email}" to db as ID#:${user.id}`);
            } catch (error) {
                if (error.message.includes('duplicate key value violates')) {
                    user = await this.db.one('SELECT id FROM users WHERE email = ${email}', { email: email });
                    this.logger.warn(`duplicate user "${email}" already in db (user) as ID#:${user.id}`);
                }
            }

            switch (authentication.provider) {

            case 'google': {
                let googleAuth;
                const { id, token } = authentication.payload;

                try {
                    googleAuth = await this.db.one('INSERT INTO auth_google (google_id, token, user_id) VALUES (${googleId}, ${token}, ${userId}) RETURNING *', { googleId: id, token, userId: user.id });
                } catch (error) {
                    if (error.message.includes('duplicate key value violates')) {
                        googleAuth = await this.db.one('SELECT * FROM auth_google WHERE user_id = ${userId}', { userId: user.id });
                        this.logger.warn(`duplicate user "${email}" already in db (google auth) as ID#:${authentication.id}`);
                    }
                    this.logger.error(error);
                }

                return {user, auth: googleAuth};
            }

            default:

            }
        } catch (error) {
            this.logger.error(error);
        }
    }

    async addAuthStrategy(id, strategy) { // eslint-disable-line no-unused-vars
        throw new Error('Not implemented');
    }

    async fetchUser(username, email, authentication) {
        let user;
        let auth;

        try {
            user = await this.db.one('SELECT id FROM users WHERE email = ${email}', { email: email });

            switch (authentication.provider) {

            case 'google': {
                auth = await this.db.one('SELECT * FROM auth_google WHERE user_id = ${userId}', { userId: user.id });
            }

            default:

            }

            return ({user, auth});
        } catch (error) {
            if (error.message.includes('No data returned')) {
                return null; // QUESTION: Good approach??
            }
            this.logger.error(error);
        }
    }

}

export default DB;
