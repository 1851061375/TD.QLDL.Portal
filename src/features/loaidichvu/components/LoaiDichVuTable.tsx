
import { useState } from "react"
import { AntdSpace, AntdTable } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchLoaiDichVu } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchLoaiDichVu } from "../redux/action"
import { LoaiDichVuSearch } from "./LoaiDichVuSearch"
import { LoaiDichVuProvider } from "../contexts/LoaiDichVuContext"
import { LoaiDichVuDetail } from "./LoaiDichVuDetail"

export const LoaiDichVuTable = () => {
    const dispatch = useAppDispatch()
    const { datas: loaiDichVus, count } = useAppSelector(state => state.loaidichvu)
    const [searchParams, setSearchParams] = useState<ISearchLoaiDichVu>({ pageNumber: 1, pageSize: 10, reFetch: true })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <LoaiDichVuSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={loaiDichVus}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchLoaiDichVu(params))}
                />
            </AntdSpace>
            <LoaiDichVuDetail/>
        </>
    )
}
