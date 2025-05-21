import Task45 from "../component/task45";
import Task44 from "../component/Task44";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../page/HomePage";
import Task46 from "../component/Task46";


const router = createBrowserRouter([
 
    {
        path: "/",
        element: <HomePage />
    },{
        path: "/task44",
        element: <Task44 />
    },

    {
        path: "/task45",
        element: <Task45 />
    },
    {
        path: "/task46",
        element: <Task46 />
    }
]);
export default router;