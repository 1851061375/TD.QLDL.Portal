import { Breadcrumb } from "antd";

//TODO: create context and using redirect or Link from react-router-dom
export const AntdBreadCrumb = () => {
  return (
    <Breadcrumb style={{ margin: '16px 0', paddingInline:30}}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
    </Breadcrumb>
  )
}
