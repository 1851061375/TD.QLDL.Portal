import { Form, Input, Row, Space } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton } from "../../../lib/antd/components"
import { useAppDispatch } from "../../../lib/redux/Hooks"
import { ISearchLoaiDichVu } from "../models"
import { useCallback } from "react"
import { LoaiDichVuDetail } from "./LoaiDichVuDetail"
import { useLoaiDichVuContext } from "../contexts/LoaiDichVuContext"

export const LoaiDichVuSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchLoaiDichVu>> }) => {
  const loaiDichVuContext = useLoaiDichVuContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchLoaiDichVu) => {
    console.log(values);
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 10 })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => loaiDichVuContext.setLoaiDichVuModalVisible(true)}>Thêm mới</AntdButton>]}
    >
      <Form name='loaiDichVuSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Tên loại dịch vụ"
          name="tenLoaiDichVu"
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