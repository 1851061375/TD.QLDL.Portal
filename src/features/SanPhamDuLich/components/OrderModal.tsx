import { Modal, Form, Input, Button } from 'antd';
import { useState, useEffect } from 'react';

const OrderModal = ({ visible, onCancel, onOk, productId, product }: any) => {
    debugger
    console.log(product);
    const [form] = Form.useForm();

    useEffect(() => {
        // Update productId in the form when it changes
        form.setFieldsValue({ productId });
    }, [productId]);

    const handleOk = () => {
        form.validateFields().then((values) => {
            form.resetFields(); // Reset form fields after submission
            onOk(values);
        });
    };

    return (
        <Modal
            title="Thông tin đơn hàng"
            visible={visible}
            onCancel={onCancel}
            onOk={handleOk}
        >
            <Form form={form} layout="vertical" initialValues={{ productId }}>
                <Form.Item name="productId">
                    <Input />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Tên"
                    rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Địa chỉ"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ của bạn!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của bạn!' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default OrderModal;
