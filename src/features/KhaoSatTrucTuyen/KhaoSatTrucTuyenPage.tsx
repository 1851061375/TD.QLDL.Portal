import { Card, Row, Col, Typography, Divider } from "antd"
import { ItemList } from "./components/ItemList"
import AnswerList from "./components/AnswerList"

const KhaoSatTrucTuyenPage = (props: any) => {

    return (
        <div className="container py-4">
            <Card
                title="Khảo sát trực tuyến"
                style={{ minHeight: "400px" }}
                className={props.hidden ? "hidden" : "widget widget-title-img mb-4"}
            >
                <Row gutter={[24, 24]}>
                    <Col md={20} xl={18} span={24}>
                        <Divider orientation="left" orientationMargin="0">
                            Khảo sát đang diễn ra
                        </Divider>
                        <ItemList />
                    </Col>

                    <Col md={4} xl={6} span={24}>
                        <Divider orientation="left" orientationMargin="0">
                            Trả lời
                        </Divider>
                        <AnswerList />
                    </Col>
                </Row>

            </Card>
        </div>

    )
}

export default KhaoSatTrucTuyenPage;