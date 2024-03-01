import { Box, Breadcrumbs, Button, CircularProgress, Divider, Grid, IconButton, Link, Tooltip, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"
import ToastMesssage from "../../components/ToastMessage";
import HomeIcon from '@mui/icons-material/Home';
import routeUrls from "../../constants/routeUrls";
import { Link as LinkRouterDom } from "react-router-dom";
import useToast from "../../hooks/useToast";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { status, toastMessageType } from "../../constants/contants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteProductById, getAllProducts } from "../../store/features/product/productActions";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { convertByteToImage } from "../../utils/helpers";
import AlertDialogBox from "../../components/AlertDialogBox";
import useAlertDialogBox from "../../hooks/useAlertDialogBox";
import { resetDeleteDataStatus } from "../../store/features/product/productSlice";
import Loading from "../../components/Loading";

export default function ProductView() {

    const { productId } = useParams();
    const [product, setProduct] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast, handleOpenToast, handleClostToast } = useToast();
    const productList = useSelector((state) => state.product.getData);
    const deleteProduct = useSelector((state) => state.product.deleteData);

    const [copyToClipboard, setCopyToClipboard] = useState(false);
    const { openAlertDialogBox, handleOpenAlertDialogBox, handleCloseAlertDialogBox } = useAlertDialogBox();

    const handleCopyClipboard = () => {
        navigator.clipboard.writeText(productId)
        setCopyToClipboard(true);

        setTimeout(() => {
            setCopyToClipboard(false);
        }, [3000])
    }

    const handleEditProduct = () => {
        navigate(routeUrls.EDITPRODUCT+"/"+productId);
    }

    const handleDeleteProduct = () => {
        handleOpenAlertDialogBox();
    }

    const navigateToUrl = (link) => {
        window.open(link, '_blank');
    }

    const handleAgreeAlertDialogBox = () => {
        dispatch(deleteProductById(productId));
        handleCloseAlertDialogBox();
    }

    useEffect(() => {
        if (productList.currentStatus === status.IDLE) {
            dispatch(getAllProducts());
        }

        if (productList.currentStatus === status.SUCCEEDED) {
            setProduct(Object.entries(productList.data).find(([key]) => key === productId))
        }

        if (productList.currentStatus === status.FAILED) {
            handleOpenToast(toastMessageType.ERROR, productList.error)
        }
    }, [productList.currentStatus, dispatch]);

    useEffect(() => {

        if (deleteProduct.currentStatus === status.SUCCEEDED) {
            dispatch(resetDeleteDataStatus());
            navigate(routeUrls.PRODUCTLIST)
        }

        if (deleteProduct.currentStatus === status.FAILED) {
            handleOpenToast(toastMessageType.ERROR, productList.error)
        }

    }, [deleteProduct.currentStatus, dispatch]);

    return (
        <>
            <Box component={"div"} m={2}>

                <ToastMesssage show={toast.show} type={toast.type} message={toast.message}
                    handleCloseToast={handleClostToast}
                />

                <AlertDialogBox openAlertDialogBox={openAlertDialogBox}
                    handleCloseAlertDialogBox={handleCloseAlertDialogBox}
                    handleAgreeAlertDialogBox={handleAgreeAlertDialogBox}
                />

                {/* Title */}
                <Box component={"div"} display={"flex"} alignItems={"center"} justifyContent={"space-between"} bgcolor={"white"} borderRadius={3} p={2}>
                    <Typography variant="h6" fontWeight={700}>
                        Product View
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
                            Product View
                        </Typography>
                    </Breadcrumbs>
                </Box>

                {/* Product View */}
                <Box component={"div"} bgcolor={"white"} mt={3} borderRadius={3} p={2}>
                    <Loading currentStatus={productList.currentStatus}>
                        <div>

                            {/* Filters & Add Product */}
                            <Box component={"div"} display={"flex"} p={1} mx={1} justifyContent={"space-between"}>

                                <Button size="medium" variant="contained" color="secondary" sx={{
                                    borderRadius: '20px'
                                }} startIcon={<EditIcon />} onClick={handleEditProduct}>Edit Product</Button>

                                <Button size="medium" variant="contained" color="error" sx={{
                                    borderRadius: '20px'
                                }} startIcon={<DeleteIcon />} onClick={handleDeleteProduct}>Delete Product</Button>


                            </Box>

                            {/* Divider */}
                            <Divider />

                            {/* Product Details */}
                            <Grid container spacing={2} mt={2}>
                                <Grid item xs={12} sm={5} textAlign={"center"}>
                                    <img src={convertByteToImage(product[1]?.productImage)} width={"70%"} alt="" />
                                </Grid>
                                <Grid item xs={12} sm={7}>
                                    <Box component={"div"}>
                                        <Typography component={"div"} color={"silver"} variant="body1" fontWeight={500} fontFamily={"Barlow,sans-serif"}
                                            sx={{ textTransform: 'uppercase' }}
                                        >
                                            {product[1]?.productBrand}
                                        </Typography>
                                        <Typography component={"div"} variant="h6" fontWeight={600} fontFamily={"Barlow,sans-serif"}>
                                            {product[1]?.productName}
                                        </Typography>

                                        <Typography fontFamily={"Barlow,sans-serif"} color={"#777"} mt={2}>
                                            {product[1]?.productDescription}
                                        </Typography>

                                        <Box display={"flex"} alignItems={"center"} mt={2}>
                                            <Typography component={"div"} color={"silver"} variant="body2" fontWeight={500} fontFamily={"Barlow,sans-serif"}>
                                                ID: {product[0]}
                                            </Typography>
                                            <Tooltip
                                                PopperProps={{
                                                    disablePortal: true,
                                                }}
                                                open={copyToClipboard}
                                                disableFocusListener
                                                disableHoverListener
                                                disableTouchListener
                                                title="Copied Id"
                                            >
                                                <IconButton aria-label="copy" onClick={handleCopyClipboard}>
                                                    <ContentCopyIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                    <Box display={"flex"} mt={2}>
                                        <Button
                                            variant="contained"
                                            disableElevation
                                            style={{
                                                backgroundColor: "#FF9900", // Amazon orange
                                                color: "white",
                                                marginRight: "8px",
                                                borderRadius: "4px", // Optional: To round the corners
                                            }}
                                            sx={{
                                                display: product[1]?.amazonLink ? 'inline-block' : 'none'
                                            }}
                                            onClick={() => navigateToUrl(product[1]?.amazonLink)}
                                        >
                                            Amazon Link
                                        </Button>

                                        {/* Flipkart Style */}
                                        <Button
                                            variant="contained"
                                            hidden={true}
                                            disableElevation
                                            style={{
                                                backgroundColor: "#2874F0", // Flipkart blue
                                                color: "white",
                                                borderRadius: "4px", // Optional: To round the corners
                                            }}
                                            sx={{
                                                display: product[1]?.flipkartLink ? 'inline-block' : 'none'
                                            }}
                                            onClick={() => navigateToUrl(product[1]?.flipkartLink)}
                                        >
                                            Flipkart Link
                                        </Button>
                                    </Box>
                                    <Box display={"flex"} mt={2}>
                                        <Button
                                            variant="contained"
                                            disableElevation
                                            style={{
                                                backgroundColor: "#db3317", // Amazon orange
                                                color: "white",
                                                marginRight: "8px",
                                                borderRadius: "4px", // Optional: To round the corners
                                            }}
                                            sx={{
                                                display: product[1]?.myntraLink ? 'inline-block' : 'none'
                                            }}
                                            onClick={() => navigateToUrl(product[1]?.myntraLink)}
                                        >
                                            Myntra Link
                                        </Button>

                                        {/* ajio Style */}
                                        <Button
                                            variant="contained"
                                            hidden={true}
                                            disableElevation
                                            style={{
                                                background: 'linear-gradient(to right, #1C3FAA, #0057B3)', // Ajio linear gradient
                                                color: "white",
                                                borderRadius: "4px", // Optional: To round the corners
                                                paddingLeft: 35,
                                                paddingRight: 35
                                            }}
                                            sx={{
                                                display: product[1]?.ajioLink ? 'inline-block' : 'none'
                                            }}
                                            onClick={() => navigateToUrl(product[1]?.ajioLink)}
                                        >
                                            Ajio Link
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </div>
                    </Loading>
                </Box>
            </Box>
        </>
    )
}