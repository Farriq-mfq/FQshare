import "dotenv/config";
import { urlencoded } from "express";
import { uploadBytes } from "firebase/storage";
import { firebase } from "./app/config";
import storageRef from "./app/config/storage";
import MyLogger from './app/logger';
import App from './app/server';
import { routes } from "./app/web";
import path from 'path'
// main function
(async () => {
    const server = new App();
    const app = server.app
    app.use(urlencoded())
    routes(app);
    // running app
    app.listen(process.env.PORT, function () {
        MyLogger.info(`SERVER RUN 🐱‍🏍: http://localhost:${process.env.PORT}`)
    })
})()