import React from 'react'
import { Button, Dropdown, Layout, Menu } from 'antd';
import { useSelector } from 'react-redux';
import { ACCESS_TOKEN, history, USER_LOGIN } from '../../../../util/constants/settingSystem';
import { HomeOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
const { Header } = Layout;

const handleLogOut = () => {
    localStorage.setItem(ACCESS_TOKEN, '');
    localStorage.setItem(USER_LOGIN, '');
    history.push('/login');
};

const menu = (
    <Menu
        items={[
            {
                label: 'Home',
                onClick: () => history.push('/'),
                icon: <HomeOutlined />,
            },
            {
                label: 'Profile',
                icon: <UserOutlined />,
            },
            {
                label: 'Logout',
                onClick: () => handleLogOut(),
                icon: <LogoutOutlined />,
            },
        ]}
    />
);

export default function HeaderJira() {
    const { userLogin } = useSelector(state => state.UserReducer)
    return (
        <Header
            style={{
                backgroundColor: '#fff'
            }}
            className='container-fluid header-home'
        >
            <Dropdown
                overlay={menu}
                placement="bottomRight"
                arrow={{
                    pointAtCenter: true,
                }}
            >
                <button aria-label='Account' aria-haspopup='true'>
                    {userLogin?.avatar ? (
                    <img
                        src={userLogin.avatar}
                        alt={userLogin.avatar}
                        aria-hidden='true'
                    />
                    ) : (''
                    // <AccountSVG className='w-8 h-8' />
                    )}
                </button>
            </Dropdown>
        </Header>
    )
}
