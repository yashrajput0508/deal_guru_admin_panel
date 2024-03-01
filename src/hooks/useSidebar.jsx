import { useState } from "react";

export default function useSidebar(){

    const [openSidebar, setOpenSidebar] = useState(true);

    const handleSidebar = () => {
        setOpenSidebar((prevState)=> !prevState);
    }

    return {
        openSidebar,
        handleSidebar,
    }
}
