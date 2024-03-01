import { useState } from "react";

export default function useAlertDialogBox(){
    const [openAlertDialogBox, setOpenAlertDialogBox] = useState(false);

    const handleOpenAlertDialogBox = () =>  {
        setOpenAlertDialogBox(true);
    }

    const handleCloseAlertDialogBox = () =>  {
        setOpenAlertDialogBox(false);
    }

    return {
        openAlertDialogBox,
        handleOpenAlertDialogBox,
        handleCloseAlertDialogBox
    }
}