import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const DichVuContext = createContext<IDichVuContext | null>(null)

export interface IDichVuContext{
    dichVuId: string | undefined;
    setDichVuId: React.Dispatch<React.SetStateAction<string | undefined>>;
    dichVuModalVisible: boolean;
    setDichVuModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDichVuContext = () => {
    const context = useContext(DichVuContext)
    if(!context)
        throw new Error("DichVuContext must be used inside DichVuContext.Provider")
    return context
}

export const DichVuProvider = ({children}: IWithChildren) => {
    const [dichVuId, setDichVuId] = useState<string>()
    const [dichVuModalVisible, setDichVuModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <DichVuContext.Provider value={{dichVuId, setDichVuId, dichVuModalVisible, setDichVuModalVisible}}>
        {children}
    </DichVuContext.Provider> 
}