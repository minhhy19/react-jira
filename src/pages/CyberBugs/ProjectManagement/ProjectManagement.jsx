import React, { useState } from 'react'
import { Table, Button, Space } from 'antd';
import ReactHtmlParse from "react-html-parser";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const data = [
    {
        "members": [],
        "creator": {
            "id": 1545,
            "name": "Quan"
        },
        "id": 4197,
        "projectName": "Fix lỗi Edit",
        "description": "<p>cuối c&ugrave;ng cũng fix được akakkakakakakakak</p>",
        "categoryId": 2,
        "categoryName": "Dự án phần mềm",
        "alias": "fix-loi-edit",
        "deleted": false
    },
    {
        "members": [
            {
                "userId": 1480,
                "name": "lee",
                "avatar": "https://ui-avatars.com/api/?name=lee"
            },
            {
                "userId": 1478,
                "name": "haole",
                "avatar": "https://ui-avatars.com/api/?name=haole"
            },
            {
                "userId": 1024,
                "name": "Lê Ngoại Ngữ",
                "avatar": "https://ui-avatars.com/api/?name=Lê Ngoại Ngữ"
            }
        ],
        "creator": {
            "id": 1480,
            "name": "lee"
        },
        "id": 4199,
        "projectName": "Dung Xoa Please",
        "description": "<p>Testing&nbsp;</p>",
        "categoryId": 2,
        "categoryName": "Dự án phần mềm",
        "alias": "dung-xoa-please",
        "deleted": false
    },
    {
        "members": [],
        "creator": {
            "id": 1545,
            "name": "Quan"
        },
        "id": 4200,
        "projectName": "NotificationReducer",
        "description": "<p>NotificationReducerNotificationReducer</p>",
        "categoryId": 3,
        "categoryName": "Dự án di động",
        "alias": "notificationreducer",
        "deleted": false
    },
    {
        "members": [],
        "creator": {
            "id": 1490,
            "name": ""
        },
        "id": 4202,
        "projectName": "Nguyen Thai",
        "description": "<p>123321</p>",
        "categoryId": 1,
        "categoryName": "Dự án web",
        "alias": "nguyen-thai",
        "deleted": false
    },
    {
        "members": [
            {
                "userId": 1534,
                "name": "nguyenthao",
                "avatar": "https://ui-avatars.com/api/?name=nguyenthao"
            },
            {
                "userId": 1491,
                "name": "nguyenthai",
                "avatar": "https://ui-avatars.com/api/?name=nguyenthai"
            }
        ],
        "creator": {
            "id": 1534,
            "name": "nguyenthao"
        },
        "id": 4203,
        "projectName": "Project of Thái Đẹp Zai",
        "description": "<p>123321</p>",
        "categoryId": 2,
        "categoryName": "Dự án phần mềm",
        "alias": "project-of-thai-dep-zai",
        "deleted": false
    }
];

export default function ProjectManagement(props) {

    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null
    });

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    const clearFilters = () => {
        setState({ filteredInfo: null });
    };

    const clearAll = () => {
        setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    };

    const setAgeSort = () => {
        setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'age',
            },
        });
    };

    let { sortedInfo, filteredInfo } = state;

    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text, record, index) => {
                // console.log('text', text);
                // console.log('record', record);
                // console.log('index', index);
                let jsxContent = ReactHtmlParse(text);

                return <div key={index}>
                    {jsxContent}
                </div>
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                <Space size="middle">
                    <a onClick={() => {
                        
                    }}><EditOutlined /></a>
                    <a><DeleteOutlined /></a>
                </Space>
            ),
        },
    ];

    return (
        <div className='container-fluid mt-5'>
            <h3>Project Management</h3>
            <Space style={{ marginBottom: 16 }}>
                <Button onClick={setAgeSort}>Sort age</Button>
                <Button onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </Space>
            <Table columns={columns} rowKey={"id"} dataSource={data} onChange={handleChange} />
        </div>
    )
}
