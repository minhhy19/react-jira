import React, { useEffect, useState } from 'react'
import { Table, Button, Space, Tag } from 'antd';
import ReactHtmlParse from "react-html-parser";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';



export default function ProjectManagement(props) {
    // Lấy dữ liệu reducer về component
    const { projectList } = useSelector(state => state.ProjectCyberbugsReducer);

    // Sử dụng useDispatch để gọi action
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'GET_LIST_PROJECT_SAGA'})
    }, [])

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
            sorter: (item2, item1) => {
                return item2.id - item1.id;
            },
            sortDirections: ['descend'],
        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
            sorter: (item2, item1) => {
                let projectName1 = item1.projectName?.trim().toLowerCase();
                let projectName2 = item2.projectName?.trim().toLowerCase();
                if (projectName2 < projectName1) {
                    return -1;
                }
                return 1;
            },
        },
        // {
        //     title: 'Description',
        //     dataIndex: 'description',
        //     key: 'description',
        //     render: (text, record, index) => {
        //         // console.log('text', text);
        //         // console.log('record', record);
        //         // console.log('index', index);
        //         let jsxContent = ReactHtmlParse(text);

        //         return <div key={index}>
        //             {jsxContent}
        //         </div>
        //     }
        // },
        {
            title: 'Category',
            dataIndex: 'categoryName',
            key: 'categoryName',
            sorter: (item2, item1) => {
                let categoryName1 = item1.categoryName?.trim().toLowerCase();
                let categoryName2 = item2.categoryName?.trim().toLowerCase();
                if (categoryName2 < categoryName1) {
                    return -1;
                }
                return 1;
            },
        },
        {
            title: 'Creator',
            key: 'creator',
            render: (text, record, index) => {
                return <Tag color="green">{record.creator?.name}</Tag>
            },
            sorter: (item2, item1) => {
                let creator1 = item1.creator?.name.trim().toLowerCase();
                let creator2 = item2.creator?.name.trim().toLowerCase();
                if (creator2 < creator1) {
                    return -1;
                }
                return 1;
            },
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
            <Table columns={columns} rowKey={"id"} dataSource={projectList} onChange={handleChange} />
        </div>
    )
}
