import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Transition, Segment, Grid, Input } from 'semantic-ui-react';

class SearchBar extends PureComponent {
    constructor(props) {
        super(props);
        this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
        this.handleEnterPress = this.handleEnterPress.bind(this);
    }

    handleChangeKeyword() {
        this.props.onChange(this.keyword.inputRef.value);
    }

    handleEnterPress(e) {
        if (e.key === 'Enter') {
            // 回车查询从第一页开始
            this.props.onSearch(1);
        }
    }

    render() {
        const { show } = this.props;
        return (
            <Transition.Group animation={show ? 'slide up' : 'slide down'} duration={300}>
                {
                    show &&
                    <Segment style={{ marginTop: '-1.1rem', marginBottom: '1rem' }}>
                        <Grid centered style={{ margin: '-1rem' }}>
                            <Grid.Column computer={9} plant={13} mobile={16} textAlign="center">
                                <Input
                                    fluid
                                    icon="search"
                                    iconPosition="left"
                                    placeholder="Search..."
                                    ref={(keyword) => { this.keyword = keyword; }}
                                    onChange={this.handleChangeKeyword}
                                    onKeyPress={this.handleEnterPress}
                                />
                            </Grid.Column>
                        </Grid>
                    </Segment>
                }
            </Transition.Group>
        );
    }
}

SearchBar.propTypes = {
    show: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired
};

export default SearchBar;
