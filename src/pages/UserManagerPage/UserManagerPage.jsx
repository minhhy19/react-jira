import React, { useEffect, useRef, useState } from 'react'
import { Table, Button, Space, Tag, Popconfirm, message, Avatar, Popover, AutoComplete, Input } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, CloseSquareOutlined, CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import FormEditProject from '../../components/Forms/FormEditProject/FormEditProject';
import { NavLink } from 'react-router-dom';
import { ADD_USER_PROJECT_API, DELETE_PROJECT_SAGA, EDIT_PROJECT, GET_ALL_PROJECT_SAGA, REMOVE_USER_PROJECT_API, SEARCH_PROJECT_SAGA } from '../../redux/constants/Jira/ProjectConstants';
import { DELETE_USER_SAGA, EDIT_USER, GET_USER_SAGA } from '../../redux/constants/Jira/UserConstants';
import { OPEN_FORM_CREATE_USER, OPEN_FORM_EDIT_PROJECT, OPEN_FORM_EDIT_USER } from '../../redux/constants/DrawerConstant';
import FormCreateUser from '../../components/Forms/FormCreateUser/FormCreateUser';
import FormEditUser from '../../components/Forms/FormEditUser/FormEditUser';

export default function UserManagerPage(props) {
    // Lấy dữ liệu reducer về component
    const { userSearch } = useSelector(state => state.UserReducer);

    const [value, setValue] = useState('');
    const searchUserRef = useRef(null);

    // Sử dụng useDispatch để gọi action
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: GET_USER_SAGA,
            keyWord: ''
        });
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

    const setNameSort = () => {
        setState({
            sortedInfo: {
                order: 'ascend',
                columnKey: 'name',
            },
        });
    };

    let { sortedInfo, filteredInfo } = state;

    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
        {
            title: 'Id',
            dataIndex: 'userId',
            key: 'userId',
            sorter: (item2, item1) => {
                return item2.id - item1.id;
            },
            sortOrder: sortedInfo.columnKey === 'userId' ? sortedInfo.order : null,
            sortDirections: ['descend'],
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (item2, item1) => {
                let name1 = item1.name.trim().toLowerCase();
                let name2 = item2.name.trim().toLowerCase();
                if (name2 < name1) {
                    return -1;
                }
                return 1;
            },
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text, record, index) => {
                return <NavLink to={`#`}>{text}</NavLink>
            },
            sorter: (item2, item1) => {
                let email1 = item1.email?.trim().toLowerCase();
                let email2 = item2.email?.trim().toLowerCase();
                if (email2 < email1) {
                    return -1;
                }
                return 1;
            },
            sortOrder: sortedInfo.columnKey === 'email' ? sortedInfo.order : null,
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            sorter: (item2, item1) => {
                let phoneNumber1 = item1.phoneNumber?.trim().toLowerCase();
                let phoneNumber2 = item2.phoneNumber?.trim().toLowerCase();
                if (phoneNumber2 < phoneNumber1) {
                    return -1;
                }
                return 1;
            },
            sortOrder: sortedInfo.columnKey === 'phoneNumber' ? sortedInfo.order : null,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                <div>
                    <button className='btn mr-2 btn-outline-primary' onClick={() => {
                        const action = {
                            type: OPEN_FORM_EDIT_USER,
                            title: 'Edit user',
                            Component: <FormEditUser />
                        }
                        // dispatch lên reducer nội dung
                        dispatch(action);

                        // dispatch dữ liệu dòng hiện tại lên reducer
                        const actionEditUser = {
                            type: EDIT_USER,
                            userEditModel: record
                        }
                        dispatch(actionEditUser);
                    }}>
                        <EditOutlined style={{ fontSize: 17 }} />
                    </button>
                    <Popconfirm
                        title="Are you sure to delete this user?"
                        onConfirm={() => {
                            dispatch({
                                type: DELETE_USER_SAGA, userId: record.userId
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
        if (searchUserRef.current) {
            clearTimeout(searchUserRef.current);
        }
        searchUserRef.current = setTimeout(() => {
            dispatch({
                type: GET_USER_SAGA,
                keyWord: value
            })
        }, 500)
        
    };

    return (
        <div className='container-fluid'>
            <button className='btn btn-outline-primary mb-3' onClick={() => {
                dispatch({
                    type: OPEN_FORM_CREATE_USER,
                    Component: <FormCreateUser />,
                    title: 'Create user'
                })
            }}>Create user</button>
            <h3 className='mb-3'>User Management</h3>
            <Space style={{ marginBottom: 16 }}>
                <Input onChange={handleChangeInputSearch} name='search' style={{ minWidth: 300 }} placeholder="" prefix={<SearchOutlined />} />
                <Button onClick={setNameSort}>Sort name</Button>
                <Button onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </Space>
            <Table columns={columns} rowKey={"userId"} dataSource={userSearch} onChange={handleChange} />
        </div>
    )
}
