import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchDichVu } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchDichVu } from "../redux/action"
import { DichVuSearch } from "./DichVuSearch"
import { DichVuProvider } from "../contexts/DichVuContext"
import { DichVuDetail } from "./DichVuDetail"

export const DichVuTable = () => {
    const dispatch = useAppDispatch()
    const { datas: dichVus, count } = useAppSelector(state => state.dichvu)
    const [searchParams, setSearchParams] = useState<ISearchDichVu>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <DichVuSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={dichVus}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchDichVu(params))}
                />
            </AntdSpace>
            <DichVuDetail/>
        </>
            
    )
}
