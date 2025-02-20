import { ColumnsType } from "antd/es/table"
import { useMemo } from "react"
import { ILoaiDichVu } from "../models"
import { IBasePagination } from "../../../models"
import { useAppDispatch } from "../../../lib/redux/Hooks"
import { Popconfirm, Space } from "antd"
import { DeleteLoaiDichVu } from "../redux/action"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { useLoaiDichVuContext } from "../contexts/LoaiDichVuContext"

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const loaiDichVuContext = useLoaiDichVuContext()
    const columns = useMemo((): ColumnsType<ILoaiDichVu> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Tên loại dịch vụ",
                dataIndex: "tenLoaiDichVu",
                key: "tenLoaiDichVu"
            },
            {
                title: "Thao tác",
                dataIndex: '',
                width:"10%",
                align:'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EditOutlined style={{color:"cornflowerblue"}} title="Xem chi tiết/Sửa" onClick={() => {
                            loaiDichVuContext.setLoaiDichVuId(record.id)
                            loaiDichVuContext.setLoaiDichVuModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteLoaiDichVu({ id: record.id, forceDelete: false }))
                            } }
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined size={30} style={{color:"tomato"}}/>
                        </Popconfirm>

                    </Space>
                )
            }
        ]
    }, [pagination])
    return { columns }
} 