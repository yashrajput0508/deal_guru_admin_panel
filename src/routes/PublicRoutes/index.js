import routeUrls from "../../constants/routeUrls";
import HomeLayout from "../../layout/HomeLayout";
import AddCategory from "../../pages/AddCategory";
import AddProduct from "../../pages/AddProduct";
import EditProduct from "../../pages/EditProduct";
import Home from "../../pages/Home";
import ProductCategories from "../../pages/ProductCategories";
import ProductList from "../../pages/ProductList";
import ProductView from "../../pages/ProductView";

const PublicRoutes = {
    path: routeUrls.HOME,
    Component: HomeLayout,
    children: [
        {
            index: true,
            Component: Home
        },
        {
            path: routeUrls.PRODUCTCATEGORIES,
            Component: ProductCategories
        },
        {
            path: routeUrls.ADDCATEGORY,
            Component: AddCategory
        },
        {
            path: routeUrls.PRODUCTLIST,
            Component: ProductList
        },
        {
            path: routeUrls.ADDPRODUCT,
            Component: AddProduct
        },
        {
            path: routeUrls.EDITPRODUCT+'/:productId',
            Component: EditProduct
        },
        {
            path: routeUrls.PRODUCTVIEW+'/:productId',
            Component: ProductView
        }
    ]
}

export default PublicRoutes;