import { Link } from 'react-router-dom'
import './navbarLayout.scss'
import {
    HomeOutlined,
    LogoutOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Menu, Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'
import { primaryRoutes } from "@/services";
import Cookies from "js-cookie"
const itemsMenu = [
    {
        label: (
            <Link to={primaryRoutes.portal.home.path}>
            </Link>
        ),
        key: primaryRoutes.portal.home.path,
        icon: <HomeOutlined />
    },
    {
        label: (
            <Link to="#">
                Đơn vị lữ hành
            </Link>
        ),
        key: 'don-vi-lu-hanh',
        children: [
            {
                label: (
                    <Link to={primaryRoutes.portal.doanhnghiep.path}>
                        {primaryRoutes.portal.doanhnghiep.menuName}
                    </Link>
                ),
                key: primaryRoutes.portal.doanhnghiep.path,
            },
            {
                label: (
                    <Link to={primaryRoutes.portal.sanpham.path}>
                        {primaryRoutes.portal.sanpham.menuName}
                    </Link>
                ),
                key: primaryRoutes.portal.sanpham.path,
            },
            {
                label: (
                    <Link to={primaryRoutes.portal.dichvu.path}>
                        {primaryRoutes.portal.dichvu.menuName}
                    </Link>
                ),
                key: primaryRoutes.portal.dichvu.path,
            }
        ]
    },
    {
        label: (
            <Link to="#">
                Tài nguyên du lịch
            </Link>
        ),
        key: 'tai-nguyen-du-lich',
        children: [
            {
                label: (
                    <Link to={primaryRoutes.portal.cosoluutru.path}>
                        {primaryRoutes.portal.cosoluutru.menuName}
                    </Link>
                ),
                key: primaryRoutes.portal.cosoluutru.path,
            },
            // {
            //     label: (
            //         <Link to={primaryRoutes.portal.cuahangluuniem.path}>
            //             {primaryRoutes.portal.cuahangluuniem.menuName}
            //         </Link>
            //     ),
            //     key: primaryRoutes.portal.cuahangluuniem.path,
            // },
            {
                label: (
                    <Link to={primaryRoutes.portal.danhlamthangcanh.path}>
                        {primaryRoutes.portal.danhlamthangcanh.menuName}
                    </Link>
                ),
                key: primaryRoutes.portal.danhlamthangcanh.path,
            },
            {
                label: (
                    <Link to={primaryRoutes.portal.ditichlichsu.path}>
                        {primaryRoutes.portal.ditichlichsu.menuName}
                    </Link>
                ),
                key: primaryRoutes.portal.ditichlichsu.path,
            },
            {
                label: (
                    <Link to={primaryRoutes.portal.khudiemdulich.path}>
                        {primaryRoutes.portal.khudiemdulich.menuName}
                    </Link>
                ),
                key: primaryRoutes.portal.khudiemdulich.path,
            }
        ]
    },
    {
        label: (
            <Link to={primaryRoutes.portal.huongdanvien.path}>
                {primaryRoutes.portal.huongdanvien.menuName}
            </Link>
        ),
        key: primaryRoutes.portal.huongdanvien.path,
    },
    {
        label: (
            <Link to={primaryRoutes.portal.sanphamdulich.path}>
                {primaryRoutes.portal.sanphamdulich.menuName}
            </Link>
        ),
        key: primaryRoutes.portal.sanphamdulich.path,
    },
    {
        label: (
            <Link to="#">
                Khác
            </Link>
        ),
        key: 'khac',
        children: [
            {
                label: (
                    <Link to={primaryRoutes.portal.khaosattructuyen.path}>
                        {primaryRoutes.portal.khaosattructuyen.menuName}
                    </Link>
                ),
                key: primaryRoutes.portal.khaosattructuyen.path,
            },
            {
                label: (
                    <Link to={primaryRoutes.portal.quyhoachdulich.path}>
                        {primaryRoutes.portal.quyhoachdulich.menuName}
                    </Link>
                ),
                key: primaryRoutes.portal.quyhoachdulich.path,
            }
        ]
    },
];


function NavbarLayout() {
    const [token, setToken] = useState('');
    const [hrefBtnDangNhap, setHrefBtnDangNhap] = useState('/_forms/default.aspx');

    useEffect(() => {
        // Lấy tất cả cookies và chia thành mảng các cặp key-value
        const cookies = document.cookie.split(';')?.map(cookie => cookie.split('='));
        // Tìm cookie có key là 'token'
        const tokenCookie = cookies.find(cookie => cookie[0].trim() === 'token');
        // Nếu tồn tại cookie 'token', lấy giá trị của nó
        if (tokenCookie) {
            setToken(tokenCookie[1]);
        }
        else {
            Cookies.remove('FedAuth');
            setHrefBtnDangNhap('/_forms/default.aspx');
        }
    }, []);
    if (token) {
        var decodeToken = jwtDecode(token).sub
    }
    const handleLogout = () => {
        Cookies.remove('FedAuth');
        Cookies.remove('token');
        window.location.href = '/_layouts/closeConnection.aspx?loginasanotheruser=true';
        setToken('');
    }

    useEffect(() => {
        if (token) {
            setHrefBtnDangNhap('/sites/qldl/SitePages/default.aspx');
        }
        else {
            Cookies.remove('FedAuth');
            setHrefBtnDangNhap('/_forms/default.aspx');
        }
    });

    return (
        <>
            <div className="navbar-default">
                <div className="container">
                    <Row className="navbar-row align-items-center">
                        <Col flex="1 0 0%" className="navbar">
                            <Menu mode="horizontal" items={itemsMenu} defaultSelectedKeys={['1']} className="col" />
                        </Col>
                        <Col flex="0 0 auto">
                            <div className="statusLogin">
                                <div className="logined">
                                </div>
                                <div className="unlogin">
                                    <div className="login item_navbar">
                                        {token ?
                                            <div className="dropdown">
                                                <a className='dropbtn' href="/sites/qldl/SitePages/default.aspx"><UserOutlined /><span style={{ marginLeft: '5px' }}>{decodeToken} | Quản trị</span></a>
                                                <div className="dropdown-content text-center">
                                                    <a style={{ color: '#2C62B9' }} onClick={handleLogout} href="#">Đăng Xuất</a>
                                                </div>
                                            </div>
                                            :
                                            <a href={hrefBtnDangNhap}><UserOutlined /><span style={{ marginLeft: '5px' }}>Đăng nhập</span></a>

                                        }
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default NavbarLayout;