
import React from "react";
import { FC, useEffect, useState, useCallback, useMemo } from "react";
import { Domain } from '@/data'
import { Card, Avatar, Typography, Table } from "antd";
import { splitNumber, formatDate } from "@/utils";
import './MyItem.scss';

const { Title, Text } = Typography;


const MyItem = (item: any) => {
  const [color, setColor] = useState('#ea0c8b')
  useEffect(() => {
    setColor(item.LoaiTheText == "Nội địa" ? '#ea0c8b' :
      item.LoaiTheText == "Tại điểm" ? "#f05b32" : '#3361b6')
  }, [item]);
  let coverUrl = item.DinhKem ? `${Domain + item.DinhKem.split(',')[0]}` : 'https://via.placeholder.com/90x120';
  return (
    <Card className="card-custom mt-5"
      style={{
        border: `2px solid ${color}`
      }}>
      <div className="card-header-custom" style={{ backgroundColor: color }}>
        <Title level={5} style={{ color: 'white' }}>TỔNG CỤC DU LỊCH</Title>
        <Title className="mt-2" level={5} style={{ color: 'white' }}>VIETNAM NATIONAL ADMINISTRATION OF TOURISM</Title>
      </div>
      <div className="card-body-custom">
        <Avatar style={{ width: '90px', height: '120px' }} shape="square" size={80} src={coverUrl} className="profile-placeholder">Ảnh</Avatar>
        <div className="info-custom">
          <Title level={5} className="text-center mb-2">THẺ HƯỚNG DẪN VIÊN DU LỊCH {item?.LoaiTheText?.toUpperCase()}</Title>
          {/* <Title level={5} className="text-center mt-0">DOMESTIC TOUR GUIDE LICENCE</Title> */}
          <table className="table table-bordered custom-table">
            <tbody>
              <tr>
                <td>
                  <Text strong>Họ và tên: </Text>
                  {item?.HoTen}
                </td>
                <td>
                  <Text strong>Điện thoại: </Text>
                  {item?.DienThoai?.replace('(+84)', '0')}
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Text strong>Ngoại ngữ: </Text>
                  {item?.NgoaiNguText}
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Text strong>Nơi cấp thẻ: </Text>
                  {item?.NoiCapThe}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="valid-to-custom">
        <Text strong >Giá trị đến: </Text>{formatDate(item?.NgayHetHan)}<br />
        {/* <Text >Valid to</Text> */}
      </div>
      <div className="trapezoid" style={{ borderBottom: `30px solid ${color}` }}>
        <span>{splitNumber(item?.SoThe)}</span>
      </div>
    </Card>
  );
};

export default MyItem;
