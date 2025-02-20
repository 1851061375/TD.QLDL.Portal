import { requestGET } from "@/utils/baseAPI";
import { useEffect, useState, useCallback } from "react";
import _ from 'lodash';
import { List, Pagination, Spin } from 'antd';
import MyItem from "./MyItem";



const fetchData = async (
    page: number = 1,
    offset: number = 8,
    search = ''
) => {
    const res = await requestGET(`quyhoachdulichs`, {
        page,
        offset,
        search,
    });
    return res;
};



export const ItemList = () => {
    const [state, setState] = useState({
        loading: true,
        data: [],
        page: 1,
        offset: 8,
        totalItems: 0,
        visible: false,
        search: '',
    });


    const onPageChange = useCallback((page: number) => {
        setState(prevState => ({ ...prevState, page }));
    }, []);

    useEffect(() => {
        const fetch = async () => {
            setState(prevState => ({ ...prevState, loading: true }));
            const res = await fetchData(state.page, state.offset, state.search,);
            setState(prevState => ({ ...prevState, data: res.data ?? [], totalItems: res.count ?? 0, loading: false }));
        };
        fetch();
    }, [state.page, state.offset, state.search]);

    return (
        <>
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

    )
}