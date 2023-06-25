import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Download from "../pages/Download";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Home,
    },
    {
        path: "/:id",
        Component: Download,
    },
]);

export default router