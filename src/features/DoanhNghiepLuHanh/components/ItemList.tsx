import { FC, useEffect, useState, useCallback, useMemo } from "react";
import { Select, Input, Button, List, Pagination, Spin } from 'antd';
import { requestGET } from "@/utils/baseAPI";
import CompanyCard from "./CompanyCard";

const { Search } = Input;
const { Option } = Select;
// Viết các hàm này ra ngoài component để tránh khởi tạo lại mỗi khi component re-render
const fetchData = async (
    page: number = 1,
    offset: number = 6,
    search = '',
    diabanId = '',
    loaiDoanhNghiepId = '',
    linhVucId = ''
) => {
    const res = await requestGET(`doanhnghiepluhanhs`, {
        page,
        offset,
        search,
        diabanId,
        loaiDoanhNghiepId,
        linhVucId
    });
    return res;
};

const fetchFilterData = async () => {
    const res = await requestGET(`dmdiabans`, { code: '11' });
    const resLoaiDN = await requestGET(`dmchungs`, { groupcode: 'LHDV' });
    const resLinhVuc = await requestGET(`dmchungs`, { groupcode: 'LVHD' });
    return { diaBan: res?.data, loaiDoanhNghiep: resLoaiDN.data, linhVuc: resLinhVuc.data };
};

export const ItemList = () => {
    const [state, setState] = useState({
        loading: true,
        data: [],
        page: 1,
        offset: 6,
        totalItems: 0,
        visible: false,
        diaBan: [],
        loaiDoanhNghiep: [],
        linhVuc: [],
        search: '',
        diaBanSelected: '',
        loaiDNSelected: '',
        linhVucSelected: ''
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
            const res = await fetchData(state.page, state.offset, state.search, state.diaBanSelected, state.loaiDNSelected, state.linhVucSelected);
            setState(prevState => ({ ...prevState, data: res?.data ?? [], totalItems: res?.data ?? 0, loading: false }));
        };
        fetch();
    }, [state.page, state.offset, state.search, state.diaBanSelected, state.loaiDNSelected, state.linhVucSelected]);

    useEffect(() => {
        const fetch = async () => {
            const { diaBan, loaiDoanhNghiep, linhVuc } = await fetchFilterData();
            setState(prevState => ({ ...prevState, diaBan, loaiDoanhNghiep, linhVuc }));
        };
        fetch();
    }, []);
    // Vì các bộ lọc ít khi thay đổi nên có thể dùng useMemo để tối ưu việc render các options của Select
    const diaBanOptions = useMemo(() => state.diaBan?.map((filterItem: any) => (
        <Option key={filterItem.ID} value={filterItem.ID}>
            {filterItem.Name}
        </Option>
    )), [state.diaBan]);

    const loaiDoanhNghiepOptions = useMemo(() => state.loaiDoanhNghiep?.map((filterItem: any) => (
        <Option key={filterItem.ID} value={filterItem.ID}>
            {filterItem.Ten}
        </Option>
    )), [state.loaiDoanhNghiep]);

    const linhVucOptions = useMemo(() => state.linhVuc?.map((filterItem: any) => (
        <Option key={filterItem.ID} value={filterItem.ID}>
            {filterItem.Ten}
        </Option>
    )), [state.linhVuc]);

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
                            placeholder="Chọn loại doanh nghiệp"
                            style={{ width: '100%' }} onChange={(value) =>
                                setState(prevState => ({ ...prevState, loaiDNSelected: value }))}
                        >
                            {loaiDoanhNghiepOptions}
                        </Select>
                    </div>
                    <div className="col-md-4">
                        <Select
                            allowClear={true}
                            showSearch
                            filterOption={(input, option: any) =>
                                (option?.children?.toLowerCase() ?? '').includes(input?.toLowerCase())}
                            placeholder="Chọn lĩnh vực"
                            style={{ width: '100%' }} onChange={(value) =>
                                setState(prevState => ({ ...prevState, linhVucSelected: value }))}
                        >
                            {linhVucOptions}
                        </Select>
                    </div>
                </div>
            }
            <Spin spinning={state.loading} tip="Loading...">
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 1,
                        md: 1,
                        lg: 3,
                        xl: 3,
                        xxl: 3,
                    }}
                    dataSource={state.data}
                    renderItem={(item: any) => (
                        <List.Item>
                            <CompanyCard {...item} />
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