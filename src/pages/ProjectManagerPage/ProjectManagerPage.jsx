import React, { useEffect, useRef, useState } from 'react'
import { Table, Button, Space, Tag, Popconfirm, message, Avatar, Popover, AutoComplete, Input } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, CloseSquareOutlined, CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import FormEditProject from '../../components/Forms/FormEditProject/FormEditProject';
import { NavLink } from 'react-router-dom';
import { ADD_USER_PROJECT_API, DELETE_PROJECT_SAGA, EDIT_PROJECT, GET_ALL_PROJECT_SAGA, REMOVE_USER_PROJECT_API, SEARCH_PROJECT_SAGA } from '../../redux/constants/Jira/ProjectConstants';
import { GET_USER_SAGA } from '../../redux/constants/Jira/UserConstants';
import { OPEN_FORM_EDIT_PROJECT } from '../../redux/constants/DrawerConstant';

export default function ProjectManagerPage(props) {
    // Lấy dữ liệu reducer về component
    const { arrProject } = useSelector(state => state.ProjectReducer);

    const { userSearch } = useSelector(state => state.UserReducer);

    const [value, setValue] = useState('');
    const searchUserRef = useRef(null);
    const searchProjectRef = useRef(null);

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

    const setProjectNameSort = () => {
        setState({
            sortedInfo: {
                order: 'ascend',
                columnKey: 'projectName',
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
            sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,
            sortDirections: ['descend'],
        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
            render: (text, record, index) => {
                return <NavLink className="btn btn-outline-primary btn-sm" to={`/project/detail/${record.id}`}>{text}</NavLink>
            },
            sorter: (item2, item1) => {
                let projectName1 = item1.projectName?.trim().toLowerCase();
                let projectName2 = item2.projectName?.trim().toLowerCase();
                if (projectName2 < projectName1) {
                    return -1;
                }
                return 1;
            },
            sortOrder: sortedInfo.columnKey === 'projectName' ? sortedInfo.order : null,
        },
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
            sortOrder: sortedInfo.columnKey === 'categoryName' ? sortedInfo.order : null,
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
            sortOrder: sortedInfo.columnKey === 'creator' ? sortedInfo.order : null,
        },
        {
            title: 'Members',
            key: 'members',
            render: (text, record, index) => {
                return <div>
                    {record.members?.slice(0, 3).map((member, index) => {
                        return (
                            <Popover key={member.userId} placement="top" title={'Member'} content={() => {
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
                                            return <tr key={item.userId}>
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
                                <Avatar key={member.userId} src={member.avatar} />
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
                                    if (searchUserRef.current) {
                                        clearTimeout(searchUserRef.current);
                                    }
                                    searchUserRef.current = setTimeout(() => {
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
                    <button className='btn mr-2 btn-outline-primary' onClick={() => {
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
                        <button className='btn btn-outline-danger' >
                            <DeleteOutlined style={{ fontSize: 17 }} />
                        </button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const handleChangeInputSearch = (e) => {
        const { value } = e.target;
        if (searchProjectRef.current) {
            clearTimeout(searchProjectRef.current);
        }
        searchProjectRef.current = setTimeout(() => {
            dispatch({
                type: SEARCH_PROJECT_SAGA,
                keyWord: value
            })
        }, 500)
        
    };

    return (
        <div className='container-fluid'>
            <h3 className='mb-3'>Project Management</h3>
            <Space style={{ marginBottom: 16 }}>
                <Input onChange={handleChangeInputSearch} name='search' style={{ minWidth: 300 }} placeholder="" prefix={<SearchOutlined />} />
                <Button onClick={setProjectNameSort}>Sort project name</Button>
                <Button onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </Space>
            <Table columns={columns} rowKey={"id"} dataSource={arrProject} onChange={handleChange} />
        </div>
    )
}
