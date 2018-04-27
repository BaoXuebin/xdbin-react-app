import React from 'react';
import PropTypes from 'prop-types';
import { List, Header, Input, Grid, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Empty from '../../../blog/component/common/Empty';
import MusicListItem from './MusicListItem';
import MusicUtil from '../../utils/MusicUtil';
import {
    changeListType,
    appendPlayList,
    toggleIfEdit,
    reducePlayList
} from '../../action/PlayerAction';
import { searchIfNeeded } from '../../action/NetMusicAction';
import { persist, LocalStorageKeys } from '../../../utils/LocalStorage';

class MusicList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleTogglePlayList = this.handleTogglePlayList.bind(this);
        this.handleToggleSearchList = this.handleToggleSearchList.bind(this);
        this.handleClickSearchListItem = this.handleClickSearchListItem.bind(this);
        this.handleToggleIfEdit = this.handleToggleIfEdit.bind(this);
        this.handleReducePlayList = this.handleReducePlayList.bind(this);
    }

    componentWillUnmount() {
        persist(LocalStorageKeys.MUSIC_CACHE, this.props.musics);
    }

    handleSearch(e) {
        if (e.key === 'Enter') {
            const keyword = this.keyword.inputRef.value;
            if (keyword) {
                this.props.searchIfNeeded(keyword);
            }
        }
    }

    handleTogglePlayList() {
        this.props.changeListType('play');
    }

    handleToggleSearchList() {
        this.props.changeListType('search');
    }

    handleToggleIfEdit() {
        this.props.toggleIfEdit();
    }

    handleClickSearchListItem(musicId, isPlay = false) {
        // 将被点击的音乐加入播放列表，并开始播放。不重复添加
        // 获取被点击的音乐
        const music = MusicUtil.get(musicId, this.props.searchMusics);
        // 将音乐添加到播放列表
        this.props.appendPlayList(music, isPlay);
    }

    handleReducePlayList(musicId) {
        this.props.reducePlayList(musicId);
    }

    render() {
        const {
            listType,
            musicId,
            musics,
            searchMusics,
            onClickItem,
            loading,
            edit
        } = this.props;
        let _html = <Empty />;
        if (listType === 'play' && musics.length > 0) {
            _html = musics.map((m) => {
                const current = m.id === musicId;
                return (
                    <MusicListItem
                        key={m.id}
                        current={current}
                        edit={edit}
                        music={m}
                        onClickItem={onClickItem}
                        onEdit={this.handleReducePlayList}
                    />
                );
            });
        } else if (searchMusics.length > 0) {
            _html = searchMusics.map((m) => {
                const current = m.id === musicId;
                return (
                    <MusicListItem
                        key={m.id}
                        current={current}
                        edit={edit}
                        music={m}
                        onClickItem={this.handleClickSearchListItem}
                        onEdit={this.handleClickSearchListItem}
                    />
                );
            });
        }
        return (
            <div className="musiclist-container">
                <Header dividing>
                    <Header.Content>
                        <Grid>
                            <Grid.Column width={6}>
                                <Button.Group basic size="mini">
                                    <Button icon="play" onClick={this.handleTogglePlayList} />
                                    <Button icon="list" onClick={this.handleToggleSearchList} />
                                    <Button icon="setting" onClick={this.handleToggleIfEdit} />
                                </Button.Group>
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <Input
                                    style={{ fontSize: '12px', padding: '.1rem' }}
                                    size="mini"
                                    ref={(keyword) => { this.keyword = keyword; }}
                                    icon="search"
                                    loading={loading}
                                    placeholder="Search..."
                                    onKeyPress={this.handleSearch}
                                />
                            </Grid.Column>
                        </Grid>
                    </Header.Content>
                </Header>
                <List divided relaxed celled animated verticalAlign="middle">
                    {_html}
                </List>
            </div>
        );
    }
}

MusicList.propTypes = {
    loading: PropTypes.bool.isRequired,
    edit: PropTypes.bool.isRequired,
    listType: PropTypes.string.isRequired,
    musicId: PropTypes.number.isRequired,
    musics: PropTypes.arrayOf(PropTypes.shape()),
    searchMusics: PropTypes.arrayOf(PropTypes.shape()),
    onClickItem: PropTypes.func.isRequired,
    searchIfNeeded: PropTypes.func.isRequired,
    changeListType: PropTypes.func.isRequired,
    appendPlayList: PropTypes.func.isRequired,
    toggleIfEdit: PropTypes.func.isRequired,
    reducePlayList: PropTypes.func.isRequired
};
MusicList.defaultProps = {
    musics: [],
    searchMusics: []
};

const mapStateToProps = state => ({
    listType: state.player.listType,
    edit: state.player.edit,
    loading: state.netMusic.loading,
    searchMusics: state.netMusic.songs
});
const mapDispatchToProps = dispatch => ({
    searchIfNeeded: bindActionCreators(searchIfNeeded, dispatch),
    changeListType: bindActionCreators(changeListType, dispatch),
    appendPlayList: bindActionCreators(appendPlayList, dispatch),
    toggleIfEdit: bindActionCreators(toggleIfEdit, dispatch),
    reducePlayList: bindActionCreators(reducePlayList, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MusicList);
