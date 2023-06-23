import express, { Express } from 'express';
import * as core from 'express-serve-static-core';

class Server {
    private application: core.Express;

    constructor() {
        this.application = express();
    }

    get app(): Express {
        return this.application
    }
}



export default Server