import React from 'react';
import { Container, Icon, Divider, Popup } from 'semantic-ui-react';

export default () => (
    <Container textAlign="right">
        <Popup
            trigger={<Icon name="info circle" color="grey" link />}
            content="「关注的一些博客内容」"
            on="hover"
        />
        <a href="https://github.com/BaoXuebin/BlogSpider" style={{ color: 'black' }}>
            <Popup
                trigger={<Icon name="github" link />}
                content="https://github.com/BaoXuebin/BlogSpider"
                on="hover"
            />
        </a>
        <Divider />
    </Container>
);
