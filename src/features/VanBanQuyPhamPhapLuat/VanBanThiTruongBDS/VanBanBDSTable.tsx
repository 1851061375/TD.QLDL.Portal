import TableList from "@/components/TableList";
import { requestDELETE, requestGET } from "@/utils/baseAPI";
import { FC, useEffect, useState } from "react";
import _ from 'lodash';
import { Space, Table } from "antd";
import { VanBanBDSDetail } from "./VanBanBDSDetail";
import { CheckCircleOutlined, CloseCircleOutlined, DownloadOutlined } from "@ant-design/icons";
import { useSeachContext } from "@/features/portal/home/SearchContext";



export const VanBanBDSTable = () => {
    const searchContext = useSeachContext()
    const [loading, setLoading] = useState(false);
    const [dataBDS, setDataBDS] = useState([])
    const [count, setCount] = useState('');
    const [offset, setOffset] = useState(1);
    const [size, setSize] = useState(5);
    const [chiTietModal, setChiTietModal] = useState(false)
    const [id, setID] = useState('')
    const handleClick = async (id: any) => {
        // var res = await requestGET(`/GetDanhSachNhaOPublic${id}`);
        setChiTietModal(true)
        setID(id)
    }

    const columns = [
        {
            title: 'Số ký hiệu',
            dataIndex: 'SoKyHieu',
            key: 'SoKyHieu',
            render: (_: any, record: any) => (
                <>
                    <a
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1'
                        data-toggle='m-tooltip'
                        title='Xem chi tiết'
                        onClick={() => {
                            handleClick(record.ID);
                        }}
                    >
                        {record.SoKyHieu}
                    </a>
                </>
            ),

        },
        {
            title: 'Trích yếu nội dung',
            dataIndex: 'TrichYeu',
            key: 'TrichYeu',
        },
        {
            title: 'Ngày ban hành',
            dataIndex: 'NgayBanHanh',
            key: 'NgayBanHanh',
            className: 'text-center'
        },
        {
            title: 'Đính kèm',
            dataIndex: 'DinhKem',
            key: 'DinhKem',
            render: (text: any, record: any) => {

                return record.DinhKem != "" && record.DinhKem != null ? (
                    <Space size="middle">
                        <a href={record.DinhKem.split(',')[0]} download target="_blank" rel="noopener noreferrer">
                            <DownloadOutlined></DownloadOutlined>
                        </a>
                    </Space>
                ) : ""
            },
            className: 'text-center'

        },
    ]
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await requestGET(
                    `GetVanBanQPPLThiTruongBDSPublics`,
                    _.assign(
                        {
                            // top: size,
                            pageNumber: offset,
                            orderBy: ['createdOn DESC'],
                            search: searchContext.dataSearchVanBanQuyPham
                        }
                    )
                );
                setDataBDS(res.data ?? []);
                setCount(res?.count ?? 0);
                setLoading(false);

            } catch (error) {
                setLoading(false);
            }
        };
        fetchData();
        return () => { };
    }, [size, offset, searchContext.dataSearchVanBanQuyPham]);
    return (
        <>
            <TableList
                dataTable={dataBDS}
                columns={columns}
                isPagination={true}
                size={size}
                count={count}
                setOffset={setOffset}
                setSize={setSize}
                loading={loading}
            />
            {chiTietModal ? <VanBanBDSDetail id={id} chiTietModal={chiTietModal} setChiTietModal={setChiTietModal} ></VanBanBDSDetail> : <></>}
        </>

    )
}