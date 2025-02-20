import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const FolderContext = createContext<IFolderContext | null>(null)

export interface IFolderContext{
    folderId: string | undefined;
    setFolderId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const useFolderContext = () => {
    const context = useContext(FolderContext)
    if(!context)
        throw new Error("FolderContext must be used inside FolderContext.Provider")
    return context
}

export const FolderContextProvider = ({children}: IWithChildren) => {
    const [folderId, setFolderId] = useState<string>()
    // thêm các hàm search cho các tabs ở đây
    return <FolderContext.Provider value={{folderId, setFolderId}}>
        {children}
    </FolderContext.Provider> 
}