import { AntdTable } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useCoCauUser } from "../../hooks/useNguoiDungCoCauColumn"
import { useEffect, useState } from "react"
import { ISearchUser } from "@/features/user/models"
import { SearchUser } from "@/features/user/redux/Actions"
import { useFolderContext } from "@/contexts/FolderContext"


export const DanhSachNguoiDung = () => {
    const { datas: users, count, loading } = useAppSelector(state => state.user)
    const [searchParams, setSearchParams] = useState<ISearchUser>({ pageNumber: 1, pageSize: 10, isActive: true})
    const dispatch = useAppDispatch()
    const folderContext = useFolderContext()
    useEffect(() => {
        if(folderContext.folderId){
          setSearchParams((curr) => ({...curr, groupCode: folderContext.folderId}))
        }
      }, [folderContext.folderId])
    const columns = useCoCauUser({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize, isActive:true });
    return folderContext.folderId ?
    <AntdTable 
        loading={loading} 
        onSearch={(params) =>  dispatch(SearchUser(params))} 
        dataSource={users} 
        columns={columns} 
        searchParams={searchParams} 
        setSearchParams={setSearchParams} 
        pagination={{ total: count }} /> : <></>
}  