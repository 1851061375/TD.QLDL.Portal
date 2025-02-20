import { requestGET } from "@/utils/baseAPI";
import { FC, useEffect, useState, useRef } from "react";
import { Card, Image, Typography, Divider, Row, Col, Spin } from 'antd';
const { Meta } = Card;
const { Paragraph, Title } = Typography;
import { useParams } from 'react-router-dom';
import { Domain } from '@/data'

const DoanhNghiepLuHanhDetail: FC = () => {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<any>(null); // State để lưu thông tin sản phẩm
    const [similarProducts, setSimilarProducts] = useState<any[]>([]);
    const { id } = useParams<{ id: string }>();
    const topRef = useRef<HTMLDivElement>(null);
    const [coverUrl, setCoverUrl] = useState('https://via.placeholder.com/120x120');
    const [bannerUrl, setBannerUrl] = useState('https://via.placeholder.com/480x130');
    // Hàm để lấy dữ liệu sản phẩm từ API
    const fetchData = async (id: any) => {
        try {
            setLoading(true);
            const res = await requestGET(`doanhnghiepluhanhs/${id}`);
            setProduct(res.data ?? null);
            setLoading(false);
            let loaisanphamluhanhid = res.data?.LoaiSanPhamLuHanhID;
            if (loaisanphamluhanhid) {
                const similarRes = await requestGET(`sanphamluhanhs`, {
                    loaisanphamluhanhid: loaisanphamluhanhid,
                });
                setSimilarProducts(similarRes.data ?? []);
            }
            if (res.data.DinhKem) {
                setCoverUrl(`${Domain + res.data.DinhKem.split(',')[0]}`);
            }
            else {
                setCoverUrl('https://via.placeholder.com/120x120');
            }
            if (res.data.Banner) {
                setBannerUrl(Domain + encodeURIComponent(res.data.Banner.split(',')[0]))
            }
            else {
                setBannerUrl('https://via.placeholder.com/480x130');
            }
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(id);
    }, [id]);



    return (
        <div className="container py-4" ref={topRef}>
            <Spin spinning={loading} tip="Loading..." style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                    {product && (
                <div style={{ maxWidth: 1200, margin: 'auto' }}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={24}>
                            <Card className="box-company-detail">
                                <div className="company-banner" >

                                    <div className="cover-wrapper" style={{ 
                                        height: '250px', 
                                        backgroundImage: `url(${bannerUrl})`, 
                                        backgroundPosition: 'center', 
                                        backgroundSize: 'cover', 
                                        backgroundRepeat: 'no-repeat' 
                                    }} />
                                    <div className="company-logo" style={{ position: "absolute", left: "10%", bottom: "-16%", transform: "translate(-50%, -50%)" }}>
                                        <Image className="img-fluid" preview={false} alt="Logo" src={coverUrl} style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
                                    </div>
                                </div>
                                <div className="company-info" style={{ padding: '0 12px 12px 12px' }}>
                                    <Title level={4} ellipsis={{ rows: 1 }} style={{ marginBottom: 0, height: '1.5em', overflow: 'hidden' }}>
                                        <strong>{product.Ten}</strong>
                                    </Title>
                                    <div className="company-description">
                                        <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 0, height: '1.5em', overflow: 'hidden' }}>
                                        </Paragraph>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    <Divider />

                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={16} md={16}>
                            <Card title="Giới thiệu" bordered={false}>
                                {product.MoTa}
                            </Card>
                        </Col>
                        <Col xs={24} sm={8} md={8}>
                            <Card title="Thông tin liên hệ" bordered={false}>
                                <p><strong>Địa chỉ:</strong> {product.DiaChi}</p>
                                <p><strong>Điện thoại:</strong> {product.DienThoai}</p>
                                <p><strong>Email:</strong> {product.Email}</p>
                                {/* Thêm các thông tin liên hệ khác nếu cần */}
                            </Card>
                        </Col>
                    </Row>

                </div>
            )}
            </Spin>
            
        </div>
    );
    
};

export default DoanhNghiepLuHanhDetail;
