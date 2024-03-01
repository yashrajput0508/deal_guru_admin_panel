import { Box, Breadcrumbs, Button, Grid, Link, TextField, Typography } from "@mui/material";
import ToastMesssage from "../../components/ToastMessage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useToast from "../../hooks/useToast";
import { Link as LinkRouterDom } from "react-router-dom";
import routeUrls from "../../constants/routeUrls";
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useFormik } from "formik";
import { addProductValidation } from "../../utils/validations";
import ProductCategorySelector from "../../components/ProductCategorySelector";
import { convertImageToByteArray } from "../../utils/helpers";
import { status, toastMessageType } from "../../constants/contants";
import { useEffect, useState } from "react";
import { addProduct } from "../../store/features/product/productActions";
import { resetAddDataStatus } from "../../store/features/product/productSlice";
import { LoadingButton } from "@mui/lab";

export default function AddProduct() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const productList = useSelector((state) => state.product.addData);

    const formValues = {
        productName: '',
        productBrand: '',
        productDescription: '',
        productCategory: [],
        productImage: null,
        amazonLink: '',
        flipkartLink: '',
        myntraLink: '',
        ajioLink: '',
        currentDate: new Date().toLocaleString()
    };

    const { toast, handleOpenToast, handleClostToast } = useToast();

    const formik = useFormik({
        initialValues: formValues,
        validationSchema: addProductValidation,
        onSubmit: async (values) => {

            if (!values.amazonLink && !values.flipkartLink && !values.ajioLink && !values.myntraLink) {
                handleOpenToast(toastMessageType.ERROR, 'At least one url should filled');
                return;
            }

            setLoading(true);

            values.productImage = await convertImageToByteArray(values.productImage);
            dispatch(addProduct(values));
        },
    });

    const handleResetForm = () => {
        formik.handleReset();
    }

    useEffect(() => {
        if (productList.currentStatus === status.SUCCEEDED) {
            setLoading(false);
            handleOpenToast(toastMessageType.SUCCESS, productList.successMessage);
            dispatch(resetAddDataStatus());
            handleResetForm();
            navigate(routeUrls.PRODUCTLIST);
        }

        if (productList.currentStatus === status.FAILED) {
            setLoading(false);
            handleOpenToast(toastMessageType.FAILED, productList.error);
            dispatch(resetAddDataStatus());
        }

    }, [dispatch, productList.currentStatus])

    return (
        <>
            <Box component={"div"} m={2}>

                <ToastMesssage show={toast.show} type={toast.type} message={toast.message}
                    handleCloseToast={handleClostToast}
                />

                {/* Title */}
                <Box component={"div"} display={"flex"} alignItems={"center"} justifyContent={"space-between"} bgcolor={"white"} borderRadius={3} p={2}>
                    <Typography variant="h6" fontWeight={700}>
                        Add Product
                    </Typography>


                    <Breadcrumbs separator={<KeyboardArrowRightIcon />} aria-label="breadcrumb">
                        <Link component={LinkRouterDom} underline="hover" key="1" color="inherit" to={routeUrls.HOME}
                            display={"flex"}>
                            <HomeIcon fontSize="small" color="error" />
                        </Link>
                        <Link
                            component={LinkRouterDom}
                            underline="hover"
                            color="inherit"
                            to={routeUrls.PRODUCTLIST}
                        >
                            Product List
                        </Link>
                        <Typography key="3" color="rgb(105, 117, 134);">
                            Add Product
                        </Typography>
                    </Breadcrumbs>
                </Box>

                {/* Add Product */}
                <Box component={"div"} bgcolor={"white"} mt={3} borderRadius={3} p={3}>
                    <Box component={"div"} sx={{
                        border: '1px solid silver'
                    }} borderRadius={3} >

                        <Typography p={2} borderBottom={1} borderColor={'silver'}>
                            Product Information
                        </Typography>

                        <Box component={"div"} p={2}>
                            <form onSubmit={formik.handleSubmit}>
                                <Grid container spacing={2} textAlign={"center"}>

                                    {/* Product Name */}
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            id="productName"
                                            name="productName"
                                            label="Product Name"
                                            value={formik.values.productName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.productName && Boolean(formik.errors.productName)}
                                            helperText={formik.touched.productName && formik.errors.productName}
                                        />
                                    </Grid>

                                    {/* Product Brand */}
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            id="productBrand"
                                            name="productBrand"
                                            label="Product Brand"
                                            value={formik.values.productBrand}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.productBrand && Boolean(formik.errors.productBrand)}
                                            helperText={formik.touched.productBrand && formik.errors.productBrand}
                                        />
                                    </Grid>

                                    {/* Product Category Selector */}
                                    <Grid item xs={12}>
                                        <ProductCategorySelector
                                            value={formik.values.productCategory}
                                            formik={formik}
                                            error={formik.touched.productCategory && Boolean(formik.errors.productCategory)}
                                            helperText={formik.touched.productCategory && formik.errors.productCategory} />
                                    </Grid>

                                    {/* Product Description */}
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            minRows={4}
                                            id="productDescription"
                                            name="productDescription"
                                            label="Product Description"
                                            value={formik.values.productDescription}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.productDescription && Boolean(formik.errors.productDescription)}
                                            helperText={formik.touched.productDescription && formik.errors.productDescription}
                                        />
                                    </Grid>

                                    {/* Current Date */}
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            id="currentDate"
                                            name="currentDate"
                                            label="Current Date"
                                            disabled
                                            value={formik.values.currentDate}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>

                                    {/* Product Image */}
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            id="productImage"
                                            name="productImage"
                                            type="file"
                                            inputProps={{ accept: 'image/*' }}
                                            onChange={(event) => {
                                                formik.setFieldValue('productImage', event.currentTarget.files[0]);
                                            }}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.productImage && Boolean(formik.errors.productImage)}
                                            helperText={formik.touched.productImage && formik.errors.productImage}
                                        />
                                    </Grid>

                                    {/* Amazon Link */}
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="amazonLink"
                                            name="amazonLink"
                                            label="Amazon Link"
                                            value={formik.values.amazonLink}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            helperText={formik.touched.amazonLink && formik.errors.amazonLink}
                                            error={formik.touched.amazonLink && Boolean(formik.errors.amazonLink)}
                                        />
                                    </Grid>

                                    {/* Flipkart Link */}
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="flipkartLink"
                                            name="flipkartLink"
                                            label="Flipkart Link"
                                            value={formik.values.flipkartLink}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            helperText={formik.touched.flipkartLink && formik.errors.flipkartLink}
                                            error={formik.touched.flipkartLink && Boolean(formik.errors.flipkartLink)}
                                        />
                                    </Grid>

                                    {/* Myntra Link */}
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="myntraLink"
                                            name="myntraLink"
                                            label="Myntra Link"
                                            value={formik.values.myntraLink}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            helperText={formik.touched.myntraLink && formik.errors.myntraLink}
                                            error={formik.touched.myntraLink && Boolean(formik.errors.myntraLink)}
                                        />
                                    </Grid>

                                    {/* Ajio Link */}
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="ajioLink"
                                            name="ajioLink"
                                            label="Ajio Link"
                                            value={formik.values.ajioLink}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            helperText={formik.touched.ajioLink && formik.errors.ajioLink}
                                            error={formik.touched.ajioLink && Boolean(formik.errors.ajioLink)}
                                        />
                                    </Grid>
                                </Grid>

                                <LoadingButton loading={loading} type="submit" variant="contained" sx={{ ml: 1, mt: 2 }}>
                                    Submit
                                </LoadingButton>
                                <Button type="reset" onClick={handleResetForm} color="error" variant="contained" sx={{ ml: 1, mt: 2 }}>
                                    Clear
                                </Button>
                            </form>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}