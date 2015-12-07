// #TODO: TEST

class RawDataRepository {

    setRootPath(rootPath){// eslint-disable-line no-unused-vars
        throw new Error('Not implemented');
    }

    // ^ This could be implemented better in an abstract factory method, but it would require greater abstraction than makes sense for this project.

    saveHTML(HTML, key) { // eslint-disable-line no-unused-vars
        throw new Error('Not implemented');
    }

    saveRawShows(rawShows, key) { // eslint-disable-line no-unused-vars
        throw new Error('Not implemented');
    }

    fetchHTML(key) { // eslint-disable-line no-unused-vars
        throw new Error('Not implemented');
    }

    fetchRawShows(key) { // eslint-disable-line no-unused-vars
        throw new Error('Not implemented');
    }
}

export default RawDataRepository;
