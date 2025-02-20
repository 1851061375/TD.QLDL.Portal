import TableList from "@/components/TableList";
import { useSeachContext } from "@/features/portal/home/SearchContext";
import { requestGET } from "@/utils/baseAPI";
import _ from "lodash";
import { useEffect, useState } from "react";
// import { BaoCaoThiTruongBDSDetail } from "./BaoCaoThiTruongBDSDetail";

export const BaoCaoThiTruongBDSTable = () => {
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
            title: 'Tên',
            dataIndex: 'Ten',
            key: 'Ten',
        },
        {
            title: 'Diện tích',
            dataIndex: 'DienTich',
            key: 'DienTich',
        },
        {
            title: 'Số lượng căn hộ',
            dataIndex: 'SoLuongCanHo',
            key: 'SoLuongCanHo',
        },
        {
            title: 'Loại hình BĐS',
            dataIndex: 'LoaiHinhBDS',
            key: 'LoaiHinhBDS',

        },
        {
            title: 'Địa chỉ',
            dataIndex: 'DiaChi',
            key: 'DiaChi',
        },


    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await requestGET(
                    `GetThanhPhanDuAns`,
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
        {/* {chiTietModal ? <BaoCaoThiTruongBDSDetail id={id} chiTietModal={chiTietModal} setChiTietModal={setChiTietModal} ></BaoCaoThiTruongBDSDetail> : <></>} */}
    </>
}