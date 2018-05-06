import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table, Menu, Icon } from 'semantic-ui-react';

class Pager extends PureComponent {
    constructor(props) {
        super(props);
        this.pages = [];
        if (this.props.total > 0) {
            for (let i = 1; i <= this.props.total; i += 1) {
                this.pages.push(i);
            }
        }
        this.handlePrev = this.handlePrev.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.total !== this.props.total) {
            for (let i = 1; i <= nextProps.total; i += 1) {
                this.pages.push(i);
            }
        }
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
    handleClick(page) {
        const { onChange } = this.props;
        onChange(page);
    }

    render() {
        const { current } = this.props;
        const html = this.pages.map((i) => {
            if (current === i) {
                return (<Menu.Item key={i} as="a" style={{ backgroundColor: 'gray', color: 'white' }}>{i}</Menu.Item>);
            }
            return (<Menu.Item key={i} as="a" onClick={() => { this.handleClick(i); }}>{i}</Menu.Item>);
        });
        return (
            <Table.HeaderCell colSpan="4">
                <Menu floated="right" pagination>
                    <Menu.Item as="a" icon onClick={this.handlePrev}><Icon name="chevron left" /></Menu.Item>
                    {html}
                    <Menu.Item as="a" icon onClick={this.handleNext}><Icon name="chevron right" /></Menu.Item>
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
