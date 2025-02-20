import { AntdButton } from "@/lib/antd/components";
import { Col, Form, Input, InputNumber, Row, Space, Card } from "antd";
import './LienHe.scss'
import { requestPOST2 } from "@/utils/baseAPI";
import { toast } from "react-toastify";
import React, { useEffect } from "react"

import {
    loadCaptchaEnginge,
    LoadCanvasTemplate,
    LoadCanvasTemplateNoReload,
    validateCaptcha
} from "react-simple-captcha";

export const LienHePage = () => {
    const recaptchaRef = React.createRef();

    const [form] = Form.useForm<any>()
    const onFinish = async () => {

        var formValue = form.getFieldsValue();

        if (validateCaptcha(formValue.captcha) == true) {

            loadCaptchaEnginge(6);

            const values = await form.validateFields();

            console.log(form.getFieldsValue());
            var res = await requestPOST2(`AddLienHe`, form.getFieldsValue());
            if (res) {
                toast.success('Thao tác thành công!');
                form.resetFields()
            } else {
                toast.error('Thất bại, vui lòng thử lại!');
            }

        } else {
            alert("Captcha không đúng");
        }

    }

    useEffect(() => {
        loadCaptchaEnginge(8);
    })

    return (
        <>
            <Card
                title="Thông tin liên hệ"
                //extra={<Link to="/"><PlusCircleOutlined /> Xem thêm</Link>}
                className="widget widget-title-img mb-4 lien-he"
            >
                <div style={{ display: 'flex', textAlign: 'center', marginTop: '50px', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ marginBottom: '20px' }}>
                        {/* <h1>Thông tin liên hệ</h1> */}
                        <span>Hướng dẫn liên hệ</span>
                    </div>
                    <Form
                        name="lienhe"
                        initialValues={{ remember: true }}
                        style={{ width: '50%' }}
                        form={form}
                        layout="vertical"
                    >
                        <Form.Item
                            label="Họ tên"
                            name="HoTen"
                            rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Địa chỉ"
                            name="DiaChi"
                        //rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}

                        >
                            <Input />
                        </Form.Item>


                        <Form.Item
                            label="Số điện thoại"
                            name="SoDienThoai"
                            rules={[{ required: true, message: 'Vui lòng nhập Số điện thoại' }]}
                        >
                            <Input />
                        </Form.Item>



                        <Form.Item
                            label="Email"
                            name="Email"
                        //rules={[{ required: true, message: 'Vui lòng nhập Email' }]}

                        >
                            <Input />
                        </Form.Item>



                        <div id="nhap-captcha">

                            <div className="col mt-3">
                                <LoadCanvasTemplate />
                            </div>
                            <div className="col mt-3">
                                <div>
                                    <Form.Item
                                        label=""
                                        name="captcha"
                                        rules={[{ required: true, message: 'Vui lòng nhập captcha' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                            </div>

                        </div>


                        <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                            <AntdButton onClick={onFinish} type="primary" htmlType="submit">
                                Gửi
                            </AntdButton>
                        </Form.Item>
                    </Form>



                </div>
            </Card>
        </>

    )

}