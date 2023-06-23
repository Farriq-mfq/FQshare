import "dotenv/config"
import App from './app/server'
import MyLogger from './app/logger'
import { routes } from "./app/web";
// main function
(() => {
    const server = new App();
    const app = server.app
    routes(app);
    // running app
    app.listen(process.env.PORT, function () {
        MyLogger.info(`SERVER RUN 🐱‍🏍: http://localhost:${process.env.PORT}`)
    })
})()