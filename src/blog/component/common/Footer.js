import React from 'react';
import { Container } from 'semantic-ui-react';

import Config from '../../../config/Config';

export default () => (
    <Container textAlign="center" className="xd-footer">
        © 2018 xdbin.com | <a href="http://www.miitbeian.gov.cn/">豫ICP备17010915号</a> | <a href={`${Config.basePath}login`}>后台管理</a>
    </Container>
);
