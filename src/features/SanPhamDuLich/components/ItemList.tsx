import { requestGET } from "@/utils/baseAPI";
import { useEffect, useState, useCallback, useMemo } from "react";
import _ from 'lodash';
import { Input, Select, Button, List, Pagination, Spin,
    DatePicker
 } from 'antd';
import MyItem from "./MyItem";

const { Search } = Input;
const { Option } = Select;

// Viết các hàm này ra ngoài component để tránh khởi tạo lại mỗi khi component re-render
const fetchData = async (
    page: number = 1,
    offset: number = 8,
    search = '',
    donviid = '',
    diabanid = '',
    loaisanphamid = '',
    phuongtienid = '',
    ngayBatDau = '',
    ngayKetThuc = '',
) => {
    const res = await requestGET(`sanphamdulichs`, {
        page,
        offset,
        search,
        donviid,
        diabanid,
        loaisanphamid,
        phuongtienid,
        ngayBatDau,
        ngayKetThuc,
    });
    return res;
};

const fetchFilterData = async () => {
    const res = await requestGET(`donvis`);
    const resDiaBan = await requestGET(`dmdiabans`, { code: '11' });
    const resLSP = await requestGET(`dmchungs`, { groupcode: 'LSPDL', });
    const resPT = await requestGET(`dmchungs`, { groupcode: 'phuongtien', });

    return { donVi: res?.data,  diaBan: resDiaBan?.data, loaiSanPham: resLSP?.data, phuongTien: resPT?.data };
};


