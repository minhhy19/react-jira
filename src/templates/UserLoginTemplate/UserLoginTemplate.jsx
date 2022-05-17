import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { Button, Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

export const UserLoginTemplate = (propsRoute) => {
    const [{width, height}, setSize] = useState({width: Math.round(window.innerWidth), height: Math.round(window.innerHeight)})

    useEffect(() => {
        window.onresize = () => {
            setSize({
                width: Math.round(window.innerWidth),
                height: Math.round(window.innerHeight)
            })
        }
    }, [])

    let {Component, ...restRoute} = propsRoute;

    return <Route {...restRoute} render={(propsRoute) => {
        return <>
            <Layout>
                <Sider width={width/2} style={{height: height, backgroundImage: `url(https://picsum.photos/${Math.round(width/2)}/${height})`, backgroundSize: '100%'}}>
                    
                </Sider>
                <Content>
                    <Component {...propsRoute} />
                </Content>
            </Layout>
        </>
    }} />
}