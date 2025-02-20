import { MenuProps } from "antd/es/menu";
import { AppstoreOutlined, MailOutlined, SettingOutlined, PieChartOutlined, DesktopOutlined, ContainerOutlined } from '@ant-design/icons';
import { primaryRoutes } from "@/services";

export const HEADER_MENU: MenuProps['items'] = [
    {
      label: 'Navigation One',
      key: 'mail',
      icon: <MailOutlined />,
    },
    {
      label: 'Navigation Two',
      key: 'app',
      icon: <AppstoreOutlined />,
      disabled: true,
    },
    {
      label: 'Navigation Three - Submenu',
      key: 'SubMenu',
      icon: <SettingOutlined />,
      children: [
        {
          type: 'group',
          label: 'Item 1',
          children: [
            {
              label: 'Option 1',
              key: 'setting:1',
            },
            {
              label: 'Option 2',
              key: 'setting:2',
            },
          ],
        },
        {
          type: 'group',
          label: 'Item 2',
          children: [
            {
              label: 'Option 3',
              key: 'setting:3',
            },
            {
              label: 'Option 4',
              key: 'setting:4',
            },
          ],
        },
      ],
    },
    {
      label: (
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      ),
      key: 'alipay',
    },
];
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
  title?: string,
): MenuItem {
  return {
    title,
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export const SIDER_MENU : MenuProps['items'] = [
  getItem('Dịch vụ', primaryRoutes.admin.dichVu.root, <PieChartOutlined />),
  getItem('Loại dịch vụ', primaryRoutes.admin.loaiDichVu.root, <DesktopOutlined />),
  getItem('Cơ cấu tổ chức', primaryRoutes.admin.coCauToChuc.root, <ContainerOutlined />),

  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
  ]),

  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),

    getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  ]),
]