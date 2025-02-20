import { requestGET } from "@/utils/baseAPI";
import { useEffect, useState, useCallback, useMemo } from "react";
import _ from "lodash";
import { Input, Select, Button, List, Pagination, Spin } from "antd";
import MyItem from "./MyItem";

const { Search } = Input;
const { Option } = Select;

// Viết các hàm này ra ngoài component để tránh khởi tạo lại mỗi khi component re-render
const fetchData = async (
  page: number = 1,
  offset: number = 8,
  search = "",
  loaiDichVuLuHanhId = ""
) => {
  const res = await requestGET(`dichvuluhanhs`, {
    page,
    offset,
    search,
    loaiDichVuLuHanhId,
  });
  return res;
};

const fetchFilterData = async () => {
  const res = await requestGET(`dmchungs`, { groupcode: "LDVLH" });
  return { loaiDichVu: res.data };
};

export const ItemList = () => {
  const [state, setState] = useState({
    loading: true,
    data: [],
    page: 1,
    offset: 8,
    totalItems: 0,
    visible: false,
    loaiDichVu: [],
    search: "",
    loaiDichVuSelected: "",
  });

  // Sử dụng useCallback để tránh khởi tạo lại mỗi khi re-render
  const handleToggleSelects = useCallback(() => {
    setState((prevState) => ({ ...prevState, visible: !prevState.visible }));
  }, []);

  const onPageChange = useCallback((page: number) => {
    setState((prevState) => ({ ...prevState, page }));
  }, []);

  useEffect(() => {
    const fetch = async () => {
      setState((prevState) => ({ ...prevState, loading: true }));
      const res = await fetchData(
        state.page,
        state.offset,
        state.search,
        state.loaiDichVuSelected
      );
      setState((prevState) => ({
        ...prevState,
        data: res.data ?? [],
        totalItems: res.count ?? 0,
        loading: false,
      }));
    };
    fetch();
  }, [state.page, state.offset, state.search, state.loaiDichVuSelected]);

  useEffect(() => {
    const fetch = async () => {
      const { loaiDichVu } = await fetchFilterData();
      setState((prevState) => ({ ...prevState, loaiDichVu }));
    };
    fetch();
  }, []);

  // Vì các bộ lọc ít khi thay đổi nên có thể dùng useMemo để tối ưu việc render các options của Select
  const loaiDichVuOptions = useMemo(
    () =>
      state.loaiDichVu?.map((filterItem: any) => (
        <Option key={filterItem.ID} value={filterItem.ID}>
          {filterItem.Ten}
        </Option>
      )),
    [state.loaiDichVu]
  );

  return (
    <>
      <div className="row mb-3">
        <div className="col-md-4">
          <Search
            placeholder="Từ khóa"
            allowClear
            onSearch={(value) =>
              setState((prevState) => ({ ...prevState, search: value }))
            }
          />
        </div>
        <div className="col-md-4">
          <Button onClick={handleToggleSelects}>Bộ lọc</Button>
        </div>
      </div>
      {state.visible && (
        <div className="row mb-3">
          <div className="col-md-4">
            <Select
              allowClear={true}
              showSearch
              filterOption={(input, option: any) =>
                (option?.children?.toLowerCase() ?? "").includes(
                  input?.toLowerCase()
                )
              }
              placeholder="Chọn loại dịch vụ"
              style={{ width: "100%" }}
              onChange={(value) =>
                setState((prevState) => ({
                  ...prevState,
                  loaiDichVuSelected: value,
                }))
              }
            >
              {loaiDichVuOptions}
            </Select>
          </div>
        </div>
      )}
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
        {state.totalItems > state.offset && (
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <Pagination
              current={state.page}
              pageSize={state.offset}
              total={state.totalItems}
              onChange={onPageChange}
            />
          </div>
        )}
      </Spin>
    </>
  );
};
