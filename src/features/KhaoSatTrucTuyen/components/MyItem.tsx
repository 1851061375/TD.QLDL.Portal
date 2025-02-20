import { Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
const { Meta } = Card;
const { Text, Paragraph, Title } = Typography;
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';

const MyItem = (item: any) => {
  return (
    <Link to={`/khac/khao-sat-truc-tuyen/${item.ID}`}>
      <Card
        hoverable
        style={{ width: '100%' }}
      >
        <Meta
          style={{ padding: '0 12px 12px 12px' }}
          description={
            <>
              <Title level={5} ellipsis={{ rows: 1 }} style={{ marginBottom: 1, overflow: 'hidden' }}>
                <strong>{item.Ten}</strong>
              </Title>
              <ul className='d-flex list-unstyled justify-content-between mb-2'>
                <li style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.8rem' }}>
                    <UserOutlined />
                    <span className='ms-2'>{item.NguoiThucHien}</span>
                  </div>
                </li>
                <li style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.8rem' }}>
                    <CalendarOutlined />
                    <span className='ms-2'>{new Date(item.ThoiGianBD).toLocaleDateString('vi-VN')} - {new Date(item.ThoiGianKT).toLocaleDateString('vi-VN')}</span>
                  </div>
                </li>
              </ul>
              <Paragraph ellipsis={{ rows: 2 }} style={{ height: '3em', overflow: 'hidden' }}>
                {item.NoiDung}
              </Paragraph>

            </>
          }
        />
      </Card>
    </Link>
  );
};

export default MyItem;