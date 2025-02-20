import { requestGET, requestPOST, requestPUT } from "@/utils/baseAPI";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  Divider,
  Button,
  Row,
  Col,
  List,
  message,
  Form,
  Modal,
  Input,
  Spin,
  Rate,
} from "antd";
import {
  FrownOutlined,
  MehOutlined,
  SmileOutlined,
} from "@ant-design/icons";
const { Meta } = Card;
const { TextArea } = Input;
const { Paragraph, Title } = Typography;
import { useParams } from "react-router-dom";
import QuestionCard2 from "./components/QuestionCard2";
import { useLocation } from "react-router-dom";
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

const customIcons: Record<number, React.ReactNode> = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

const desc = ["Cực kỳ không hài lòng", "Không hài lòng", "Bình thường", "Hài lòng", "Rất hài lòng"];

const fetchData = async (id: any) => {
  const res = await requestGET(`phieutralois/${id}`);
  return res;
};

const fetchAnswers = async (data: any, id: any) => {
  if (data) {
    const res = await requestPUT(`phieutralois/${id}`, data);
    return res;
  }
};

const PhieuTraLoiDetail: FC = () => {
  let navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [state, setState] = useState<{
    loading: boolean;
    item: any;
    answers: any;
    rate: number;
    currentUrl: string;
  }>({
    loading: true,
    item: null,
    answers: null,
    rate: 0,
    currentUrl: useLocation().pathname + useLocation().search,
  });

  useEffect(() => {
    const fetch = async () => {
      setState((prevState) => ({ ...prevState, loading: true }));
      const res = await fetchData(id);
      if (res.data) {
        // Set form fields with the fetched data
        form.setFieldsValue({
          Email: res.data.Email,
          Rate: res.data.Rate,
          GopY: res.data.GopY,
          ...Object.fromEntries(res.data.TraLois?.map((item: any) => [item.CauHoiID, item.NoiDung])),
        });
      }
      setState((prevState) => ({
        ...prevState,
        item: res.data ?? [],
        rate: res.data.Rate,
        loading: false,
      }));
    };
    fetch();
  }, [id, form]);

  useEffect(() => {
    const fetch = async () => {
      if (state.answers) {
        const res = await fetchAnswers(state.answers, id);
        if (res.data) {
          message.success("Gửi câu trả lời thành công");
          navigate("/khac/khao-sat-truc-tuyen");
        } else {
          message.error("Gửi câu trả lời thất bại");
        }
      }
    };
    fetch();
  }, [state.answers]);

  const handleDelete = () => {
    Modal.confirm({
      title: "Xóa hết câu trả lời trong biểu mẫu?",
      content:
        "Thao tác này sẽ xóa câu trả lời của bạn khỏi tất cả câu hỏi." +
        "Bạn sẽ không thể hủy được thao tác này sau khi thực hiện.",
      onOk() {
        form.resetFields();
        window.location.reload();
      },
    });
  };

  const onFinish = (values: any) => {
    let submitData = {
      Email: "",
      KhaoSatID: values.KhaoSatID,
      TraLois: [] as any[],
      Rate: 0,
      GopY: '',
    };

    Object.keys(values).forEach((key) => {
      if (key === "Email" || key === "GopY") {
        submitData[key] = values[key];
      } else if (key === "Rate") {
        submitData.Rate = state.rate;
      } else {
        submitData.TraLois.push({
          CauHoiID: key,
          NoiDung: values[key],
        });
      }
    });

    submitData.KhaoSatID = id;
    setState((prevState) => ({ ...prevState, answers: submitData }));
  };

  return (
    <div className="container py-4">
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
          <>
            <Form form={form} onFinish={onFinish}>
              <Card
                className="box-company"
                style={{
                  width: "100%",
                  marginBottom: "16px",
                  boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
                  borderTop: "10px solid #1890ff",
                }}
              >
                <Meta
                  style={{ padding: "18px 12px" }}
                  description={
                    <>
                      <Title
                        level={3}
                        ellipsis={{ rows: 1 }}
                        style={{ marginBottom: 12, overflow: "hidden" }}
                      >
                        <strong>{state.item.KhaoSatText}</strong>
                      </Title>

                      <Paragraph style={{ marginBottom: 0 }}>
                        {state.item.NoiDung}
                      </Paragraph>
                    </>
                  }
                />
                <Divider style={{ margin: 0 }} />
                <Paragraph style={{ color: "red", padding: "12px", margin: 0 }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    * Biểu thị câu hỏi bắt buộc
                    <div
                      style={{
                        display: "flex",
                        width: "100px",
                      }}
                    >
                      <FacebookShareButton
                        url={window.location.href}
                        hashtag={state.item?.Ten ?? ""}
                        className="ms-2"
                      >
                        <FacebookIcon size={32} round={true} />
                      </FacebookShareButton>
                      <EmailShareButton
                        url={window.location.href}
                        subject={state.item?.Ten ?? ""}
                        body="body"
                        className="ms-2"
                      >
                        <EmailIcon size={32} round />
                      </EmailShareButton>
                    </div>
                  </div>
                </Paragraph>
                <Divider style={{ margin: 0 }} />
                <Meta
                  style={{ padding: "12px" }}
                  description={
                    <>
                      <Title level={5} style={{ marginBottom: "10px" }}>
                        Email của bạn
                        <span style={{ color: "red" }}> *</span>
                      </Title>
                      <Form.Item
                        name="Email"
                        style={{ marginBottom: 0 }}
                        rules={[
                          {
                            required: true,
                            message: "Đây là câu hỏi bắt buộc",
                          },
                        ]}
                      >
                        <Input.TextArea
                          autoSize={{ minRows: 1, maxRows: 5 }}
                          placeholder="Email của bạn"
                          style={{
                            border: "none",
                            borderBottom: "1px solid #d9d9d9",
                          }}
                          onFocus={(e: any) => {
                            e.target.style.borderBottom = "2px solid #1890ff";
                            e.target.style.outline = "none";
                          }}
                          onBlur={(e: any) =>
                            (e.target.style.borderBottom = "1px solid #d9d9d9")
                          }
                        />
                      </Form.Item>
                    </>
                  }
                />
              </Card>
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 1,
                  md: 1,
                  lg: 1,
                  xl: 1,
                  xxl: 1,
                }}
                dataSource={state.item?.TraLois
                  ?.sort(
                    (a: any, b: any) => a.ThuTu - b.ThuTu
                  )}
                renderItem={(item: any) => (
                  <List.Item key={item.ID}>
                    <QuestionCard2 {...item} />
                  </List.Item>
                )}
              />
              <Card
                className="box-company"
                style={{
                  width: "100%",
                  marginBottom: "16px",
                  boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Meta
                  style={{ padding: "12px" }}
                  description={
                    <>
                      <Title level={5} style={{ marginBottom: "10px" }}>
                        Đánh giá khảo sát
                      </Title>
                      <Form.Item
                        name="Rate"
                        style={{ marginBottom: 0 }}
                      >
                        <Rate
                          onChange={(e) => setState((prevState) => ({ ...prevState, rate: e }))}
                          character={({ index = 0 }) => customIcons[index + 1]}
                          tooltips={desc}
                        />
                      </Form.Item>

                      <Form.Item
                        name="GopY"
                        style={{ marginBottom: 0 }}
                      >
                        <TextArea
                          className="mt-2"
                          placeholder="Góp ý"
                          autoSize={{ minRows: 3, maxRows: 5 }}
                        />
                      </Form.Item>
                    </>
                  }
                />
              </Card>
              <Row justify="space-between">
                <Col>
                  <Button type="primary" htmlType="submit">
                    Gửi
                  </Button>
                  <Button
                    className="ms-2"
                    onClick={() => navigate("/khac/khao-sat-truc-tuyen")}
                  >
                    Hủy
                  </Button>
                </Col>
                <Col>
                  <Button
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                      outline: "none",
                    }}
                    onClick={handleDelete}
                  >
                    Xóa tất cả
                  </Button>
                </Col>
              </Row>
            </Form>
          </>
        )}
      </Spin>
    </div>
  );
};

export default PhieuTraLoiDetail;
