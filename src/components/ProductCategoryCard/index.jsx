import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

export default function ProductCategoryCard({ name, image, searchBy }) {

    return (
        <>
            <Card sx={{ minWidth: 140, width: 140, height: 140, mx: 1, my: 2, flexGrow: 0 }}>
                <CardActionArea sx={{ textAlign: "-webkit-center" }}>
                    <CardMedia
                        component="img"
                        image={image}
                        alt={name}
                        sx={{
                            maxWidth: "75%",
                            height: "87px"
                        }}
                    />
                    <CardContent>
                        <Typography textAlign={"center"} color={"#666666"} fontWeight={700} fontSize={"0.9rem"} fontFamily={"Barlow,sans-serif"} variant="h5" component="div">
                            {name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}