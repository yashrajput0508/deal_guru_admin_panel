import { Box, Breadcrumbs, Button, CircularProgress, Divider, Grid, Link, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { Link as LinkRouterDom, useNavigate } from "react-router-dom";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useDispatch, useSelector } from "react-redux";
import ToastMesssage from "../../components/ToastMessage";
import routeUrls from "../../constants/routeUrls";
import useToast from "../../hooks/useToast";
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import ProductCard from "../../components/ProductCard";
import { useEffect } from "react";
import { status, toastMessageType } from "../../constants/contants";
import { getAllProducts } from "../../store/features/product/productActions";
import { convertByteToImage } from "../../utils/helpers";
import ProductCardList from "../ProductCardList";

export default function ProductList() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.product.getData);

    const { toast, handleOpenToast, handleClostToast } = useToast();

    const navigateToLink = (link) => {
        navigate(link);
    }

    useEffect(() => {
        if (productList.currentStatus === status.IDLE) {
            dispatch(getAllProducts());
        }

        if (productList.currentStatus === status.FAILED) {
            handleOpenToast(toastMessageType.ERROR, productList.error)
        }
    }, [productList.currentStatus, dispatch]);

    return (
        <>
            <Box component={"div"} m={2}>

                <ToastMesssage show={toast.show} type={toast.type} message={toast.message}
                    handleCloseToast={handleClostToast}
                />

                {/* Title */}
                <Box component={"div"} display={"flex"} alignItems={"center"} justifyContent={"space-between"} bgcolor={"white"} borderRadius={3} p={2}>
                    <Typography variant="h6" fontWeight={700}>
                        Product List
                    </Typography>

                    <Breadcrumbs separator={<KeyboardArrowRightIcon />} aria-label="breadcrumb">
                        <Link component={LinkRouterDom} underline="hover" key="1" color="inherit" to={routeUrls.HOME}
                            display={"flex"}>
                            <HomeIcon fontSize="small" color="error" />
                        </Link>
                        <Typography key="3" color="rgb(105, 117, 134);">
                            Product List
                        </Typography>
                    </Breadcrumbs>
                </Box>

                {/* Product List */}
                <Box component={"div"} bgcolor={"white"} mt={3} borderRadius={3}>

                    {/* Filters & Add Product */}
                    <Box component={"div"} display={"flex"} p={1} mx={1} justifyContent={"space-between"}>
                        <Button size="medium" variant="contained" color="secondary" sx={{
                            borderRadius: '20px'
                        }} startIcon={<FilterListIcon />}>Filter</Button>

                        <Button size="medium" variant="contained" color="secondary" sx={{
                            borderRadius: '20px'
                        }} startIcon={<AddIcon />} onClick={() => navigateToLink(routeUrls.ADDPRODUCT)}>Add Product</Button>
                    </Box>

                    {/* Divider */}
                    <Divider />

                    {/* Products List */}
                    <Box component={"div"}>
                        <ProductCardList 
                            productList={productList.data}
                            currentStatus={productList.currentStatus}
                        />                        
                    </Box>
                </Box>
            </Box>
        </>
    )
}