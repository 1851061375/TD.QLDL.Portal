import { Form, Input, Row, Col, Button, Typography } from 'antd';

const BinhLuanQuyHoach = ({ onOk, product }: any) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      const entity = {
        QuyHoachId: values['QuyHoachId'],
        Ten: values['Ten'],
        Email: values['Email'],
        NoiDung: values['NoiDung'],
        IsPublic: values['IsPublic']
      };
      onOk(entity);
    });
  };

  return (
    <>
      <Typography.Title level={3}>Bình luận</Typography.Title>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          QuyHoachId: product.ID,
          Ten: '',
          Email: '',
          NoiDung: '',
          IsPublic: false
        }}
        onFinish={handleOk}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="Ten"
              label="Họ tên"
              rules={[{ required: true, message: 'Vui lòng nhập họ tên của bạn!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="Email"
              label="Email"
              rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="NoiDung"
              label="Nội dung"
              rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
            >
              <Input.TextArea
                autoSize={{ minRows: 5, maxRows: 10 }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Gửi
        </Button>
      </Form>

    </>
  );
};

export default BinhLuanQuyHoach;