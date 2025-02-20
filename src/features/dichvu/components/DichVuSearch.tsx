import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton } from "../../../lib/antd/components"
import { useAppDispatch } from "../../../lib/redux/Hooks"
import { IDichVu, ISearchDichVu } from "../models"
import { useCallback } from "react"
import { DichVuDetail } from "./DichVuDetail"
import { useDichVuContext } from "../contexts/DichVuContext"

export const DichVuSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchDichVu>> }) => {
  const dichVuContext = useDichVuContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchDichVu) => {
    console.log(values);
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 0, pageSize: 10, reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => {dichVuContext.setDichVuModalVisible(true)}}>Thêm mới</AntdButton>]}
    >
      <Form name='dichVuSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Tên dịch vụ"
          name="title"
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Row justify="space-around">
            <Space size="large">
              <AntdButton type="primary" htmlType="submit" >
                Xác nhận
              </AntdButton>
              <AntdButton type="default" onClick={resetSearchParams}>
                tải lại
              </AntdButton>
            </Space>
          </Row>
        </Form.Item>
      </Form>
    </CollapseContent>
  )
}