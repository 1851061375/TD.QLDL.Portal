import { requestGET } from "@/utils/baseAPI";
import { FC, useEffect, useState, useRef } from "react";
import { Card, Image, Typography, Divider, Button, Row, Col, Spin } from "antd";
const { Meta } = Card;
const { Paragraph, Title } = Typography;
import { useParams } from "react-router-dom";
import { Domain } from "@/data";

const fetchData = async (id: any) => {
  const res = await requestGET(`HuongDanViens/${id}`);
  return res;
};

const HuongDanVienDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<{
    loading: boolean;
    item: any;
    topRef: any;
    coverUrl: string;
  }>({
    loading: true,
    item: null,
    topRef: null,
    coverUrl: "https://via.placeholder.com/700x500",
  });

  useEffect(() => {
    const fetch = async () => {
      setState((prevState) => ({ ...prevState, loading: true }));
      const res = await fetchData(id);
      setState((prevState) => ({
        ...prevState,
        item: res.data ?? [],
        loading: false,
      }));
      if (res.data.DinhKem) {
        setState((prevState) => ({
          ...prevState,
          coverUrl: `${Domain + res.data.DinhKem.split(",")[0]}`,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          coverUrl: "https://via.placeholder.com/700x500",
        }));
      }
    };
    fetch();
  }, []);

  return (
    <div className="container py-4" ref={state.topRef}>
      <Spin
        spinning={state.loading}
        tip="Loading..."
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {state.item && (
          <div style={{ maxWidth: 1200, margin: "auto" }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={24}>
                <Card className="box-company-detail">
                  <div className="company-banner">
                    <div className="cover-wrapper" style={{ height: "250px" }}>
                      <Image
                        preview={false}
                        alt="Banner"
                        src="https://via.placeholder.com/1240x250"
                      />
                    </div>
                    <div
                      className="company-logo"
                      style={{
                        position: "absolute",
                        left: "10%",
                        bottom: "-16%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <Image
                        className="img-fluid"
                        preview={false}
                        alt="Logo"
                        src={state.coverUrl}
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                  <div
                    className="company-info"
                    style={{ padding: "0 12px 12px 12px" }}
                  >
                    <Title
                      level={4}
                      ellipsis={{ rows: 1 }}
                      style={{
                        marginBottom: 0,
                        height: "1.5em",
                        overflow: "hidden",
                      }}
                    >
                      <strong>{state.item.HoTen}</strong>
                    </Title>
                    <div className="company-description">
                      <Paragraph
                        ellipsis={{ rows: 2 }}
                        style={{
                          marginBottom: 0,
                          height: "1.5em",
                          overflow: "hidden",
                        }}
                      ></Paragraph>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>

            <Divider />

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={16} md={16}>
                <Card title="Giới thiệu" bordered={false}>
                  {state.item.MoTa}
                </Card>
              </Col>
              <Col xs={24} sm={8} md={8}>
                <Card title="Thông tin liên hệ" bordered={false}>
                  <p>
                    <strong>Địa chỉ:</strong> {state.item.DiaChi}
                  </p>
                  <p>
                    <strong>Điện thoại:</strong> {state.item.DienThoai}
                  </p>
                  <p>
                    <strong>Email:</strong> {state.item.Email}
                  </p>
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

export default HuongDanVienDetail;
