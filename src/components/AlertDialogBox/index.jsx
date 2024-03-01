import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function AlertDialogBox({ openAlertDialogBox, handleCloseAlertDialogBox, handleAgreeAlertDialogBox }) {
    return (
        <>
            <Dialog
                open={openAlertDialogBox}
                onClose={handleCloseAlertDialogBox}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Delete Product
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you want to Delete the Product?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAlertDialogBox}>Disagree</Button>
                    <Button onClick={handleAgreeAlertDialogBox} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}