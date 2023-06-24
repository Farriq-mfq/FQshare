import "dotenv/config";
import { json, urlencoded } from "express";
import MyLogger from './app/logger';
import App from './app/server';
import { routes } from "./app/web";
// main function
(async () => {
    const server = new App();
    const app = server.app
    app.use(json())
    app.use(urlencoded({ extended: false }))
    routes(app);
    // running app
    app.listen(process.env.PORT, function () {
        MyLogger.info(`SERVER RUN 🐱‍🏍: http://localhost:${process.env.PORT}`)
    })
})()