import { createBrowserRouter } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";

const routes = createBrowserRouter([PublicRoutes], { basename: '/deal_guru_admin_panel' });

export default routes;