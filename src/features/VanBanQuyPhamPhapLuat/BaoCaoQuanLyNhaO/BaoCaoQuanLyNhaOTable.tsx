import TableList from "@/components/TableList";
import { useSeachContext } from "@/features/portal/home/SearchContext";
import { requestGET } from "@/utils/baseAPI";
import _ from "lodash";
import { useEffect, useState } from "react";
import { BaoCaoQuanLyNhaODetail } from "./BaoCaoQuanLyNhaODetail";

export const BaoCaoQuanLyNhaOTable = () => {
    const searchContext = useSeachContext()
    const [loading, setLoading] = useState(false);
    const [dataBaoCaoQLNhaO, setDataBaoCaoQLNhaO] = useState([])
    const [count, setCount] = useState('');
    const [offset, setOffset] = useState(1);
    const [size, setSize] = useState(5);
    const [chiTietModal, setChiTietModal] = useState(false)
    const [id, setID] = useState('')
    // const handleClick = async (id: any) => {
    //     setChiTietModal(true)
    //     setID(id)
    // }
    const columns = [
        {
            title: 'Được cấp phép',
            dataIndex: 'DuocCapPhep',
            key: 'DuocCapPhep',

            children: [
                {
                    title: 'Số lượng dự án',
                    dataIndex: 'NO_DCP_SDA',
                    key: 'NO_DCP_SDA',
                    align: 'center',
                    width: 150,

                },
                {
                    title: 'Quy mô(căn)',
                    dataIndex: 'NO_DCP_QM',
                    key: 'NO_DCP_QM',
                    align: 'center',
                    width: 150,
                },
            ]
        },
        {
            title: 'Đang triển khai',
            dataIndex: 'DangTrienKhai',
            key: 'DangTrienKhai',

            children: [
                {
                    title: 'Số lượng dự án',
                    dataIndex: 'NO_DTK_SDA',
                    key: 'NO_DTK_SDA',
                    align: 'center',
                    width: 150,

                },
                {
                    title: 'Quy mô(căn)',
                    dataIndex: 'NO_DTK_QM',
                    key: 'NO_DTK_QM',
                    align: 'center',
                    width: 150,
                },
            ]
        },
        {
            title: 'Hình thành trong lương lai đủ đủ điều kiện bán',
            dataIndex: 'DangTrienKhai',
            key: 'DangTrienKhai',

            children: [
                {
                    title: 'Số lượng dự án',
                    dataIndex: 'NO_HTTTL_SDA',
                    key: 'NO_HTTTL_SDA',
                    align: 'center',
                    width: 150,

                },
                {
                    title: 'Quy mô(căn)',
                    dataIndex: 'NO_HTTTL_QM',
                    key: 'NO_HTTTL_QM',
                    align: 'center',
                    width: 150,
                },
            ]
        },
        {
            title: 'Hoàn thành',
            dataIndex: 'HoanThanh',
            key: 'HoanThanh',

            children: [
                {
                    title: 'Số lượng dự án',
                    dataIndex: 'NO_HT_SDA',
                    key: 'NO_HT_SDA',
                    align: 'center',
                    width: 150,

                },
                {
                    title: 'Quy mô(căn)',
                    dataIndex: 'NO_HT_QM',
                    key: 'NO_HT_QM',
                    align: 'center',
                    width: 150,
                },
            ]
        },


    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await requestGET(
                    `GetBaoCaoCongBoNhaOPublics`,
                    _.assign(
                        {
                            // top: size,
                            pageNumber: offset,
                            orderBy: ['createdOn DESC'],
                            search: searchContext.dataSearchVanBanQuyPham
                        }
                    )
                );
                setDataBaoCaoQLNhaO(res.data ?? []);
                setCount(res?.count ?? 0);
                setLoading(false);

            } catch (error) {
                setLoading(false);
            }
        };
        fetchData();
        return () => { };
    }, [size, offset, searchContext.dataSearchVanBanQuyPham]);
    return <>
        <TableList

            dataTable={dataBaoCaoQLNhaO}
            columns={columns}
            isPagination={true}
            size={size}
            bordered
            count={count}
            setOffset={setOffset}
            setSize={setSize}
            loading={loading}
        />
        {/* {chiTietModal ? <BaoCaoQuanLyNhaODetail id={id} chiTietModal={chiTietModal} setChiTietModal={setChiTietModal} ></BaoCaoQuanLyNhaODetail> : <></>} */}
    </>
}