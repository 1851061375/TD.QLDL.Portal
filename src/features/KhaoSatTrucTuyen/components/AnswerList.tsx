import React, { useEffect, useState, useCallback } from 'react';
import { requestGET } from "@/utils/baseAPI";
import { Avatar, List, message, Typography } from 'antd';
import VirtualList from 'rc-virtual-list';
import { Link } from 'react-router-dom';

const fetchData = async (
  page: number = 1,
  offset: number = 6,
  search = ''
) => {
  const res = await requestGET(`phieutralois`, {
    page,
    offset,
    search,
  });
  return res;
};

const ContainerHeight = 420;

const AnswerList = () => {
  const [state, setState] = useState({
    loading: true,
    data: [],
    page: 1,
    offset: 6,
    totalItems: 0,
    visible: false,
    search: '',
  });

  useEffect(() => {
    const fetch = async () => {
      setState(prevState => ({ ...prevState, loading: true }));
      const res = await fetchData(state.page, state.offset, state.search);
      setState(prevState => ({ ...prevState, data: res.data ?? [], totalItems: res.count ?? 0, loading: false }));
    };
    fetch();
  }, [state.page, state.offset, state.search]);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (state.totalItems <= state.offset * state.page) return;
    if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - ContainerHeight) <= 1) {
      setState(prevState => ({ ...prevState, page: prevState.page + 1 }));
    }
  };

  return (
    <List>
      <VirtualList
        data={state.data}
        height={ContainerHeight}
        itemHeight={80} // Chiều cao của mỗi phần tử, bao gồm cả nội dung
        itemKey="email"
        onScroll={onScroll}
      >
        {(item: any) => (
          <List.Item key={item.Email}
          >
            <List.Item.Meta
              title={
                <Link to={`/khac/phieu-tra-loi/${item.ID}`}>{item.Email}</Link>
              }
              description={new Date(item.NgayTraLoi).toLocaleDateString('vi-VN')}
            />
            <Typography.Paragraph ellipsis={{ rows: 1 }} style={{ height: '1.5em', overflow: 'hidden', marginBottom: 0 }}>
              {item.KhaoSatText}
            </Typography.Paragraph>
            <div ></div> {/* Thêm khoảng cách giữa Meta và Content */}
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};

export default AnswerList;