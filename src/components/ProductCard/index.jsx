import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import routeUrls from "../../constants/routeUrls";

export default function ProductCard({ productId, productName, productImage, productBrand }) {

    const navigate = useNavigate();
    const navigateToLink = () => {
        navigate(routeUrls.PRODUCTVIEW+'/'+productId);
    }

    return (
        <>
            <Card sx={{
                height: {
                    xs: 230, // default height for extra-small screens
                    sm: 230,
                    lg: 260,
                },
                width: {
                    xs: 160, // default width for extra-small screens
                    md: 160,
                    lg: 185,
                },
                margin: 0.7
            }}>
                <CardActionArea sx={{ padding: 1 }} onClick={navigateToLink}>
                    <CardMedia
                        component="img"
                        image={productImage}
                        alt={productName}
                        sx={{
                            objectFit: 'contain',
                            aspectRatio: '1/1'
                        }}
                    />
                    <CardContent>
                        <Typography gutterBottom fontWeight={700} fontFamily={"Barlow,sans-serif"}
                            variant="body2" component="div"
                            sx={{ textTransform: 'uppercase' }}
                        >
                            {productBrand}
                        </Typography>
                        <Typography gutterBottom fontWeight={700} color={"#999797"} marginBottom={0} fontFamily={"Barlow,sans-serif"} variant="body2" component="div">
                            {productName}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}