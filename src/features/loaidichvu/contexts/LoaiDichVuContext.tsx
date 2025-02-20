import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const LoaiDichVuContext = createContext<ILoaiDichVuContext | null>(null)

export interface ILoaiDichVuContext{
    loaidichVuId: string | undefined;
    setLoaiDichVuId: React.Dispatch<React.SetStateAction<string | undefined>>;
    loaiDichVuModalVisible: boolean;
    setLoaiDichVuModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useLoaiDichVuContext = () => {
    const context = useContext(LoaiDichVuContext)
    if(!context)
        throw new Error("LoaiDichVuContext must be used inside LoaiDichVuContext.Provider")
    return context
}

export const LoaiDichVuProvider = ({children}: IWithChildren) => {
    const [loaidichVuId, setLoaiDichVuId] = useState<string>()
    const [loaiDichVuModalVisible, setLoaiDichVuModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <LoaiDichVuContext.Provider value={{loaidichVuId, setLoaiDichVuId, loaiDichVuModalVisible, setLoaiDichVuModalVisible}}>
        {children}
    </LoaiDichVuContext.Provider> 
}