import { Box, Breadcrumbs, Button, CircularProgress, Divider, Grid, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';

import { Link as LinkRouterDom } from "react-router-dom";
import routeUrls from "../../constants/routeUrls";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductCategories } from "../../store/features/productCategory/productCategoryActions";
import { status, toastMessageType } from "../../constants/contants";
import { convertByteToImage } from "../../utils/helpers";
import ProductCategoryCard from "../../components/ProductCategoryCard";
import ToastMesssage from "../../components/ToastMessage";
import useToast from "../../hooks/useToast";

export default function ProductCategories() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { toast, handleOpenToast, handleClostToast } = useToast();
    const productCategory = useSelector((state) => state.productCategory.getData);

    const navigateToLink = (link) => {
        navigate(link);
    }

    useEffect(() => {
        if (productCategory.currentStatus === status.IDLE) {
            dispatch(getAllProductCategories());
        }

        if (productCategory.currentStatus === status.FAILED) {
            handleOpenToast(toastMessageType.ERROR, productCategory.error)
        }
        console.log(productCategory.data);
    }, [productCategory.currentStatus, dispatch]);

    return (
        <>
            <Box component={"div"} m={2}>

                <ToastMesssage show={toast.show} type={toast.type} message={toast.message}
                    handleCloseToast={handleClostToast}
                />

                {/* Title */}
                <Box component={"div"} display={"flex"} alignItems={"center"} justifyContent={"space-between"} bgcolor={"white"} borderRadius={3} p={2}>
                    <Typography variant="h6" fontWeight={700}>
                        Product Categories
                    </Typography>


                    <Breadcrumbs separator={<KeyboardArrowRightIcon />} aria-label="breadcrumb">
                        <Link component={LinkRouterDom} underline="hover" key="1" color="inherit" to={routeUrls.HOME}
                            display={"flex"}>
                            <HomeIcon fontSize="small" color="error" />
                        </Link>
                        <Typography key="3" color="rgb(105, 117, 134);">
                            Product Categories
                        </Typography>
                    </Breadcrumbs>
                </Box>

                {/* Product Categories */}
                <Box component={"div"} bgcolor={"white"} mt={3} borderRadius={3}>

                    {/* Filters & Add Category */}
                    <Box component={"div"} display={"flex"} p={1} mx={1} justifyContent={"space-between"}>
                        <Button size="medium" variant="contained" color="secondary" sx={{
                            borderRadius:'20px'
                        }} startIcon={<FilterListIcon />}>Filter</Button>

                        <Button size="medium" variant="contained" color="secondary" sx={{
                            borderRadius:'20px'
                        }} startIcon={<AddIcon />} onClick={() => navigateToLink(routeUrls.ADDCATEGORY)}>Add Category</Button>
                    </Box>

                    {/* Divider */}
                    <Divider />

                    {/* Categories List */}
                    <Box component={"div"}>
                        {
                            productCategory.currentStatus === status.SUCCEEDED ?
                                (
                                    <Grid container px={2}>
                                        {
                                            Object.values(productCategory.data).map((product, index) => (
                                                <Grid item xs={2.4}>
                                                    <ProductCategoryCard
                                                        key={index}
                                                        name={product.categoryName}
                                                        image={convertByteToImage(product.categoryImage)}
                                                    />
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                ) :
                                (
                                    // Loader
                                    <Box component={"div"} textAlign={"center"} mt={5}>
                                        <CircularProgress />
                                    </Box>
                                )
                        }
                    </Box>
                </Box>
            </Box>
        </>
    )
}