import { Col, Form, Input, InputNumber, Row, SelectProps, Space } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { ILoaiDichVu, ISearchLoaiDichVu } from "../models"
import { useEffect } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { AddLoaiDichVu, GetLoaiDichVu, UpdateLoaiDichVu } from "../redux/action"
import { useLoaiDichVuContext } from "../contexts/LoaiDichVuContext"

const LINKTYPE_OPTIONS :SelectProps["options"] = [{
    label: "Trang hiện tại",
    value: "hien-tai"
}, {
    label: "Trang chi tiết",
    value: "chi-tiet"
}]

export const LoaiDichVuDetail = () => {
    const dispatch = useAppDispatch()
    const { data: loaiDichVus } = useAppSelector(state => state.loaidichvu)
    const loaiDichVuContext = useLoaiDichVuContext()
    const [form] = Form.useForm<ILoaiDichVu>()
    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (loaiDichVuContext?.loaidichVuId) {
            dispatch(UpdateLoaiDichVu({ id: loaiDichVuContext.loaidichVuId, data: formData }))
        } else {
            dispatch(AddLoaiDichVu(formData))
        }
        form.resetFields()
    }
    const handleCancel = () => {
        form.resetFields();
        loaiDichVuContext.setLoaiDichVuId(undefined)
        loaiDichVuContext.setLoaiDichVuModalVisible(false)
    };
    useEffect(() => {
        if (loaiDichVuContext.loaidichVuId) {
            dispatch(GetLoaiDichVu(loaiDichVuContext.loaidichVuId))
        }
        
    }, [loaiDichVuContext.loaidichVuId])

    useEffect(() => {
        if (loaiDichVus) {
            form.setFieldsValue(loaiDichVus)
        }
    }, [loaiDichVus])

    return (
        <AntdModal visible={loaiDichVuContext.loaiDichVuModalVisible} title="Thêm mới loại dịch vụ" handlerCancel={handleCancel}>
        <Form name='dichvu' layout="vertical" form={form}>
            <Row gutter={[8, 8]}>
                <Col span={18}>
                    <Form.Item
                        label="Tên loại dịch vụ"
                        name="tenLoaiDichVu"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        label="Thứ tự"
                        name="thuTu"
                    >
                        <InputNumber min={1} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Liên kết tới"
                        name="linkTo"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Loại liên kết"
                        name="linkType"
                    >
                        <AntdSelect options={LINKTYPE_OPTIONS} defaultValue={"hien-tai"}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Ảnh"
                        name="imageUrl"
                    >
                        <AntdUpLoad formInstance={form} folderName="LoaiDichVu" fieldName="imageUrl" accept="image/png, image/jpeg" listType="picture"/>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Space >
                    <AntdButton type="primary" onClick={onFinish} >
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