import { useEffect, useState } from "react";
import { Card, Col, Row, Spin } from "antd";
import { requestGET } from "@/utils/baseAPI";
import { Domain } from "@/data";
import "./AnhDepDienBien.scss";

const fetchData = async () => {
  const res = await requestGET(`anhdeps`);
  return res;
};

const AnhDepDienBien = () => {
  const [state, setState] = useState({
    anhDeps: [],
    loading: true,
  });
  useEffect(() => {
    const fetch = async () => {
      const res = await fetchData();
      setState((prevState) => ({
        ...prevState,
        anhDeps: res?.data ?? [],
        loading: false,
      }));
    };
    fetch();
  }, []);
  return (
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
      <div className="container mt-4">
        <Row gutter={[4, 4]}>
          {state?.anhDeps.map((item, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card
                hoverable
                className="text-center card-no-padding-bottom"
                cover={
                  <div style={{ position: "relative" }}>
                    <img
                      alt={item.Ten}
                      src={
                        item.DinhKem
                          ? `${Domain + item.DinhKem.split(",")[0]}`
                          : "https://via.placeholder.com/700x500"
                      }
                      style={{
                        width: "100%",
                        height: "200px",
                        borderRadius: "8px",
                        padding: "0px !important",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        background: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        textAlign: "center",
                        padding: "10px",
                        height: "40px", // Adjust the height as needed
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        borderBottomLeftRadius: "8px",
                        borderBottomRightRadius: "8px",
                      }}
                    >
                      <span
                        style={{
                          display: "block",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "normal",
                          lineHeight: "1.2em",
                          maxHeight: "2.4em",
                        }}
                      >
                        {item.Ten}
                      </span>
                    </div>
                  </div>
                }
              />
            </Col>
          ))}
        </Row>
      </div>
    </Spin>
  );
};

export default AnhDepDienBien;
