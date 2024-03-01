import { Grid } from "@mui/material";
import { useGetMessagesQuery, useGetUserClickedQuery } from "../../api/homeApiSlice"
import MessageIcon from '@mui/icons-material/Message';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import CategoryIcon from '@mui/icons-material/Category';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import InfoCard from "../../components/InfoCard";
import { useEffect, useState } from "react";
import { status } from "../../constants/contants";
import { getAllProductCategories } from "../../store/features/productCategory/productCategoryActions";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/features/product/productActions";

export default function Home() {

    const dispatch = useDispatch();
    const { data: userClicked, isLoading: isUserClickedLoading, isSuccess: isUserClickedSuccess, refetch:userClickedRefetch } = useGetUserClickedQuery();
    const { data: messages, isLoading: isMessagesLoading, isSuccess: isMessagesSuccess, refetch:messagesRefetch } = useGetMessagesQuery();

    const userClickedCount = isUserClickedSuccess ? Object.entries(userClicked)?.length : 0;
    const messagesCount = isMessagesSuccess? Object.entries(messages).length : 0;

    const [productCategoryCount, setProductCategoryCount] = useState(0);
    const [productListCount, setProductListCount] = useState(0);
    

    const productCategory = useSelector((state) => state.productCategory.getData);
    const productList = useSelector((state) => state.product.getData);


    useEffect(() => {
        if (productCategory.currentStatus === status.IDLE) {
            dispatch(getAllProductCategories());
        }
        if (productList.currentStatus === status.IDLE) {
            dispatch(getAllProducts());
        }

        if(productCategory.currentStatus === status.SUCCEEDED){
            setProductCategoryCount(Object.values(productCategory.data).length)
        }

        if (productList.currentStatus === status.SUCCEEDED) {
            setProductListCount(Object.values(productList.data).length)
        }

    }, [productCategory.currentStatus, dispatch]);

    useEffect(() => {
        userClickedRefetch();
        messagesRefetch();
    }, [])

    return (
        <>
            <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                    <InfoCard Icon={AdsClickIcon} count={userClickedCount} title={'Total User Clicked'} isLoading={isUserClickedLoading} />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <InfoCard Icon={MessageIcon} count={messagesCount} title={'Total Messages'} isLoading={isMessagesLoading} />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <InfoCard Icon={CategoryIcon} count={productCategoryCount} title={'Total Product Categories'} isLoading={productCategory.currentStatus === status.LOADING} />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <InfoCard Icon={LocalGroceryStoreIcon} count={productListCount} title={'Total Product List'} isLoading={productList.currentStatus === status.LOADING} />
                </Grid>
            </Grid>
        </>
    )
}