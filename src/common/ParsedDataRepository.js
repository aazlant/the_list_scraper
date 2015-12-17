// #TODO: TEST

class ParsedDataRepository {

    setRootPath(rootPath) {// eslint-disable-line no-unused-vars
        throw new Error('Not implemented');
    }

    // ^ This could be implemented better in an abstract factory method, but it would require greater abstraction than makes sense for this project.

    async saveParsedShows(key, parsedShows) { // eslint-disable-line no-unused-vars
        throw new Error('Not implemented');
    }

    async fetchedParsedShows(key) { // eslint-disable-line no-unused-vars
        throw new Error('Not implemented');
    }

}

export default ParsedDataRepository;
