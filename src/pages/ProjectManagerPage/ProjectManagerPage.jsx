import React, { useEffect, useRef, useState } from 'react'
import { Table, Button, Space, Tag, Popconfirm, message, Avatar, Popover, AutoComplete } from 'antd';
import { EditOutlined, DeleteOutlined, CloseSquareOutlined, CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import FormEditProject from '../../components/Forms/FormEditProject/FormEditProject';
import { NavLink } from 'react-router-dom';
import { ADD_USER_PROJECT_API, DELETE_PROJECT_SAGA, EDIT_PROJECT, GET_ALL_PROJECT_SAGA, REMOVE_USER_PROJECT_API } from '../../redux/constants/Jira/ProjectConstants';
import { GET_USER_SAGA } from '../../redux/constants/Jira/UserConstants';
import { OPEN_FORM_EDIT_PROJECT } from '../../redux/constants/DrawerConstant';

export default function ProjectManagerPage(props) {
    // Lấy dữ liệu reducer về component
    const { arrProject } = useSelector(state => state.ProjectReducer);

    const { userSearch } = useSelector(state => state.UserReducer);

    const [value, setValue] = useState('');
    const searchRef = useRef(null);

    // Sử dụng useDispatch để gọi action
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: GET_ALL_PROJECT_SAGA });
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
            render: (text, record, index) => {
                return <NavLink to={`/project/detail/${record.id}`}>{text}</NavLink>
            },
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
            title: 'Members',
            key: 'members',
            render: (text, record, index) => {
                return <div>
                    {record.members?.slice(0, 3).map((member, index) => {
                        return (
                            <Popover key={index} placement="top" title={'Member'} content={() => {
                                return <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Avatar</th>
                                            <th>Name</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {record.members?.map((item, index) => {
                                            return <tr key={index}>
                                                <td>{item.userId}</td>
                                                <td><img src={item.avatar} width="30" height="30" style={{ borderRadius: '15px' }} /></td>
                                                <td>{item.name}</td>
                                                <td>
                                                    <button className='btn btn-danger' style={{ borderRadius: '50%' }} onClick={() => {
                                                        dispatch({
                                                            type: REMOVE_USER_PROJECT_API,
                                                            userProject: {
                                                                userId: item.userId,
                                                                projectId: record.id
                                                            }
                                                        })
                                                    }}>X</button>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            }}>
                                <Avatar key={index} src={member.avatar} />
                            </Popover>
                        )
                    })}
                    {record.members?.length > 3 ? <Avatar>...</Avatar> : ''}
                    <Popover placement="rightTop" title={'Add user'} content={
                        () => {
                            return <AutoComplete
                                options={userSearch?.map((user, index) => {
                                    return { label: user.name, value: user.userId.toString() };
                                })}
                                value={value}
                                onChange={(text) => {
                                    setValue(text);
                                }}
                                onSelect={(valueSelect, option) => {
                                    // set giá trị của hộp thoại = option.label
                                    setValue(option.label);
                                    // Gọi API gửi về backend
                                    dispatch({
                                        type: ADD_USER_PROJECT_API,
                                        userProject: {
                                            "projectId": record.id,
                                            "userId": valueSelect
                                        }
                                    })
                                }}
                                style={{ width: '100%' }} onSearch={(value) => {
                                    if (searchRef.current) {
                                        clearTimeout(searchRef.current);
                                    }
                                    searchRef.current = setTimeout(() => {
                                        dispatch({
                                            type: GET_USER_SAGA,
                                            keyWord: value
                                        })
                                    }, 100)
                                }} />
                        }
                    } trigger="click">
                        <Button style={{ borderRadius: '50%' }}>+</Button>
                    </Popover>
                </div>
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                <div>
                    <button className='btn mr-2 btn-primary' onClick={() => {
                        const action = {
                            type: OPEN_FORM_EDIT_PROJECT,
                            title: 'Edit Project',
                            Component: <FormEditProject />
                        }
                        // dispatch lên reducer nội dung
                        dispatch(action);

                        // dispatch dữ liệu dòng hiện tại lên reducer
                        const actionEditProject = {
                            type: EDIT_PROJECT,
                            projectEditModel: record
                        }
                        dispatch(actionEditProject);
                    }}>
                        <EditOutlined style={{ fontSize: 17 }} />
                    </button>
                    <Popconfirm
                        title="Are you sure to delete this project?"
                        onConfirm={() => {
                            dispatch({
                                type: DELETE_PROJECT_SAGA, idProject: record.id
                            })
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button className='btn btn-danger' >
                            <DeleteOutlined style={{ fontSize: 17 }} />
                        </button>
                    </Popconfirm>
                </div>
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
            <Table columns={columns} rowKey={"id"} dataSource={arrProject} onChange={handleChange} />
        </div>
    )
}
