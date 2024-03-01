import { useState } from "react"

export default function useToast(){

    const [toast, setToast] = useState({
        show:false,
        type:'',
        message:''
    })

    const handleOpenToast = (type,message) => {
        setToast({
            show:true,
            type,
            message
        })

        setTimeout(()=>{
            handleClostToast();
        },[6000])
    }

    const handleClostToast = () => {
        setToast({
            show:false,
            type:'',
            message:''
        })
    }

    return {
        toast,
        handleOpenToast,
        handleClostToast
    }
}