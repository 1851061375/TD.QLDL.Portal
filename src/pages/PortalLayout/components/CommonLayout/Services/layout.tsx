import { Layout } from "antd";
import "./layout.scss"
import BannerLayout from "../BannnerLayout/bannerLayout";
import NavbarLayout from "../NavbarLayout/navbarLayout";
import FooterLayout from "../FooterLayout/footerLayout";


interface IAntdLayoutProps {
    children: React.ReactElement;
}

const PortalLayout = ({ children }: IAntdLayoutProps) => {
    return (
      <div className="main-layout">
        <BannerLayout />
        <NavbarLayout />
        <div className="container-fluid" style={{paddingInline:0}}>
          {children}
        </div>
        <FooterLayout />
      </div>
    );
  };
  
  export default PortalLayout;