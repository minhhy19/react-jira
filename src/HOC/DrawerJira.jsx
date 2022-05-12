import React, { useState } from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_DRAWER, OPEN_DRAWER } from '../redux/constants/DrawerConstant';

const { Option } = Select;

export default function DrawerJira(props) {
    const { visible, ComponentContentDrawer, callBackSubmit, title } = useSelector(state => state.DrawerReducer);
    const dispatch = useDispatch();
    const showDrawer = () => {
        dispatch({
            type: OPEN_DRAWER
        });
    };

    const onClose = () => {
        dispatch({
            type: CLOSE_DRAWER
        });
    };

    return (
        <>
            {/* <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                New account
            </Button> */}
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={
                            () => {
                                callBackSubmit();
                            }
                        } type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                {/* Nội dung thay đổi của drawer */}
                {ComponentContentDrawer}
            </Drawer>
        </>
    )
}
