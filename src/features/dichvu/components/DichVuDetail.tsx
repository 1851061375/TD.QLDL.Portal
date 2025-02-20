import { Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { IDichVu } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { SearchLoaiDichVu } from "../../loaidichvu/redux/action"
import { AddDichVu, GetDichVu, UpdateDichVu } from "../redux/action"
import { useDichVuContext } from "../contexts/DichVuContext"

export const DichVuDetail = () => {
    const dispatch = useAppDispatch()
    const { data: dichVu, datas: dichVus } = useAppSelector(state => state.dichvu)
    const { datas: loaiDichVus, loading } = useAppSelector(state => state.loaidichvu)
    const dichVuContext = useDichVuContext()
    const [form] = Form.useForm<IDichVu>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (dichVuContext?.dichVuId) {
            dispatch(UpdateDichVu({ id: dichVuContext.dichVuId, data: { ...formData,} }))
        } else {
            dispatch(AddDichVu({ ...formData}))
        }
        form.resetFields()
    }
    const handleCancel = () => {
        form.resetFields();
        dichVuContext.setDichVuModalVisible(false)
        dichVuContext.setDichVuId(undefined)
    };
    useEffect(() => {
        if (dichVuContext.dichVuId) {
            dispatch(GetDichVu(dichVuContext.dichVuId))
        }
    }, [dichVuContext.dichVuId])

    useEffect(() => {
        if (dichVu) {
            form.setFieldsValue({ ...dichVu, loaiDichVuId: dichVu.loaiDichVu.id })
        }
    }, [dichVu])

    useEffect(() => {
        if (!loaiDichVus?.length && !loading) {
            dispatch(SearchLoaiDichVu({}))
        }
    }, [])

    return (
        <AntdModal title="Thêm mới dịch vụ" visible={dichVuContext.dichVuModalVisible} handlerCancel={handleCancel} footer={null}>
        <Form name='dichvu' layout="vertical" onFinish={onFinish} form={form} requiredMark={dichVuContext.dichVuId === null} initialValues={{ thuTu: 1 }}>
            <Row gutter={[8, 8]}>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Tên dịch vụ"
                        name="tenDichVu"
                        rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Tóm tắt"
                        name="tomTat"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Thứ tự hiển thị"
                        name="thuTu"
                        rules={[{ required: true, message: 'Vui lòng nhập thứ tự hiển thị' }]}
                    >
                        <InputNumber min={1} />
                    </Form.Item>
                </Col>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Ảnh đại diện"
                        name="imageUrl"
                    >
                        <AntdUpLoad formInstance={form} folderName="DichVu" fieldName="imageUrl" accept="image/png, image/jpeg" listType="picture"/>
                    </Form.Item>
                </Col>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Tên dịch vụ cha"
                        name="maDichVuCha"
                    >
                        <AntdSelect  generateOptions={{model:dichVus, label: "tenDichVu", value: "id"}}/>
                    </Form.Item>
                </Col>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Loại dịch vụ"
                        name="loaiDichVuId"
                        rules={[{ required: true, message: 'Vui lòng chọn loại dịch vụ' }]}
                    >
                        <AntdSelect generateOptions={{model:loaiDichVus, label: "tenLoaiDichVu", value: "id"}}/>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Space >
                    <AntdButton type="primary" onClick={onFinish}>
                        Xác nhận
                    </AntdButton>
                    <AntdButton type="default" onClick={handleCancel}>
                        Đóng
                    </AntdButton>
                </Space>
            </Form.Item>
        </Form>
        </AntdModal>
    )
}