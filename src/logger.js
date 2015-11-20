class Logger {

    error(msg) {
        this.log(msg, 'error');
    }
    warn(msg) {
        this.log(msg, 'warn');
    }
    info(msg) {
        this.log(msg, 'info');
    }

    log(msg, type) {
        throw new Error('Not implemented');
    }
}

export default Logger;
