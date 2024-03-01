import { Box, CircularProgress, Grid } from "@mui/material";
import { status } from "../../constants/contants";
import ProductCard from "../../components/ProductCard";
import { convertByteToImage } from "../../utils/helpers";

export default function ProductCardList({currentStatus, productList}) {
    return (
        <>
            {
                currentStatus === status.SUCCEEDED ?
                    (
                        <Grid container textAlign={"-webkit-center"}>
                            {
                                Object.entries(productList).map((product, index) => (
                                    <Grid item key={product[0]} xs={3}>
                                        <ProductCard
                                            productId={product[0]}
                                            productName={product[1].productName}
                                            productImage={convertByteToImage(product[1].productImage)}
                                            productBrand={product[1].productBrand}
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
        </>
    )
}