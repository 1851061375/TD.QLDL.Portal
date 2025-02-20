import { FORMAT_DATE } from "@/data/constant";
import { AntdButton, AntdModal, AntdSelect } from "@/lib/antd/components"
import { requestGET } from "@/utils/baseAPI";
import { Col, DatePicker, Form, Input, InputNumber, Row, Space } from "antd";
import { FC, useEffect, useState } from "react";

const options = [
    { label: 'Sử dụng', value: true as any },
    { label: 'Không sử dụng', value: false as any },
];
type Props = {
    id?: string,
    chiTietModal?: boolean
    setChiTietModal: React.Dispatch<React.SetStateAction<boolean>>

}
export const VanBanNhaODetail: FC<Props> = ({ id, chiTietModal, setChiTietModal }) => {
    const [form] = Form.useForm<any>()
    const [loadding, setLoadding] = useState(false);
    const handleCancel = () => {
        setChiTietModal(false)
    };
    const onFinish = () => {
        const formData = form.getFieldsValue()
        setChiTietModal(false)
    }
    useEffect(() => {
        const fetchData = async () => {
            setLoadding(true);
            const res = await requestGET(`GetVanBanQPPLNhaOPublic?id=${id}`);

            if (res && res.data) {
                form.setFieldsValue(res.data);
            }
            setLoadding(false);
        };
        if (id) {
            fetchData();
        }
        return () => { };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    return (
        <AntdModal title="Chi tiết văn bản quy phạm pháp luật nhà ở" visible={true} handlerCancel={handleCancel} footer={null}>
            <Form name='VanBanNhaO' layout="vertical" onFinish={onFinish} form={form} initialValues={{ thuTu: 1 }}>
                <Row gutter={[8, 8]}>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Số ký hiệu"
                            name="SoKyHieu"
                        >
                            <Input></Input>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Người Ký"
                            name="NguoiKy"
                        >
                            <Input></Input>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Ngày ban hành"
                            name="NgayBanHanh"
                        >
                            <Input></Input>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Ngày hiệu lực"
                            name="NgayHieuLuc"
                        >
                            <Input></Input>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Trạng thái"
                            name="TrangThai"
                        >
                            <AntdSelect options={options}></AntdSelect>

                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Cơ quan ban hành"
                            name="CoQuanBanHanh"
                        >
                            <Input></Input>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Trích yếu"
                            name="TrichYeu"
                        >
                            <Input.TextArea></Input.TextArea>
                        </Form.Item>
                    </Col>

                </Row>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Space >
                        <AntdButton type="primary" onClick={onFinish}>
                            Xác nhận
                        </AntdButton>
                        <AntdButton type="default" onClick={handleCancel}>
                            Đóng
                        </AntdButton>
                    </Space>
                </Form.Item>
            </Form>
        </AntdModal>
    )
}