import { useState, useRef, useEffect } from 'react'
import { Layout, Menu, theme, Button } from 'antd'
import { HEADER_MENU, SIDER_MENU, SIDER_MENU_WIDTH } from '../../../../data'
import { useLocation, useNavigate } from 'react-router-dom'
import { AntdBreadCrumb } from '../breadcrumb/BreadCrumb'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { MenuProps } from "antd/es/menu"

const { Header, Content, Footer, Sider } = Layout

interface IAntdLayoutProps {
  children: React.ReactElement,
  headerFixed?: boolean,
  siderFixed?: boolean,
  siderWrapperWidth?: string,
  menuTheme?: MenuProps["theme"]
}

export const AntdLayout = ({children, headerFixed = true, siderFixed = true, siderWrapperWidth = SIDER_MENU_WIDTH, menuTheme= 'dark'} : IAntdLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const siderRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const [siderWidth, setSiderWidth] = useState<string | undefined>(siderWrapperWidth)
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  //https://stackoverflow.com/questions/71971631/how-to-wait-for-dom-commit-in-react
  useEffect(() => {
    setTimeout(() => {
      setSiderWidth(collapsed ? siderRef.current?.style.width : siderWrapperWidth)
    }, 0)
  }, [collapsed])


  return (
    <Layout className='main-layout'>
      <Sider ref={siderRef} width={siderWidth} trigger={null} collapsible collapsed={collapsed} onCollapse={setCollapsed} 
      className={siderFixed ? `layout-sider-fixed` : ''}>
        <div style={{ height: 32, margin: 16, background: 'gray', borderRadius: 6 }}>
        </div>

        <Menu
          mode="inline"
          theme={menuTheme}
          defaultSelectedKeys={[location.pathname]}
          style={{ height: '100%', borderRight: 0 }}
          onClick={(e) => navigate(e.key)}
          items={SIDER_MENU}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? siderWidth : siderWrapperWidth }} className='layout-collapse-marginleft-animate'>
        <Header className={headerFixed ? `layout-header-sticky` : ''}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              color: "white"
            }}
          />
          <Menu
            theme={menuTheme}
            style={{ width: '100%' }}
            mode="horizontal"
            // defaultSelectedKeys={['2']}
            items={HEADER_MENU}
            onClick={(e) => navigate(e.key)}
          />
        </Header>
        <Layout>
          <AntdBreadCrumb />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
