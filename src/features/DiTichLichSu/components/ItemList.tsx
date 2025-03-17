import { FC, useEffect, useState, useCallback, useMemo } from "react";
import { Select, Input, Button, List, Pagination, Spin } from 'antd';
import { requestGET } from "@/utils/baseAPI";
import MyItem from "./MyItem";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const { Search } = Input;
const { Option } = Select;
const exportToExcel = (data: any, fileName: any) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${fileName}.xlsx`);
};
const fetchData = async (
    page: number = 1,
    offset: number = 8,
    search = '',
    diabanId = '',
    ngaymocuacodes = ''
) => {
    const res = await requestGET(`ditichlichsus`, {
        page,
        offset,
        search,
        diabanId,
        ngaymocuacodes
    });
    return res;
};

const fetchFilterData = async () => {
    const res = await requestGET(`dmdiabans`, { code: '11' });
    const resNgayMoCua = await requestGET(`dmchungs`, { groupcode: 'TGMC' });
    return { diaBan: res?.data, ngayMoCua: resNgayMoCua?.data };
};

export const ItemList = () => {
    const [state, setState] = useState({
        loading: true,
        data: [],
        page: 1,
        offset: 8,
        totalItems: 0,
        visible: false,
        diaBan: [],
        ngayMoCua: [],
        linhVuc: [],
        search: '',
        diaBanSelected: '',
        ngayMoCuaSelected: '',
    });
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
            const res = await fetchData(state.page, state.offset, state.search, state.diaBanSelected, state.ngayMoCuaSelected);
            setState(prevState => ({ ...prevState, data: res?.data ?? [], totalItems: res?.data ?? 0, loading: false }));
        };
        fetch();
    }, [state.page, state.offset, state.search, state.diaBanSelected, state.ngayMoCuaSelected]);

    useEffect(() => {
        const fetch = async () => {
            const { diaBan, ngayMoCua } = await fetchFilterData();
            setState(prevState => ({ ...prevState, diaBan, ngayMoCua }));
        };
        fetch();
    }, []);
    // Vì các bộ lọc ít khi thay đổi nên có thể dùng useMemo để tối ưu việc render các options của Select
    const diaBanOptions = useMemo(() => state.diaBan?.map((filterItem: any) => (
        <Option key={filterItem.ID} value={filterItem.ID}>
            {filterItem.Name}
        </Option>
    )), [state.diaBan]);

    const ngayMoCuaOptions = useMemo(() => state.ngayMoCua?.map((filterItem: any) => (
        <Option key={filterItem.Ma} value={filterItem.Ma}>
            {filterItem.Ten}
        </Option>
    )), [state.ngayMoCua]);


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
                    {/* <Button className="ms-2" onClick={() => exportToExcel(state.data, new Date().getTime() * Math.random() + '')}>Xuất dữ liệu</Button> */}
                </div>
            </div>
            {state.visible &&
                <div className="row mb-3">
                    <div className="col-md-4">
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
                    <div className="col-md-4">
                        <Select
                            allowClear={true}
                            showSearch
                            filterOption={(input, option: any) =>
                                (option?.children?.toLowerCase() ?? '').includes(input?.toLowerCase())}
                            placeholder="Chọn ngày mở cửa"
                            style={{ width: '100%' }} onChange={(value) =>
                                setState(prevState => ({ ...prevState, ngayMoCuaSelected: value }))}
                        >
                            {ngayMoCuaOptions}
                        </Select>
                    </div>


                </div>
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
    );
}