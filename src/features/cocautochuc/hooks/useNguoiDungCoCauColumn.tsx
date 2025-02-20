import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { IBasePagination } from '../../../models'
import { ISearchUser, IUser } from '@/features/user/models'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { DeleteCoCauToChuc } from '../redux/crud'
import { useCoCauModalContext } from '../contexts/CoCauModalContext'

export const useCoCauUser = (pagination: ISearchUser) => {
    const coCauModalContext = useCoCauModalContext()
    const dispatch = useAppDispatch()
    const columns = useMemo(() : ColumnsType<IUser> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Họ tên",
                key: "tenDichVu",
                dataIndex: "tenDichVu",
            },
            {
                title: "Tài khoản",
                key: "userName",
                dataIndex: "userName",
            },
            {
                title: "Chức vụ",
                key: "positionCode",
                dataIndex: "positionCode",
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
                            coCauModalContext.setShowModalUserCU({id: record.id, visible: true})
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteCoCauToChuc({ id: record.id, forceDelete: false }))
                            }}
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined style={{color:"tomato"}}/>
                        </Popconfirm>
                    </Space>
                )
            }
        ]
    }, [pagination])
    return columns
}