export const ItemList = () => {
    const [state, setState] = useState({
        loading: true,
        data: [],
        page: 1,
        offset: 8,
        totalItems: 0,
        visible: false,
        donVi: [],
        diaBan: [],
        loaiSanPham: [],
        phuongTien: [],
        search: '',
        donViSelected: '',
        diaBanSelected: '',
        loaiSanPhamSelected: '',
        phuongTienSelected: '',
        ngayBatDau: '',
        ngayKetThuc: '',
    });

    const handleCalendarChange = (
        values: any,
        dateStrings: [string, string]
        
      ) => {
        setState(prevState => ({ ...prevState, ngayBatDau: dateStrings[0], ngayKetThuc: dateStrings[1] }));
      };
    // Sử dụng useCallback để tránh khởi tạo lại mỗi khi re-render
    const handleToggleSelects = useCallback(() => {
        setState(prevState => ({ ...prevState, visible: !prevState.visible }));
    }, []);

    const onPageChange = useCallback((page: number) => {
        setState(prevState => ({ ...prevState, page }));
    }, []);

    useEffect(() => {
        const fetch = async () => {
            setState(prevState => ({ ...prevState, loading: true }));
            const res = await fetchData(state.page, state.offset, state.search, 
                state.donViSelected, state.diaBanSelected, state.loaiSanPhamSelected, state.phuongTienSelected,
                state.ngayBatDau, state.ngayKetThuc
            );
            setState(prevState => 
                ({ ...prevState, data: res.data ?? [], totalItems: res.count ?? 0, loading: false }));
        };
        fetch();
    }, [state.page, state.offset, state.search,
        state.donViSelected, state.diaBanSelected, state.loaiSanPhamSelected, state.phuongTienSelected,
        state.ngayBatDau, state.ngayKetThuc]);

    useEffect(() => {
        const fetch = async () => {
            const { donVi, diaBan, loaiSanPham, phuongTien,  } = await fetchFilterData();
            setState(prevState => ({ ...prevState, donVi, diaBan, loaiSanPham, phuongTien}));
        };
        fetch();
    }, []);

    // Vì các bộ lọc ít khi thay đổi nên có thể dùng useMemo để tối ưu việc render các options của Select
    const donViOptions = useMemo(() => state.donVi?.map((filterItem: any) => (
        <Option key={filterItem.ID} value={filterItem.ID}>
            {filterItem.Ten}
        </Option>
    )), [state.donVi]);
    const diaBanOptions = useMemo(() => state.diaBan?.map((filterItem: any) => (
        <Option key={filterItem.ID} value={filterItem.ID}>
            {filterItem.Name}
        </Option>
    )), [state.diaBan]);
    const loaiSanPhamOptions = useMemo(() => state.loaiSanPham?.map((filterItem: any) => (
        <Option key={filterItem.ID} value={filterItem.ID}>
            {filterItem.Ten}
        </Option>
    )), [state.loaiSanPham]);
    const phuongTienOptions = useMemo(() => state.phuongTien?.map((filterItem: any) => (
        <Option key={filterItem.ID} value={filterItem.ID}>
            {filterItem.Ten}
        </Option>
    )), [state.phuongTien]);

    return (
        <>
            <div className="row mb-3">
                <div className="col-md-4">
                    <Search
                        placeholder="Từ khóa"
                        allowClear
                        onSearch={(value) =>
                            setState(prevState => ({ ...prevState, search: value }))}
                    />
                </div>
                <div className="col-md-4">
                    <Button onClick={handleToggleSelects}>Bộ lọc</Button>
                </div>
            </div>
            {state.visible &&
            <>
                <div className="row mb-3">
                    <div className="col-md-3">
                        <Select
                            allowClear={true}
                            showSearch
                            filterOption={(input, option: any) =>
                                (option?.children?.toLowerCase() ?? '').includes(input?.toLowerCase())}
                            placeholder="Chọn đơn vị"
                            style={{ width: '100%' }}
                            onChange={(value) =>
                                setState(prevState => ({ ...prevState, donViSelected: value }))}
                        >
                            {donViOptions}
                        </Select>
                    </div>
                    <div className="col-md-3">
                        <Select
                            allowClear={true}
                            showSearch
                            filterOption={(input, option: any) =>
                                (option?.children?.toLowerCase() ?? '').includes(input?.toLowerCase())}
                            placeholder="Chọn địa bàn"
                            style={{ width: '100%' }}
                            onChange={(value) =>
                                setState(prevState => ({ ...prevState, diaBanSelected: value }))}
                        >
                            {diaBanOptions}
                        </Select>
                    </div>
                    <div className="col-md-3">
                        <Select
                            allowClear={true}
                            showSearch
                            filterOption={(input, option: any) =>
                                (option?.children?.toLowerCase() ?? '').includes(input?.toLowerCase())}
                            placeholder="Chọn loại sản phẩm"
                            style={{ width: '100%' }}
                            onChange={(value) =>
                                setState(prevState => ({ ...prevState, loaiSanPhamSelected: value }))}
                        >
                            {loaiSanPhamOptions}
                        </Select>
                    </div>
                    <div className="col-md-3">
                        <Select
                            allowClear={true}
                            showSearch
                            filterOption={(input, option: any) =>
                                (option?.children?.toLowerCase() ?? '').includes(input?.toLowerCase())}
                            placeholder="Chọn phương tiện"
                            style={{ width: '100%' }}
                            onChange={(value) =>
                                setState(prevState => ({ ...prevState, phuongTienSelected: value }))}
                        >
                            {phuongTienOptions}
                        </Select>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-3">
                    <DatePicker.RangePicker 
                        style={{ width: '100%' }} 
                        allowEmpty={[true, true]}
                        onCalendarChange={(values, format) => handleCalendarChange(values, format)}
                    />
                    </div>
                </div>
            </>
            }
        <Spin spinning={state.loading} tip="Loading...">
        <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 3,
                    xl: 4,
                    xxl: 4,
                }}
                dataSource={state.data}
                renderItem={(item: any) => (
                    <List.Item>
                        <MyItem {...item} />
                    </List.Item>
                )}
            />
            {state.totalItems > state.offset &&
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <Pagination
                        current={state.page}
                        pageSize={state.offset}
                        total={state.totalItems}
                        onChange={onPageChange}
                    />
                </div>}
        </Spin>
            

        </>

    )
}