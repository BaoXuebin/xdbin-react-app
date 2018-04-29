import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table, Menu, Icon } from 'semantic-ui-react';

class Pager extends PureComponent {
    constructor(props) {
        super(props);
        this.handlePrev = this.handlePrev.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handlePrev() {}
    handleNext() {}
    handleClick() {}

    render() {
        const { totalPage, current } = this.props;
        const html = [];
        for (let i = 1; i <= totalPage; i += 1) {
            html.push(<Menu.Item key={i} as="a">{i}</Menu.Item>);
        }
        return (
            <Table.HeaderCell colSpan="4">
                <Menu floated="right" pagination>
                    {current > 0 && <Menu.Item as="a" icon><Icon name="chevron left" /></Menu.Item>}
                    {html}
                    {totalPage > current && <Menu.Item as="a" icon><Icon name="chevron right" /></Menu.Item>}
                </Menu>
            </Table.HeaderCell>
        );
    }
}

Pager.propTypes = {
    totalPage: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired
};

export default Pager;
