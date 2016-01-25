import UserDataRepository from './UserDataRepository';

class DB extends UserDataRepository {

    async saveUser(username, authentication) { // eslint-disable-line no-unused-vars
        throw new Error('Not implemented');
    }

    async addAuthStrategy(id, strategy) { // eslint-disable-line no-unused-vars
        throw new Error('Not implemented');
    }

    async findUserById(id) { // eslint-disable-line no-unused-vars
        throw new Error('Not implemented');
    }

}

export default DB;
