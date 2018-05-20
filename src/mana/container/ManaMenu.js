import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'semantic-ui-react';
import Link from 'next/link';

const ManaMenu = ({ active }) => (
    <Menu pointing secondary>
        <Link href="/mana/blog" prefetch>
            <Menu.Item name="blog" active={active === 'blog'}>
                <Icon name="file" />
            </Menu.Item>
        </Link>
        <Link href="/mana/tag" prefetch>
            <Menu.Item name="tag" active={active === 'tag'}>
                <Icon name="tag" />
            </Menu.Item>
        </Link>
        <Link href="/mana/add" prefetch>
            <Menu.Item name="add">
                <Icon name="add" />
            </Menu.Item>
        </Link>
        <Menu.Menu position="right">
            <Menu.Item
                name="logout"
                link
                active={active === 'logout'}
                onClick={this.handleItemClick}
            >
                <Icon name="sign out" link />退出
            </Menu.Item>
        </Menu.Menu>
    </Menu>
);

ManaMenu.propTypes = {
    active: PropTypes.string.isRequired
};

export default ManaMenu;
