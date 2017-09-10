import React from 'react';
import { Image, Input, Button } from 'semantic-ui-react';

import Header from '../components/Header';
import img from '../../static/images/1.jpeg';

function Login() {
    return (
        <div>
            <Header text="登录页面" />
            <div style={{ width: '280px', margin: '10% auto' }}>
                <Input
                    icon="users"
                    iconPosition="left"
                    placeholder="这里输入用户名"
                    fluid
                /><br />
                <Input
                    type="password"
                    icon="lock"
                    iconPosition="left"
                    placeholder="这里输入密码"
                    fluid
                /><br />
                <Input
                    type="password"
                    icon="lock"
                    iconPosition="left"
                    placeholder="这里输入密码"
                    fluid
                />
                <br />
                <Button color="green" content="登录" fluid style={{ marginBottom: '5px' }} />
                <Button color="blue" content="注册" fluid />
            </div>
        </div>
    );
}

export default Login;

// <div className="bgImage">
//     <Image src={img} />
// </div>
