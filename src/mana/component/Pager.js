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

    handlePrev() {
        const { current, onChange } = this.props;
        const _current = current - 1;
        if (_current > 0) {
            onChange(_current);
        }
    }
    handleNext() {
        const { total, current, onChange } = this.props;
        const _current = current + 1;
        if (_current <= total) {
            onChange(_current);
        }
    }
    handleClick() {
        const { current, onChange } = this.props;
        const _current = current - 1;
        if (_current > 0) {
            onChange(_current);
        }
    }

    render() {
        const { total, current } = this.props;
        const html = [];
        for (let i = 1; i <= total; i += 1) {
            if (current === i) {
                html.push(<Menu.Item key={i} as="a" style={{ backgroundColor: 'gray', color: 'white' }}>{i}</Menu.Item>);
            } else {
                html.push(<Menu.Item key={i} as="a" onClick={() => { this.handleClick(i); }}>{i}</Menu.Item>);
            }
        }
        return (
            <Table.HeaderCell colSpan="4">
                <Menu floated="right" pagination>
                    {current > 1 && <Menu.Item as="a" icon onClick={this.handlePrev}><Icon name="chevron left" /></Menu.Item>}
                    {html}
                    {total > current && <Menu.Item as="a" icon onClick={this.handleNext}><Icon name="chevron right" /></Menu.Item>}
                </Menu>
            </Table.HeaderCell>
        );
    }
}

Pager.propTypes = {
    total: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Pager;
