import React from "react";
import type {MenuProps} from 'antd/es/menu'
import {Link} from "react-router-dom";
import {LaptopOutlined, UserOutlined, MessageOutlined} from '@ant-design/icons'

export type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode,
                 key?: React.Key | null,
                 icon?: React.ReactNode,
                 children?: MenuItem[]): MenuItem {
    return {
        key,
        icon,
        children,
        label
    } as MenuItem
}

export const siderMenuItems: MenuItem[] = [
    getItem('My Profile', 'MyProfile', <UserOutlined/>, [
        getItem(<Link to='/profile'>Profile</Link>,'Profile'),
        getItem(<Link to='/settings'>Edit profile</Link>,'Messages')
    ]),

    getItem(<Link to='/users'>Users</Link>, null, <LaptopOutlined/>, ),
    getItem(<Link to='/messenger'>Messenger</Link>, null, <MessageOutlined/>)
]