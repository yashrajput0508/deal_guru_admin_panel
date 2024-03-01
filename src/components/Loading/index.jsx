import { Box, CircularProgress } from "@mui/material";
import { status } from "../../constants/contants";

export default function Loading({ currentStatus, children }) {
    return (
        <>
            {
                currentStatus === status.SUCCEEDED ? (
                    children
                ) : (
                    // Loader
                    <Box component={"div"} textAlign={"center"} mt={5}>
                        <CircularProgress />
                    </Box>
                )
            }
        </>
    );
}
