import './bannnerLayout.scss'
import { Menu, Row, Col } from 'antd'

const imgQuocHuy = new URL('/images/viettel.png', import.meta.url).href
const imgLogoText = new URL('/images/logo-quyhoach-DB_text.svg', import.meta.url).href

function BannerLayout() {
    return (
        <>
            <div className="header">
                <div className="container">
                    <a href="/" className="logo-head d-flex align-items-center" rel="noopener noreferrer">
                        <img
                            style={{ width: '88px', height: '88px', borderRadius: '50%', objectFit: 'cover' }}
                            src={imgQuocHuy} alt="" />
                        <img src={imgLogoText} alt="" className="img-fluid" />
                    </a>
                </div>
            </div>
        </>
    )
}

export default BannerLayout;