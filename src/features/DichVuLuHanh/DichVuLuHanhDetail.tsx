import { requestGET, requestPOST } from "@/utils/baseAPI";
import { FC, useEffect, useState } from "react";
import {
    Card, Image, Typography, Divider,
    Row, Col, List, message, Spin, Descriptions,
    Space, Button
} from 'antd';
const { Meta } = Card;
const { Paragraph, Title } = Typography;
import { useParams } from 'react-router-dom';
import MyItem from "./components/MyItem";
import OrderModal from "./components/OrderModal";
import { Domain } from '@/data'

const fetchData = async (id: any) => {
    const res = await requestGET(`dichvuluhanhs/${id}`);
    return res;
};

const fetchSimilarData = async (typeId: any, woids: any) => {
    const res = await requestGET(`dichvuluhanhs`, {
        loaidichvuid: typeId,
        woids: woids,
        page: 1,
        offset: 4,
    });
    return res;
}

const fetchtoCard = async (data: any) => {
    const res = await requestPOST(`dondathangs`, data);
    return res;
}

const DichVuLuHanh: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [state, setState] = useState<{
        loading: boolean;
        item: any;
        similarItems: any[];
        topRef: any;
        orderModalVisible: boolean;
        orderData: any;
        coverUrl: string;
        descriptionExpanded: boolean;
    }>({
        loading: true,
        item: null,
        similarItems: [],
        topRef: null,
        orderModalVisible: false,
        orderData: null,
        coverUrl: 'https://via.placeholder.com/700x500',
        descriptionExpanded: false,
    });


    useEffect(() => {
        const fetch = async () => {
            if (state.orderData) {
                const res = await fetchtoCard(state.orderData);
                if (res?.data) {
                    message.success('Đặt hàng thành công');
                } else {
                    message.error('Đặt hàng thất bại');
                }
            }

        };
        fetch();
    }, [state.orderData]);


    useEffect(() => {
        const fetch = async () => {
            setState(prevState => ({ ...prevState, loading: true }));
            const res = await fetchData(id);
            setState(prevState => ({ ...prevState, item: res?.data ?? [], loading: false }));
            if (res?.data.DinhKem) {

                setState(prevState => ({ ...prevState, coverUrl: `${Domain + res?.data.DinhKem.split(',')[0]}` }));
            }
            else {
                setState(prevState => ({ ...prevState, coverUrl: 'https://via.placeholder.com/700x500' }));
            }
            let loaidichvuluhanhid = res?.data?.LoaiDichVuID;
            if (loaidichvuluhanhid) {
                var similarRes = await fetchSimilarData(loaidichvuluhanhid, id);
                setState(prevState => ({ ...prevState, similarItems: similarRes?.data ?? [] }));
            }
        };
        fetch();
    }, []);

    const toggleDescription = () => {
        setState(prevState => ({ ...prevState, descriptionExpanded: !prevState.descriptionExpanded }));
    };

    return (
        <div className="container py-4" ref={state.topRef}>
            <Spin spinning={state.loading} tip="Loading..." style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                {state.item && (
                    <Space direction="vertical" size="middle" style={{
                        display: 'flex',
                        maxWidth: 1200,
                        margin: 'auto'
                    }}>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={24} md={12}>
                                <div style={{ maxHeight: '400px', overflow: 'hidden' }}>
                                    <Image src={state.coverUrl} style={{ height: '100%', objectFit: 'cover' }} />
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={12}>
                                <Card style={{ maxHeight: '400px' }} className="shadow-sm">
                                    <Title level={3} className="mb-1 mt-1">{state.item?.Ten}</Title>
                                    <Title className="mb-1 mt-1" level={5}>{state.item?.DoanhNghiepText}</Title>
                                    <Title level={5} className="mb-0 mt-1">Giá: {state.item?.Gia?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Title>
                                    <Divider />
                                    <Descriptions bordered column={1}>
                                        <Descriptions.Item label="Loại dịch vụ">{state.item?.LoaiDichVuText}</Descriptions.Item>
                                        <Descriptions.Item label="Điện thoại liên hệ">{state.item?.DienThoai}</Descriptions.Item>
                                        <Descriptions.Item label="Email liên hệ">{state.item?.Email}</Descriptions.Item>
                                    </Descriptions>

                                </Card>
                            </Col>

                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={24} md={24}>
                                <Card className="shadow-sm">
                                    <Title level={5}>Thông tin mô tả</Title>
                                    <div
                                        style={{
                                            maxHeight: state.descriptionExpanded ? 'none' : '350px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: state.descriptionExpanded ? 'block' : '-webkit-box',
                                            WebkitLineClamp: state.descriptionExpanded ? 'none' : 5,
                                            WebkitBoxOrient: 'vertical',
                                        }}
                                        dangerouslySetInnerHTML={{ __html: state.item?.MoTa }}
                                    ></div>
                                    <a
                                        className="mt-1"
                                        onClick={toggleDescription}
                                        style={{ color: '#1890ff', cursor: 'pointer', display: 'block', marginTop: '10px' }}
                                    >
                                        {state.descriptionExpanded ? 'Thu gọn' : 'Xem thêm'}
                                    </a>
                                </Card>
                            </Col>
                        </Row>
                        <Title level={4}>Dịch vụ tương tự</Title>
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
                            dataSource={state.similarItems}
                            renderItem={(item: any) => (
                                <List.Item onClick={() => {
                                    if (state.topRef && state.topRef.current) {
                                        state.topRef.current.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}>
                                    <MyItem {...item} />
                                </List.Item>
                            )}
                        />

                        <OrderModal
                            visible={state.orderModalVisible}
                            onCancel={() => setState(prevState => ({ ...prevState, orderModalVisible: false }))}
                            onOk={(values: any) => {
                                // Xử lý đơn hàng ở đây
                                setState(prevState => ({ ...prevState, orderData: values }));
                                setState(prevState => ({ ...prevState, orderModalVisible: false }));
                            }}
                            product={state.item}
                        />

                    </Space>
                )}
            </Spin>
        </div>
    );
};

export default DichVuLuHanh;
