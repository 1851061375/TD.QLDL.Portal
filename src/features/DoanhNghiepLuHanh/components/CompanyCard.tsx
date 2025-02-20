import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Typography } from 'antd';
import { Domain } from '@/data'
const { Meta } = Card;
const { Paragraph, Title } = Typography;
import './CompanyCard.scss'

const CompanyCard = (item: any) => {
  let coverUrl = item.DinhKem ? `${Domain + item.DinhKem.split(',')[0]}` : 'https://via.placeholder.com/65x65';
  let bannerUrl = item.Banner ? `${Domain + encodeURIComponent(item.Banner.split(',')[0])}` : 'https://via.placeholder.com/480x130';
  return (
    <Link to={`/don-vi-lu-hanh/doanh-nghiep/${item.ID}`}>
      <Card className="box-company">
        <div className="company-banner" >
        <div className="cover-wrapper" style={{ 
              height: '130px', 
              backgroundImage: `url(${bannerUrl})`, 
              backgroundPosition: 'center', 
              backgroundSize: 'cover', 
              backgroundRepeat: 'no-repeat' 
          }} />
          <div className="company-logo" style={{ position: "absolute", left: "15%", bottom: "-20%", transform: "translate(-50%, -50%)" }}>
            <a href="#">
              <div style={{ width: '65px',height: '65px', overflow: 'hidden', border: '1px solid #eee' }}>
                  <Image className="img-fluid"  preview={false} alt="Logo" src={coverUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </a>
          </div>
        </div>
        <div className="company-info mt-2" style={{ padding: '0 12px 12px 12px' }}>
          <Title level={5} ellipsis={{ rows: 2 }} style={{ marginBottom: 0, height: '3em', overflow: 'hidden' }}>
            <strong>{item.Ten}</strong>
          </Title>
          <div className="company-description">
            <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 0, height: '3em', overflow: 'hidden' }}>
              {item.MoTa}
            </Paragraph>
          </div>
        </div>
      </Card>
    </Link>

  );
};

export default CompanyCard;
