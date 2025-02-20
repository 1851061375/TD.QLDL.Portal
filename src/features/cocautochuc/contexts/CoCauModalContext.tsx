import { IWithChildren } from "@/types"
import { createContext, useContext, useState } from "react"

export interface ICoCauModalContext {
    showModalUserCU: {id: string, visible: boolean}
    setShowModalUserCU: React.Dispatch<React.SetStateAction<{id: string, visible: boolean}>> // CU: Create,Update
}

const CoCauModalContext = createContext<ICoCauModalContext | null>(null)

export const useCoCauModalContext = () => {
    const context = useContext(CoCauModalContext)
    if(!context)    throw new Error("coCauModalContext must be used in ")
    return context 
}

export const CoCauModalProvider = ({children} : IWithChildren) => {
    const [showModalUserCU, setShowModalUserCU] = useState<{id: string, visible: boolean}>({id: "", visible: false})
    return <CoCauModalContext.Provider value={{showModalUserCU, setShowModalUserCU}}>
        {children}
    </CoCauModalContext.Provider>
}