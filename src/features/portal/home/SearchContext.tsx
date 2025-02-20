import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const SeachContext = createContext<ISearchContext | null>(null)

export interface ISearchContext {
    dataSearchThongTinCongBo: string | undefined;
    setDataSearchThongTinCongBo: React.Dispatch<React.SetStateAction<string | undefined>>;
    dataSearchVanBanQuyPham: string | undefined;
    setDataSearchVanBanQuyPham: React.Dispatch<React.SetStateAction<string | undefined>>;
    dataGiaoDichBDS: string | undefined;
    setDataGiaoDichBDS: React.Dispatch<React.SetStateAction<string | undefined>>;

}

export const useSeachContext = () => {
    const context = useContext(SeachContext)
    if (!context)
        throw new Error("SeachContext must be used inside SeachContext.Provider")
    return context
}


export const SearchProvider = ({ children }: IWithChildren) => {
    const [dataSearchThongTinCongBo, setDataSearchThongTinCongBo] = useState<string>()
    const [dataSearchVanBanQuyPham, setDataSearchVanBanQuyPham] = useState<string>()
    const [dataGiaoDichBDS, setDataGiaoDichBDS] = useState<string>()
    // thêm các hàm search cho các tabs ở đây
    return <SeachContext.Provider value={{ dataSearchThongTinCongBo, setDataSearchThongTinCongBo, dataSearchVanBanQuyPham, setDataSearchVanBanQuyPham, dataGiaoDichBDS, setDataGiaoDichBDS }}>
        {children}
    </SeachContext.Provider>
}