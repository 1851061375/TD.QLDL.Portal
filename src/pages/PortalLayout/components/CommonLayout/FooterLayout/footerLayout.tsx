import "./footerLayout.scss"
import { requestDELETE } from "@/utils/baseAPI";
import { FC, useEffect, useState } from "react";



function FooterLayout() {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({} as any)


    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setLoading(true);
    //             const res = await requestGET2(
    //                 `GetFooters`,
    //             );
    //             console.log(res?.data)
    //             setData(res.data ?? {});
    //             setLoading(false);

    //         } catch (error) {
    //             setLoading(false);
    //         }
    //     };
    //     fetchData();
    //     return () => { };
    // }, []

    // );

    return (
        <footer className="site-footer">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <h6>Thông tin về Sở Văn hóa, Thể thao và Du lịch</h6>
                        <p className="text-justify">
                            Cổng thông tin điện tử tổng hợp Sở Văn hóa, Thể thao và Du lịch<br />
                            Chịu trách nhiệm nội dung: Ông Phùng Bảo Lâm - Giám đốc Sở Văn hóa, Thể thao và Du lịch<br />
                            Giấy phép thiết lập Trang TTĐT tổng hợp trên mạng số 238/GP-STTTT do Sở Thông tin và Truyền thông cấp ngày 18 tháng 02 năm 2022
                        </p>
                    </div>

                    <div className="col-xs-6 col-md-3">
                        <h6>Liên hệ</h6>
                        <ul className="footer-links">
                            <li>Địa chỉ: 175 Tây Sơn - Đống Đa - Hà Nội -</li>
                            <li>Điện thoại: 0215.123.321 (Văn phòng) - 0215.456.789 (Ban Quản trị)</li>
                            <li>Email: <a href="mailto:svhttdldienbien@gmail.com">svhttdld@gmail.com</a></li>
                        </ul>
                    </div>

                    <div className="col-xs-6 col-md-3">
                        <h6>Chính sách</h6>
                        <ul className="footer-links">
                            <li>Chỉ được phát hành lại thông tin từ website này khi có sự đồng ý bằng văn bản của Sở Văn hóa, Thể thao và Du lịch</li>
                        </ul>
                    </div>
                </div>
                <hr />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-sm-6 col-xs-12">
                        <p className="copyright-text">
                            &copy; {new Date().getFullYear()} All Rights Reserved by
                            <a href="#"> Sở Văn hóa, Thể thao và Du lịch</a>.
                        </p>
                    </div>

                    {/* <div className="col-md-4 col-sm-6 col-xs-12">
                        <ul className="social-icons">
                            <li><a className="facebook" href="#"><i className="fa fa-facebook"></i></a></li>
                            <li><a className="twitter" href="#"><i className="fa fa-twitter"></i></a></li>
                            <li><a className="linkedin" href="#"><i className="fa fa-linkedin"></i></a></li>
                        </ul>
                    </div> */}
                </div>
            </div>
        </footer>
    );
}

export default FooterLayout;