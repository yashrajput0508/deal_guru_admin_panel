import { Card, CardContent, CircularProgress, Typography } from "@mui/material";

export default function InfoCard({ Icon, iconColor="skyblue", count, title, isLoading }) {
    return (
        <>
            <Card>
                <CardContent>
                    <div style={{ display: 'flex' }}>
                        <div style={{ alignSelf: 'center' }}>
                            <Icon fontSize="large" sx={{
                                color: iconColor
                            }} />
                        </div>
                        <div style={{ flex: 1, textAlign: 'right', color: '#969494' }}>
                            {
                                !isLoading ?
                                    (
                                        <>
                                            <Typography variant="h5">{count}</Typography>
                                            <Typography variant="body1">{title}</Typography>
                                        </>
                                    ) :
                                    (
                                        <CircularProgress />
                                    )
                            }
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}