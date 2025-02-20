import { Modal, Form, Input, Row, Col } from 'antd';

const OrderModal = ({ visible, onCancel, onOk, product}: any) => {
    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields().then((values) => {
            form.resetFields(); // Reset form fields after submission
            const entity = {
                KhachHang: {
                    HoTen: values['KhachHang.Ten'],
                    CanCuoc: values['KhachHang.CanCuoc'],
                    DienThoai: values['KhachHang.DienThoai'],
                    Email: values['KhachHang.Email'],
                    DiaChi: values['KhachHang.DiaChi']
                },
                ChiTietDonHangs: [
                    {
                        ItemID: values.ItemId,
                        SoLuong: values.SoLuong,
                        LoaiID: values.LoaiId,
                        Ten: product.Ten,
                        Gia: product.Gia
                    }
                ]
            };
            onOk(entity);
        });
    };
;

    return (
        <Modal
            title="Thông tin đơn hàng"
            visible={visible}
            onCancel={onCancel}
            onOk={handleOk}
            width={800} // Set the width of the modal
        >
            <Form form={form} layout="vertical" initialValues={{
                ItemId: product.ID,
                Ten: product.Ten,
                Gia: product.Gia?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
                LoaiId: '738fb4a9-fb90-4fe0-b239-247c98839be1',
                SoLuong: 1
            }}>
                <Row gutter={16} style={{ display: 'none' }}>
                    <Col span={12}>
                        <Form.Item name="LoaiId" >
                            <Input disabled/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                    <Form.Item name="ItemId" >
                        <Input disabled/>
                    </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item 
                            name="Ten"
                            label="Tên sản phẩm"
                        >
                            <Input disabled/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            name="Gia"
                            label="Giá sản phẩm"
                        >
                            <Input disabled/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="KhachHang.Ten"
                            label="Tên khách hàng"
                            rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="KhachHang.CanCuoc"
                            label="Căn cước"
                            rules={[{ required: true, message: 'Vui lòng nhập số căn cước của bạn!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="SoLuong"
                            label="Số lượng"
                            rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                        >
                            <Input type="number" min="1" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="KhachHang.Email"
                            label="Email"
                            rules={[{ required: true, message: 'Vui lòng nhập email của bạn!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                <Col span={12}>
                        <Form.Item
                            name="KhachHang.DienThoai"
                            label="Điện thoại"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của bạn!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="KhachHang.DiaChi"
                            label="Địa chỉ"
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ của bạn!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        
                    </Col>
                </Row>
            </Form>
        </Modal>
        
    );
};

export default OrderModal;