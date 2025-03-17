import { useEffect, useState } from 'react'
import { Row, Col, Input, Carousel, Typography, Divider, List, Spin } from 'antd'
import './index.scss'
import { default as DoanhNghiepLuHanhItem } from "../../DoanhNghiepLuHanh/components/CompanyCard"
import { default as KhaoSatItem } from "../../KhaoSatTrucTuyen/components/MyItem"
import { requestGET } from "@/utils/baseAPI";
import { useNavigate } from "react-router-dom";
import { SearchProvider } from './SearchContext'
import { ChartTaiNguyenDuLich } from '@/features/Chart/ChartTaiNguyenDuLich'
import AnhDepDienBien from '@/features/AnhDepDienBien/AnhDepDienBien'


const { Title } = Typography;

const fetchData = async (
) => {
  const res = await requestGET(`doanhnghiepluhanhs`);
  return res;
};

const fetchDataKhaoSat = async (
) => {
  const res = await requestGET(`khaosattructuyens`);
  return res;
};


export const TrangChu = () => {
  let navigate = useNavigate();
  const [state, setState] = useState({
    doanhnghiepluhanh: [],
    khaosat: [],
    loadingDoanhNghiep: true,
    loadingKhaoSat: true
  });

  useEffect(() => {
    const fetch = async () => {
      setState(prevState => ({ ...prevState, loadingDoanhNghiep: true }));
      const res = await fetchData();
      setState(prevState => ({ ...prevState, doanhnghiepluhanh: res?.data ?? [], loadingDoanhNghiep: false }));
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      setState(prevState => ({ ...prevState, loadingKhaoSat: true }));
      const res = await fetchDataKhaoSat();
      setState(prevState => ({ ...prevState, khaosat: res?.data ?? [], loadingKhaoSat: false }));
    };
    fetch();
  }, []);


  return (
    <>

      <div className="container py-4">
        <div className="header-image"></div>
        <Title level={4}>Doanh nghiệp lữ hành</Title>
        <Spin spinning={state.loadingDoanhNghiep} tip="Loading..." style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          <Row gutter={[24, 24]}>
            <Col md={24} xl={24} span={24}>
              {state.doanhnghiepluhanh.length > 0 &&
                <Carousel
                  style={{ marginBottom: '24px' }}
                  arrows
                  autoplay
                  slidesToShow={3}>
                  {state.doanhnghiepluhanh.map((item: any, key: any) => {
                    return (
                      <div key={key} style={{ padding: '0 10px' }}>
                        <div style={{ margin: '0 auto', width: 'calc(100% - 20px)' }}>
                          <DoanhNghiepLuHanhItem {...item} />
                        </div>
                      </div>
                    )
                  })}
                </Carousel>
              }

            </Col>


          </Row>
        </Spin>

        <Divider />

        <Row gutter={[24, 24]}>
          <Col md={18} xl={17} span={24}>
            <div className='d-flex'>
              <Title level={4}>Khảo sát trực tuyến</Title>
              <a href='#' onClick={(e) => {
                e.preventDefault(),
                  navigate("/khac/khao-sat-truc-tuyen")
              }
              } style={{ marginLeft: 'auto' }}>Xem tất cả</a>
            </div>
            <Spin spinning={state.loadingKhaoSat} tip="Loading..." style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}>
              {state.khaosat.length > 0 &&
                <List
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 1,
                    md: 1,
                    lg: 1,
                    xl: 1,
                    xxl: 1,
                  }}
                  dataSource={state.khaosat.slice(0, 3)}
                  renderItem={(item: any) => (
                    <List.Item>
                      <KhaoSatItem {...item} />
                    </List.Item>
                  )}
                />
              }

            </Spin>
          </Col>
          <Col md={6} xl={7} span={24}>
            <ChartTaiNguyenDuLich />
          </Col>
        </Row>

        <Divider />
        <Title level={4}>Vẻ đẹp Điện Biên</Title>
        <AnhDepDienBien />
      </div >

    </>
  );

};

const TrangChuWrapper = () => (<SearchProvider>
  <TrangChu />
</SearchProvider>)
export default TrangChuWrapper 