import { requestGET } from "@/utils/baseAPI";
import { FC, useEffect, useState } from "react";
import {
  Card, Image, Typography, Divider,
  Row, Col, List, Spin, Tag
} from "antd";
const { Meta } = Card;
const { Paragraph, Title } = Typography;
import { useParams } from "react-router-dom";
import MyItem from "./components/MyItem";
import { Domain } from "@/data";

const fetchData = async (id: any) => {
  const res = await requestGET(`cosoluutrus/${id}`);
  return res;
};

const fetchSimilarData = async (typeId: any, woids: any) => {
  const res = await requestGET(`cosoluutrus`, {
    loaiLuuTruID: typeId,
    woids: woids,
    page: 1,
    offset: 4,
  });
  return res;
};

const CoSoLuuTruDetail: FC = () => {
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
      let loaiLuuTruID = res.data?.LoaiLuuTruID;
      console.log(loaiLuuTruID)
      if (loaiLuuTruID) {
        var similarRes = await fetchSimilarData(loaiLuuTruID, id);
        setState((prevState) => ({
          ...prevState,
          similarItems: similarRes.data ?? [],
        }));
      }
    };
    fetch();
  }, [id]);

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
              <Col xs={24} sm={24} md={12}>
                <div style={{ height: "400px", overflow: "hidden" }}>
                  <Image
                    src={state.coverUrl}
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                </div>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Card>
                  <Meta
                    title={
                      <Title level={2} style={{ whiteSpace: "pre-wrap" }}>
                        {state.item.Ten}
                      </Title>
                    }
                    description={
                      <>
                        <Paragraph>{state.item.MoTa}</Paragraph>
                        <Divider />
                        <Paragraph>
                          <strong>Địa chỉ:</strong> {state.item.DiaChi}
                        </Paragraph>
                        <Paragraph>
                          <strong>Điện thoại:</strong> {state.item.DienThoai}
                        </Paragraph>
                        <Paragraph>
                          <strong>Email:</strong> {state.item.Email}
                        </Paragraph>
                        <Paragraph>
                          <strong>Website:</strong>{" "}
                          <a
                            href={state.item.Website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {state.item.Website}
                          </a>
                        </Paragraph>
                        <Paragraph>
                          <strong>Giá:</strong>{" "}
                          {state.item.GiaThapNhat?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}{" "}
                          -{" "}
                          {state.item.GiaCaoNhat?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </Paragraph>
                        <Paragraph>
                          <strong>Giờ mở cửa:</strong> {state.item.GioMoCua} -{" "}
                          {state.item.GioDongCua}
                        </Paragraph>
                        <Paragraph>
                          <strong>Ngày mở cửa:</strong>{" "}
                          {state.item.NgayMoCuaCodes.split(",")?.map(
                            (day: string) => (
                              <Tag key={day}>{day}</Tag>
                            )
                          )}
                        </Paragraph>
                      </>
                    }
                  />
                </Card>
              </Col>
            </Row>

            <Divider />

            <Title level={4}>Cơ sở lưu trú khác</Title>
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
                <List.Item
                  onClick={() => {
                    if (state.topRef && state.topRef.current) {
                      state.topRef.current.scrollIntoView({
                        behavior: "smooth",
                      });
                    }
                  }}
                >
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

export default CoSoLuuTruDetail;
