import { FC, useEffect, useState, useCallback, useMemo } from "react";
import { Select, Input, Button, List, Pagination, Spin } from 'antd';
import { requestGET } from "@/utils/baseAPI";
import MyItem from "./MyItem";

const { Search } = Input;
const { Option } = Select;
// Viết các hàm này ra ngoài component để tránh khởi tạo lại mỗi khi component re-render
const fetchData = async (
    page: number = 1,
    offset: number = 6,
    search = '',
    diabanId = '',
    ngoaiNgus = '',
    loaiTheId = '',
    soThe = ''
) => {
    const res = await requestGET(`huongdanviens`, {
        page,
        offset,
        search,
        diabanId,
        ngoaiNgus,
        loaiTheId,
        soThe
    });
    return res;
};

const fetchFilterData = async () => {
    const res = await requestGET(`dmdiabans`, { code: '11' });
    const resNgonNgu = await requestGET(`dmchungs`, { groupcode: 'NgoaiNgu' });
    const resLoaithe = await requestGET(`dmchungs`, { groupcode: 'LTHDV' });
    return { diaBan: res?.data, ngonNgu: resNgonNgu.data, loaiThe: resLoaithe.data };
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
        ngonNgu: [],
        loaiThe: [],
        search: '',
        soThe: '',
        diaBanSelected: '',
        ngonNguSelected: '',
        loaiTheSelected: ''
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
            const res = await fetchData(state.page, state.offset, state.search,
                state.diaBanSelected, state.ngonNguSelected, state.loaiTheSelected, state.soThe);
            setState(prevState => ({ ...prevState, data: res?.data ?? [], totalItems: res?.data ?? 0, loading: false }));
        };
        fetch();
    }, [state.page, state.offset, state.search, state.diaBanSelected,
    state.ngonNguSelected, state.loaiTheSelected, state.soThe]);

    useEffect(() => {
        const fetch = async () => {
            const { diaBan, ngonNgu, loaiThe } = await fetchFilterData();
            setState(prevState => ({ ...prevState, diaBan, ngonNgu, loaiThe }));
        };
        fetch();
    }, []);
    // Vì các bộ lọc ít khi thay đổi nên có thể dùng useMemo để tối ưu việc render các options của Select
    const diaBanOptions = useMemo(() => state.diaBan?.map((filterItem: any) => (
        <Option key={filterItem.ID} value={filterItem.ID}>
            {filterItem.Name}
        </Option>
    )), [state.diaBan]);

    const ngonNguOptions = useMemo(() => state.ngonNgu?.map((filterItem: any) => (
        <Option key={filterItem.ID} value={filterItem.ID}>
            {filterItem.Ten}
        </Option>
    )), [state.ngonNgu]);

    const loaiTheOptions = useMemo(() => state.loaiThe?.map((filterItem: any) => (
        <Option key={filterItem.ID} value={filterItem.ID}>
            {filterItem.Ten}
        </Option>
    )), [state.loaiThe]);

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
                                placeholder="Chọn ngôn ngữ"
                                style={{ width: '100%' }} onChange={(value) =>
                                    setState(prevState => ({ ...prevState, ngonNguSelected: value }))}
                            >
                                {ngonNguOptions}
                            </Select>
                        </div>
                        <div className="col-md-4">
                            <Select
                                allowClear={true}
                                showSearch
                                filterOption={(input, option: any) =>
                                    (option?.children?.toLowerCase() ?? '').includes(input?.toLowerCase())}
                                placeholder="Chọn loại thẻ"
                                style={{ width: '100%' }} onChange={(value) =>
                                    setState(prevState => ({ ...prevState, loaiTheSelected: value }))}
                            >
                                {loaiTheOptions}
                            </Select>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <Input onBlur={(e) => setState(prevState => ({ ...prevState, soThe: e.target.value }))} placeholder="Số thẻ" />
                        </div>
                    </div>
                </>

            }
            <Spin spinning={state.loading} tip="Loading...">
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 1,
                        md: 2,
                        lg: 2,
                        xl: 2,
                        xxl: 2,
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