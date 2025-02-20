import { Card, Image, Typography } from 'antd';
import { Link } from 'react-router-dom';
const { Meta } = Card;
const { Paragraph, Title } = Typography;
import { Domain } from '@/data'

const MyItem = (item: any) => {
  let coverUrl = item.DinhKem ? `${Domain + item.DinhKem.split(',')[0]}` : 'https://via.placeholder.com/300x200';
  return (
    <Link to={`/san-pham-du-lich/${item.ID}`}>
      <Card
        hoverable
        style={{ width: '100%', maxWidth: 300 }}
        cover={
          <div style={{ height: '200px', overflow: 'hidden' }}>
            <Image preview={false} alt="example" src={coverUrl} style={{ height: '100%', objectFit: 'cover' }} />
          </div>
        }
      >
        <Meta
          style={{ padding: '12px' }}
          description={
            <>
              <Title level={5} ellipsis={{ rows: 2 }} style={{ marginBottom: 0, height: '3em', overflow: 'hidden' }}>
                <strong>{item.Ten}</strong>
              </Title>
              <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 0, height: '3em', overflow: 'hidden' }}>
                {item.MoTa}
              </Paragraph>
              <Paragraph strong>{item.Gia?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Paragraph>
            </>
          }
        />
      </Card>
    </Link>

  );
};

export default MyItem;
