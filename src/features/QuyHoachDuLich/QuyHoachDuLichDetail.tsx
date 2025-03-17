import { requestGET, requestPOST } from "@/utils/baseAPI";
import { FC, useEffect, useState, useRef } from "react";
import { Card, Typography, Divider, Row, Col, Spin, message } from 'antd';
const { Meta } = Card;
const { Paragraph, Title } = Typography;
import { useParams } from 'react-router-dom';
import { Domain } from '@/data'
import { DownloadOutlined } from '@ant-design/icons';
import { FacebookShareButton, FacebookIcon, EmailShareButton, EmailIcon } from 'react-share';
import BinhLuanQuyHoach from './components/BinhLuanQuyHoach';


const fetchData = async (id: any) => {
    const res = await requestGET(`quyhoachdulichs/${id}`);
    return res;
};

const fetchBinhLuan = async (data: any) => {
    const res = await requestPOST(`binhluanquyhoachs`, data);
    return res;
}

const QuyHoachDuLichDetail: FC = () => {

    const { id } = useParams<{ id: string }>();
    const topRef = useRef<HTMLDivElement>(null);
    const [state, setState] = useState<{
        loading: boolean;
        item: any;
        binhLuanData: any;
        coverUrl: string;
    }>({
        loading: true,
        item: null,
        binhLuanData: null,
        coverUrl: 'https://via.placeholder.com/700x500',
    });

    useEffect(() => {
        const fetch = async () => {
            setState(prevState => ({ ...prevState, loading: true }));
            const res = await fetchData(id);
            setState(prevState => ({ ...prevState, item: res?.data ?? [], loading: false }));
            if (res?.data?.DinhKem) {
                setState(prevState => ({ ...prevState, coverUrl: `${Domain + res?.data.DinhKem.split(',')[0]}` }));
            }
            else {
                setState(prevState => ({ ...prevState, coverUrl: 'https://via.placeholder.com/700x500' }));
            }
        };
        fetch();
    }, [id]);

    useEffect(() => {
        const fetch = async () => {
            if (state.binhLuanData) {
                const res = await fetchBinhLuan(state.binhLuanData);
                if (res?.data) {
                    message.success('Thực hiện thành công');
                    topRef.current?.scrollIntoView({ behavior: 'smooth' });
                } else {
                    message.error('Thực hiện thất bại');
                }
            }
        };
        fetch();
    }, [state.binhLuanData]);

    return (
        <div className="container py-4" ref={topRef}>
            <Spin spinning={state.loading} tip="Loading..." style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                {state.item && (
                    <div style={{ maxWidth: 1200, margin: 'auto' }}>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={24} md={24}>
                                <Card>
                                    <Meta
                                        title={
                                            <Title level={2} style={{ whiteSpace: 'pre-wrap' }}>
                                                {state.item.Ten}
                                            </Title>
                                        }
                                        description={
                                            <div style={{ color: '#333' }}>
                                                <Paragraph>
                                                    <strong>Tài liệu:</strong>
                                                    <DownloadOutlined
                                                        className="ms-2 me-2"
                                                        onClick={() => {
                                                            // Code để download file pdf
                                                            window.open(state.coverUrl, '_blank');
                                                        }}
                                                    />
                                                    Đính kèm
                                                </Paragraph>

                                                <Paragraph>
                                                    <strong>Chia sẻ:</strong>
                                                    <FacebookShareButton
                                                        url={window.location.href}
                                                        hashtag={state.item.Ten}
                                                        className="ms-2"
                                                    >
                                                        <FacebookIcon size={32} round={true} />
                                                    </FacebookShareButton>
                                                    <EmailShareButton
                                                        url={window.location.href}
                                                        subject={state.item.Ten}
                                                        body="body"
                                                        className="ms-2"
                                                    >
                                                        <EmailIcon size={32} round />
                                                    </EmailShareButton>
                                                </Paragraph>



                                                <Divider />
                                                <Paragraph><strong>Địa điểm:</strong> {state.item.DiaDiemQH}</Paragraph>
                                                <Paragraph><strong>Diện tích quy hoạch:</strong> {state.item.DienTichQH} m<sup>2</sup></Paragraph>
                                                <Paragraph><strong>Ngày bắt đầu:</strong> {new Date(state.item.NgayBatDau).toLocaleDateString('vi-VN')}</Paragraph>
                                                <div dangerouslySetInnerHTML={{ __html: state.item.NoiDung }}></div>
                                            </div>
                                        }
                                    />
                                </Card>
                            </Col>

                            <Col xs={24} sm={24} md={24}>
                                <BinhLuanQuyHoach
                                    onOk={(values: any) => {
                                        setState(prevState => ({ ...prevState, binhLuanData: values }));
                                    }}
                                    product={state.item}
                                />

                            </Col>
                        </Row>

                    </div>
                )}
            </Spin>

        </div>
    );
};

export default QuyHoachDuLichDetail;
