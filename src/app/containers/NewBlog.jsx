import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Header, Icon, Divider, Input, Button, Radio } from 'semantic-ui-react';

import EditorAndPreview from '../components/EditorAndPreview';
import TagPool from '../components/TagPool';
import { fetchTagIfNeed } from '../actions/TagAction';

class NewBlog extends PureComponent {
    componentWillMount() {
        this.props.dispatch(fetchTagIfNeed());
    }

    render() {
        return (
            <Segment>
                <Header as="h2">
                    <Icon name="pencil" />
                    <Header.Content>
                        新建
                    </Header.Content>
                </Header>
                <Divider />
                <Input placeholder="输入标题" fluid /><br />
                <TagPool /><br />
                <EditorAndPreview label="概要内容" /><br />
                <EditorAndPreview label="博客内容" rows={20} /><br />
                <Radio toggle defaultChecked label="公开" />
                <Divider />
                <Button color="green">提交</Button>
            </Segment>
        );
    }
}

NewBlog.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect()(NewBlog);
