import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Download from "../pages/Download";
import Error from "../pages/Error";
const router = createBrowserRouter([
    {
        path: "/",
        Component: Home,
        errorElement: Error()
    },
    {
        path: "/:id",
        Component: Download,
        errorElement: Error()
    },
]);

export default router