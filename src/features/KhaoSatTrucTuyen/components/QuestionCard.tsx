import { Card, Typography, Input, Form } from 'antd';
import { useState } from 'react';

const { Title, Paragraph } = Typography;

const QuestionCard = (item: any) => {
  const [error, setError] = useState(false);

  const validateInput = (_ :any, value: any) => {
    if (!value) {
      setError(true);
      return Promise.reject(new Error('Đây là câu hỏi bắt buộc!'));
    } else {
      setError(false);
      return Promise.resolve();
    }
  };

  return (
    <Card 
        style={{ 
            padding: '0 12px 12px 12px', 
            borderColor: error ? 'red' : 'transparent', 
            borderWidth: 1, 
            borderStyle: 'solid',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)'}}>
      <Title level={5} style={{ marginBottom: '10px'}}>
        {item.NoiDung}
        <span style={{ color: 'red' }}> *</span>
      </Title>
      <Form.Item 
        name={item.ID} 
        style={{ marginBottom: 0}}
        rules={[{ validator: validateInput }]}
      >
        <Input.TextArea
          autoSize={{ minRows: 1, maxRows: 5 }} 
          placeholder="Câu trả lời của bạn" 
          style={{border: 'none', borderBottom: '1px solid #d9d9d9'}}
          onFocus={(e) => {
            e.target.style.borderBottom = '2px solid #1890ff';
            e.target.style.outline = 'none';
          }}
          onBlur={(e) => e.target.style.borderBottom = '1px solid #d9d9d9'}
        />
      </Form.Item>
    </Card>
  );
};

export default QuestionCard;