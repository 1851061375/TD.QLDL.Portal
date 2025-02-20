import { requestGET, requestPOST } from "@/utils/baseAPI";
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
  Flex,
  Rate
} from "antd";
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
const { Meta } = Card;
const { TextArea } = Input;
const { Paragraph, Title } = Typography;
import { useParams } from "react-router-dom";
import QuestionCard from "./components/QuestionCard";
import { useLocation } from "react-router-dom";
import { FacebookShareButton, FacebookIcon, EmailShareButton, EmailIcon } from 'react-share';


const customIcons: Record<number, React.ReactNode> = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

const desc = ['Cực kỳ không hài lòng', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Rất hài lòng'];

const fetchData = async (id: any) => {
  const res = await await requestGET(`khaosattructuyens/${id}`);
  return res;
};

const fetchAnswers = async (data: any) => {
  if (data) {
    const res = await requestPOST(`phieutralois`, data);
    return res;
  }
};

const KhaoSatTrucTuyenDetail: FC = () => {
  let navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<{
    loading: boolean;
    item: any;
    topRef: any;
    formRef: any;
    answers: any;
    rate: number;
    currentUrl: string;
  }>({
    loading: true,
    item: null,
    topRef: null,
    formRef: null,
    answers: null,
    rate: 0,
    currentUrl: useLocation().pathname + useLocation().search,
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
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      if (state.answers) {
        const res = await fetchAnswers(state.answers);
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
        //formRef.current?.resetFields();
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
      }
      else if (key === "Rate") {
        submitData.Rate = state.rate;
      }
      else {
        submitData.TraLois.push({
          CauHoiID: key,
          // Nội dung câu trả lời
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
            <Form ref={state.formRef} onFinish={onFinish}>
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
                        <strong>{state.item.Ten}</strong>
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
                dataSource={state.item?.CauHois.sort(
                  (a: any, b: any) => a.ThuTu - b.ThuTu
                )}
                renderItem={(item: any) => (
                  <List.Item>
                    <QuestionCard {...item} />
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
                        <Flex gap="middle" vertical>
                          <Rate
                            onChange={e => setState((prevState) => ({ ...prevState, rate: e }))}
                            character={({ index = 0 }) => customIcons[index + 1]}
                            tooltips={desc}
                          />
                        </Flex>
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

export default KhaoSatTrucTuyenDetail;
