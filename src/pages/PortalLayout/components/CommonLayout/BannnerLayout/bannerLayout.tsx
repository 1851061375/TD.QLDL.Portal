import './bannnerLayout.scss'
import { Menu, Row, Col } from 'antd'

const imgQuocHuy = new URL('/images/logo-quyhoach-DB_quochuy.png', import.meta.url).href
const imgLogoText = new URL('/images/logo-quyhoach-DB_text.svg', import.meta.url).href

function BannerLayout() {
    return (
        <> 
            <div className="header">
                <div className="container">
                    <a href="/" className="logo-head d-flex align-items-center" rel="noopener noreferrer">
                        <img src={imgQuocHuy} alt="" />
                        <img src={imgLogoText} alt="" className="img-fluid" />
                    </a>
                </div>
            </div>
        </>
     )
}

export default BannerLayout;