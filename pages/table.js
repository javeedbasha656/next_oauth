import React, { useEffect, useState, useRef } from 'react';
import {
    Button,
    Table,
    Form,
    Input
} from 'antd';
import {
    CloseCircleOutlined
} from '@ant-design/icons';
import Papa from 'papaparse';

const URL = 'https://jsonplaceholder.typicode.com/users'

function CustomEditTable() {

    const [dataSource, setDataSource] = useState([]);
    const [editingRow, setEditingRow] = useState(0);
    const [file, setFile] = useState([])
    const [parsedCsvData, setParsedCsvData] = useState([]);
    const ref = useRef();


    const [form] = Form.useForm();

    const getDomainApi = async () => {
        const res = await fetch(URL)
        const data = await res.json()
        console.log(data)
        setDataSource(data)
    }


    useEffect(() => {
        getDomainApi()
    }, [])

    const parseFile = (file) => {
        if (!file) {
            return setParsedCsvData([]);
        }
        Papa.parse(file, {
            header: true,
            error: (err, file, reason) => {
                // console.log(err, file, reason)
            },
            complete: results => {
                // console.log(results)
                setParsedCsvData(results.data)
            },
        });
    };

    const handleUpload = (e) => {
        // console.log(e.target.files)
        const fileObj = e.target.files && e.target.files[0];
        if (!fileObj) {
            return
        }
        console.log(fileObj)
        setFile(fileObj)
        parseFile(fileObj)
    }

    const reset = () => {
        ref.current.value = "";
        // setShow(false)
    };


    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            render: (text, record) => {
                // console.log(editingRow)
                // console.log(record.id)
                // let rec = record.id - 1;
                // let row = editingRow - 1
                if (editingRow === record.id) {
                    console.log("Edit Row Id: ", editingRow, "Click Id:", record.id)
                    return (
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your name",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    );
                } else {
                    return <p>{text}</p>;
                }
            },
        },
        {
            title: "Phone",
            dataIndex: "phone",
            render: (text, record) => {
                // let rec = record.id - 1;
                // let row = editingRow - 1
                if (editingRow === record.id) {
                    console.log("Edit Row Id: ", editingRow, "Click Id:", record.id)
                    return (
                        <Form.Item name="phone">
                            <Input />
                        </Form.Item>
                    );
                } else {
                    return <p>{text}</p>;
                }
            },
        },
        {
            title: "Actions",
            render: (_, record) => {
                return (
                    <>
                        <Button
                            type="link"
                            onClick={() => {
                                setEditingRow(record.id);
                                form.setFieldsValue({
                                    name: record.name,
                                    phone: record.phone,
                                });
                            }}
                        >
                            Edit
                        </Button>
                        <Button type="link" htmlType="submit">
                            Save
                        </Button>
                    </>
                );
            },
        },
    ];

    const onFinish = (values) => {
        console.log(values)
        const updatedDataSource = [...dataSource];
        updatedDataSource.splice(editingRow, 1, { ...values, id: editingRow });
        setDataSource(updatedDataSource);
        setEditingRow(null);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h2 style={{ textAlign: 'center' }}>File Upload Table View</h2>
                <Form>
                    <Form.Item
                        name="file"
                    >
                        <input type="file" id="myfile"
                            onChange={handleUpload}
                            name="myfile"
                            ref={ref}
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, 
                            application/vnd.ms-excel"
                        />
                    </Form.Item>
                    {file === '' ? null : (
                        <span onClick={reset}
                            style={{ cursor: 'pointer' }}>
                            <CloseCircleOutlined />
                        </span>
                    )}

                </Form>

                <Form form={form} onFinish={onFinish}>
                    <Table columns={columns} dataSource={dataSource}></Table>
                </Form>
            </header>
        </div>
    );
}

export default CustomEditTable