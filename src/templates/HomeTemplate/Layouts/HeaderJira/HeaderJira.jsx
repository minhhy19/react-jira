import React from 'react'
import { Button, Dropdown, Layout, Menu } from 'antd';
const { Header } = Layout;

const menu = (
    <Menu
        items={[
            {
                key: '1',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                        1st menu item
                    </a>
                ),
            },
            {
                key: '2',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                        2nd menu item
                    </a>
                ),
            },
            {
                key: '3',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                        3rd menu item
                    </a>
                ),
            },
        ]}
    />
);

export default function HeaderJira() {
    return (
        <Header
            style={{
                backgroundColor: '#fff'
            }}
            className='container-fluid'
        >
            <Dropdown
                overlay={menu}
                placement="bottomRight"
                arrow={{
                    pointAtCenter: true,
                }}
            >
                <Button>bottomRight</Button>
            </Dropdown>
        </Header>
    )
}
