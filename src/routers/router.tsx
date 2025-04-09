import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Likes from "../pages/Likes";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      { index: true, element: <Home /> },
      { path: "movie/:id", element: <Detail /> },
      { path: "likes", element: <Likes /> },
    ],
  },
]);

export default router;
