import React, { useState, useEffect } from "react";
import {
    Button, Form,
    Input, Select
} from 'antd';


const { Option } = Select;

const { TextArea } = Input;

const URL = 'https://jsonplaceholder.typicode.com/users'


function FormList() {

    const [formlist, setFormlist] = useState([])
    const [selectValues, setselectValues] = useState([])

    const getForms = async () => {
        const data = await fetch('/api/formJson')
        const res = await data.json()
        console.log(res)
        setFormlist(res)
    }

    const getDomainApi = async () => {
        const res = await fetch(URL)
        const data = await res.json()
        console.log(data)
        setselectValues(data)
    }

    const userListChange = async (id) => {
        const res = await fetch(`${URL}/${id}`)
        const data = await res.json()
        console.log(data)
    }


    const onFinish = (values) => {
        console.log('Success:', values);
    };


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        userListChange(value)
    };


    useEffect(() => {
        getForms()
        getDomainApi()
    }, [])


    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Dyanmic Form List</h2>

            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 8,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                {formlist?.fields?.map((field, index) => {
                    if ((field.type === 'text') || (field.type === 'email')) {
                        return (
                            <Form.Item
                                key={index}
                                label={field.placeholder}
                                placeholder={field.placeholder}
                                name={field.name}
                                rules={
                                    [
                                        {
                                            type: field.type === 'email' ? 'email' : null,
                                            message: field.type === 'email' ? 'The input is not valid E-mail!' : null,
                                        },
                                        {
                                            required: field.required === true ? true : null,
                                            message: field.message !== '' ? field.message : null,
                                        },
                                    ]}
                            >
                                <Input />
                            </Form.Item>
                        )
                    }
                    if ((field.type === 'select') && (field.name === 'country')) {
                        return (
                            <Form.Item
                                label={field.placeholder}
                                name={field.name}
                                rules={
                                    [
                                        {
                                            required: field.required === true ? true : null,
                                            message: field.message !== '' ? field.message : null,
                                        },
                                    ]}

                            >
                                <Select
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                    style={{
                                        width: '100%',
                                    }}
                                >

                                    {selectValues?.map((item, index) => {
                                        return (
                                            <Option
                                                key={index}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                        )
                    }

                    if (field.type === 'textarea') {
                        return (
                            <Form.Item
                                label={field.placeholder}
                                placeholder={field.placeholder}
                                name={field.name}
                                rules={
                                    [
                                        {
                                            required: field.required === true ? true : null,
                                            message: field.message !== '' ? field.message : null,
                                        },
                                    ]}

                            >
                                <TextArea rows={4} />
                            </Form.Item>
                        )
                    }
                })}
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div >
    )
}

export default FormList