import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";
import { Box, Breadcrumbs, Button, Divider, Grid, Link, TextField, Typography } from "@mui/material";
import ToastMesssage from "../../components/ToastMessage";
import routeUrls from "../../constants/routeUrls";
import HomeIcon from '@mui/icons-material/Home';
import { Link as LinkRouterDom } from "react-router-dom";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useFormik } from "formik";
import { addCategoryValidation } from "../../utils/validations";
import { convertImageToByteArray } from "../../utils/helpers";
import { status, toastMessageType } from "../../constants/contants";
import { addProductCategory } from "../../store/features/productCategory/productCategoryActions";
import { useEffect } from "react";

export default function AddCategory() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const productCategory = useSelector((state) => state.productCategory.addData);

    const { toast, handleOpenToast, handleClostToast } = useToast();

    const formik = useFormik({
        initialValues: {
            categoryName: '',
            categorySearchBy: '',
            categoryImage: null,
            currentDate: new Date().toLocaleString()
        },
        validationSchema: addCategoryValidation,
        onSubmit: async (values) => {
            values.categoryImage = await convertImageToByteArray(values.categoryImage);
            dispatch(addProductCategory(values));
        },
    });

    useEffect(() => {
        if (productCategory.currentStatus === status.SUCCEEDED){
            handleOpenToast(toastMessageType.SUCCESS, productCategory.successMessage);
        }

        if(productCategory.currentStatus === status.FAILED){
            handleOpenToast(toastMessageType.ERROR, productCategory.error);
        }
    }, [dispatch, productCategory.currentStatus])

    return (
        <>
            <Box component={"div"} m={2}>

                <ToastMesssage show={toast.show} type={toast.type} message={toast.message}
                    handleCloseToast={handleClostToast}
                />

                {/* Title */}
                <Box component={"div"} display={"flex"} alignItems={"center"} justifyContent={"space-between"} bgcolor={"white"} borderRadius={3} p={2}>
                    <Typography variant="h6" fontWeight={700}>
                        Add Category
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
                            to={routeUrls.PRODUCTCATEGORIES}
                        >
                            Product Categories
                        </Link>
                        <Typography key="3" color="rgb(105, 117, 134);">
                            Add Category
                        </Typography>
                    </Breadcrumbs>
                </Box>

                {/* Add Category */}
                <Box component={"div"} bgcolor={"white"} mt={3} borderRadius={3} p={3}>
                    <Box component={"div"} sx={{
                        border: '1px solid silver'
                    }} borderRadius={3} >

                        <Typography p={2} borderBottom={1} borderColor={'silver'}>
                            Category Information
                        </Typography>

                        <Box component={"div"} p={2}>
                            <form onSubmit={formik.handleSubmit}>
                                <Grid container spacing={2} textAlign={"center"}>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            id="categoryName"
                                            name="categoryName"
                                            label="Category Name"
                                            value={formik.values.categoryName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.categoryName && Boolean(formik.errors.categoryName)}
                                            helperText={formik.touched.categoryName && formik.errors.categoryName}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            id="categorySearchBy"
                                            name="categorySearchBy"
                                            label="Category Search By"
                                            value={formik.values.categorySearchBy}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.categorySearchBy && Boolean(formik.errors.categorySearchBy)}
                                            helperText={formik.touched.categorySearchBy && formik.errors.categorySearchBy}
                                        />
                                    </Grid>
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
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            id="categoryImage"
                                            name="categoryImage"
                                            type="file"
                                            inputProps={{ accept: 'image/*' }}
                                            onChange={(event) => {
                                                formik.setFieldValue('categoryImage', event.currentTarget.files[0]);
                                            }}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.categoryImage && Boolean(formik.errors.categoryImage)}
                                            helperText={formik.touched.categoryImage && formik.errors.categoryImage}
                                        />
                                    </Grid>
                                </Grid>

                                <Button type="submit" variant="contained" sx={{ ml: 1, mt: 2 }}>
                                    Submit
                                </Button>
                                <Button type="button" color="error" variant="contained" sx={{ ml: 1, mt: 2 }}>
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