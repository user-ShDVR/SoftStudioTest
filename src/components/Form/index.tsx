import { FC } from 'react'
import {
    Button,
    Checkbox,
    Form,
    Input,
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';

interface MainFormProps {
}

export const MainForm: FC<MainFormProps> = () => {

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const pattern = /^!*([0-9]!*){10,10}$/g;

    const onFinish = (values: unknown) => {
        console.log('Received values of form: ', values);
        navigate("/todo");
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
          +7
        </Form.Item>
      );

    

    return (
        <Form
            form={form}
            name="Экран 1"
            onFinish={onFinish}
            style={{ width: 400 }}
            layout="vertical"
        >
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'Этот E-mail не действителен!',
                    },
                    {
                        required: true,
                        message: 'Пожалуйста введите свой E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Пароль"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите пароль!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Подтверждение пароля"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста подтвердите пароль!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Пароли не совпадают!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="namme"
                label="Имя"
                rules={[{ required: true, message: 'Пожалуйста введите имя!', whitespace: true }]}
            >
                <Input />
            </Form.Item>


            <Form.Item
                name="phone"
                label="Номер телефона"
                rules={[{ required: true, message: 'Пожалуйста введите номер телефона!' },
                { pattern, message: 'Номер указан не в правильном формате!' },]}
            >
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Подтвердите прочтение соглашения')),
                    },
                ]}
            >
                <Checkbox>
                    Я прочитал <Link to={'/todo'}>agreement</Link>
                </Checkbox>
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Переход к ToDo
                </Button>
            </Form.Item>
        </Form>
    )
}