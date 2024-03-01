import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Box, Toolbar } from "@mui/material";
import useSidebar from "../../hooks/useSidebar";

export default function HomeLayout() {

    const { openSidebar, handleSidebar } = useSidebar();

    return (
        <>
            <Box sx={{ display: 'flex'}}>
                <Header handleSidebar={handleSidebar} />
                <Sidebar openSidebar={openSidebar} handleSidebar={handleSidebar} />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <Outlet />
                </Box>
            </Box>
        </>
    )
}