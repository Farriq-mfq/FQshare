import { Express } from "express";
import { ShareRoutes } from "../routes";

const routes = (app: Express) => {
    // define your routes here
    app.use('/share', ShareRoutes)
}
export default routes;