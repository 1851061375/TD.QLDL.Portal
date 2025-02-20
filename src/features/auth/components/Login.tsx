import { Form, Input, Button } from 'antd'
import { ILogin } from '../models'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { GetToken } from '../redux/Actions'

export const Login = () => {
    const dispatch = useAppDispatch()
    const [form] = Form.useForm<ILogin>()
    const onFinish = async (formData: ILogin) => {
        dispatch(GetToken(formData))
    }
  return (
    <div>
        <Form form={form} name='login' onFinish={onFinish} initialValues={{userName: "", password: ""}}>
        <Form.Item name="userName" label={"Tài khoản"} hasFeedback rules={[{ required: true, message: 'Vui lòng nhập tài khoản' }]}>
                <Input></Input>
            </Form.Item>
            <Form.Item name="password" label={"Mật khẩu"} hasFeedback rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
                <Input.Password></Input.Password>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit">
                    Đăng nhập
                </Button>
            </Form.Item>
        </Form>
    </div>
  )
}
