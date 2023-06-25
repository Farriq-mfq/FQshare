import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Download from '../pages/Download';
const router = createBrowserRouter([
    {
        path: '/',
        element: Home(),
        errorElement: '<>error</>'
    },
    {
        path: '/:id',
        element: Download(),
    }
]);

export default router