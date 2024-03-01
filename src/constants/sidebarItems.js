import routeUrls from "./routeUrls";
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import ListIcon from '@mui/icons-material/List';

const sidebarItems = [
    {
        label: "Home",
        url: routeUrls.HOME,
        icon:<HomeIcon />
    },
    {
        label: "Product Categories",
        url: routeUrls.PRODUCTCATEGORIES,
        icon:<CategoryIcon />
    },
    {
        label: "Product List",
        url: routeUrls.PRODUCTLIST,
        icon:<ListIcon />
    }
]

export default sidebarItems;