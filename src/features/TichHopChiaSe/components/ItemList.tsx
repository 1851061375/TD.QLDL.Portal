import TableList from "@/components/TableList";
import { requestDELETE, requestGET } from "@/utils/baseAPI";
import { FC, useEffect, useState } from "react";
import _ from 'lodash';
import { Table, Select } from "antd";
import './TichHopChiaSe.scss'
// import { useSeachContext } from "@/features/portal/home/SearchContext";

const options = [
    {
        value: 'Danh sách hồ sơ cấp phép',
        label: 'Danh sách hồ sơ cấp phép',
    },
    {
        value: 'Thông tin hồ sơ cấp phép',
        label: 'Thông tin hồ sơ cấp phép',
    },
    {
        value: 'Tra cứu hồ sơ cấp phép',
        label: 'Tra cứu hồ sơ cấp phép',
    },
    {
        value: 'Danh sách giấy phép',
        label: 'Danh sách giấy phép',
    },
    {
        value: 'Thông tin giấy phép',
        label: 'Thông tin giấy phép',
    },
    {
        value: 'Thống kê giấy phép',
        label: 'Thống kê giấy phép',
    },
    {
        value: 'Tra cứu giấy phép',
        label: 'Tra cứu giấy phép',
    },
    {
        value: 'Danh sách công trình',
        label: 'Danh sách công trình',
    },
    {
        value: 'Danh sách dự án trên địa bàn tỉnh',
        label: 'Dự án trên địa bàn tỉnh',
    },
    {
        value: 'Danh sách chung cư thuộc dự án',
        label: 'Danh sách chung cư thuộc dự án',
    },
    {
        value: 'Danh sách sàn giao dịch bất động sản',
        label: 'Danh sách sàn giao dịch bất động sản',
    },
    {
        value: 'Danh sách cá nhân có chứng chỉ hành nghề môi giới BĐS',
        label: 'Danh sách cá nhân có chứng chỉ hành nghề môi giới BĐS',
    },
]


export const TichHopChiSeTable = () => {
    // const searchContext = useSeachContext()
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])
    const [count, setCount] = useState('');
    const [offset, setOffset] = useState(1);
    const [size, setSize] = useState(5);
    const [chiTietModal, setChiTietModal] = useState(false)
    const [slected, setSelected] = useState(null)


    const handleSelectChange = async (e: any) => {
        console.log(e)
        setSelected(e);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await requestGET(
                    `GetTichHopChiaSes?loaiDuLieu=${slected}`,
                    _.assign(
                        {
                            // top: size,
                            pageNumber: offset,
                            orderBy: ['createdOn DESC'],
                            // search: searchContext.dataSearchThongTinCongBo
                        }
                    )
                );
                setData(res?.data ?? []);
                setCount(res?.count ?? 0);
                setLoading(false);

            } catch (error) {
                setLoading(false);
            }
        };
        fetchData();
        return () => { };
    }, [size, offset, slected
        // searchContext.dataSearchThongTinCongBo
    ]

    );

    const columns = [
        {
            title: 'Thông tin chung',
            dataIndex: 'ThongTinChung',
            key: 'ThongTinChung',
            width: '20%'
            // render: (_: any, record: any) => (
            //     <>
            //         <a
            //             className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1'
            //             data-toggle='m-tooltip'
            //             title='Xem chi tiết'
            //             onClick={() => {
            //                 handleClick(record.ID);
            //             }}
            //         >
            //             {record.Ten}
            //         </a>
            //     </>
            // ),

        },
        {
            title: 'Mô tả api',
            dataIndex: 'TenAPI',
            key: 'TenAPI',
            // className: 'text-center'
        },
        {
            title: 'Tham số đầu vào',
            dataIndex: 'DauVao',
            key: 'DauVao',
            width: '20%'
        },
        {
            title: 'Tham số đầu ra',
            dataIndex: 'DauRa',
            key: 'DauRa',
            width: '20%'
            //className: 'text-center'
        }
    ]

    return (
        <>

            <Select
                showSearch
                style={{ width: 500 }}
                placeholder="Chọn thông tin tích hợp, chia sẻ"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={options}

                onSelect={
                    (e) => {
                        handleSelectChange(e)
                    }
                }
            />

            <TableList
                dataTable={data}
                columns={columns}
                isPagination={true}
                size={size as any}
                count={count}
                setOffset={setOffset}
                setSize={setSize}
                loading={loading}
            />
        </>

    )
}