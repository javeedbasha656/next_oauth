import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, 
    Popconfirm, Table, Typography, message } from 'antd';




// const originData = [];
// for (let i = 0; i < 100; i++) {
//     originData.push({
//         key: i.toString(),
//         name: `Edrward ${i}`,
//         age: 32,
//         address: `London Park no. ${i}`,
//     });
// }

const URL = 'https://jsonplaceholder.typicode.com/users'

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            type: dataIndex === 'email' ? 'email' : null,
                            message: dataIndex === 'email' ? 'The input is not valid E-mail!' : null,
                        },
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const EditTable = () => {
    const [form] = Form.useForm();

    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');


    const getDomainApi = async () => {
        const res = await fetch(URL)
        const data = await res.json()
        console.log(data)
        setData(data)
    }


    useEffect(() => {
        getDomainApi()
    }, [])

    const isEditing = (record) => record.id === editingKey;
    // console.log(isEditing)

    const edit = (record) => {
        console.log('old Data:', record)
        form.setFieldsValue({
            name: '',
            phone: '',
            email: '',
            username: '',
            website: '',
            ...record,
        });
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (id) => {
        console.log(id)
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => id === item.id);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                const UpdatedData = newData[index]
                console.log('Updated Data:', UpdatedData)
                message.success(`Id ${id} has been successfully updates`)
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: '25%',
            editable: true,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            width: '25%',
            editable: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '25%',
            editable: true,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            width: '25%',
            editable: true,
        },
        {
            title: 'Website Link',
            dataIndex: 'website',
            width: '25%',
            editable: false,
        },
        {
            title: 'Actions',
            // dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Button
                            onClick={() => save(record.id)}
                            style={{
                                marginRight: 8,
                            }}
                            htmlType="submit"
                            type="link"
                        >
                            Save
                        </Button>
                        <Popconfirm
                            title="Sure to cancel?"
                            onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Button disabled={editingKey !== ''}
                        type="link"
                        onClick={() => edit(record)}>
                        Edit
                    </Button>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'phone' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const onFinish = (values) => {
        save(values)
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
};
export default EditTable;