import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

export default function ToastMesssage({ show, type, message, handleCloseToast }) {
    return (
        <Snackbar anchorOrigin={{  vertical: 'bottom', horizontal: 'right' }} open={show} onClose={handleCloseToast}>
            <Alert
                severity={type}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}