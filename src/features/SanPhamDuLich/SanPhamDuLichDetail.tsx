import { requestGET } from "@/utils/baseAPI";
import { FC, useEffect, useState } from "react";
import { Card, Image, Typography, Divider, Row, Col, List, Spin } from 'antd';
const { Meta } = Card;
const { Paragraph, Title } = Typography;
import { useParams } from 'react-router-dom';
import MyItem from "./components/MyItem";
import { Domain } from '@/data'

const fetchData = async (id: any) => {
    const res = await requestGET(`sanphamdulichs/${id}`);
    return res;
};

const SanPhamDuLichDetail: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [state, setState] = useState<{
        loading: boolean;
        item: any;
        similarItems: any[];
        topRef: any;
        orderModalVisible: boolean;
        orderData: any;
        coverUrl: string;
    }>({
        loading: true,
        item: null,
        similarItems: [],
        topRef: null,
        orderModalVisible: false,
        orderData: null,
        coverUrl: 'https://via.placeholder.com/700x500',
    });


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
        };
        fetch();
    }, [id]);


    return (
        <div className="container py-4" ref={state.topRef}>
            <Spin spinning={state.loading} tip="Loading..." style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                {state.item && (
                    <div style={{ maxWidth: 1200, margin: 'auto' }}>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={24} md={12}>
                                <div style={{ height: '400px', overflow: 'hidden' }}>
                                    <Image src={state.coverUrl} style={{ height: '100%', objectFit: 'cover' }} />
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={12}>
                                <Card>
                                    <Meta
                                        title={
                                            <Title level={2} style={{ whiteSpace: 'pre-wrap' }}>
                                                {state.item.Ten}
                                            </Title>
                                        }
                                        description={
                                            <>
                                                <Paragraph>{state.item.MoTa}</Paragraph>
                                                <Divider />
                                                <Title level={4}>Giá: {state.item.Gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Title>
                                            </>
                                        }
                                    />
                                </Card>
                            </Col>
                        </Row>

                        <Divider />

                        <Title level={4}>Sản phẩm tương tự</Title>
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

                    </div>
                )}
            </Spin>

        </div>
    );
};

export default SanPhamDuLichDetail;
