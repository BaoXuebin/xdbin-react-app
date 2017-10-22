import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// offsetX 水平偏移量, 百分百或字符串
class ProgressBar extends PureComponent {
    constructor(props) {
        super(props);
        this.handleChangeProgress = this.handleChangeProgress.bind(this);
    }

    handleChangeProgress(e) {
        const clkProgress =
            (e.clientX - this.progress.getBoundingClientRect().left) / this.progress.clientWidth;
        this.props.onChangeProgress(clkProgress);
    }

    render() {
        const { offsetX, percent } = this.props;
        const style = { marginTop: '15px', marginLeft: offsetX, cursor: 'pointer' };
        return (
            <div
                className="ui red tiny progress"
                data-percent={percent * 100}
                style={style}
                ref={(progress) => { this.progress = progress; }}
                onClick={this.handleChangeProgress}
            >
                <div className="bar" style={{ width: `${percent * 100}%`, minWidth: 0 }} />
            </div>
        );
    }
}

ProgressBar.propTypes = {
    offsetX: PropTypes.string,
    percent: PropTypes.number,
    onChangeProgress: PropTypes.func
};
ProgressBar.defaultProps = {
    offsetX: '0',
    percent: 0,
    onChangeProgress: () => {}
};

export default ProgressBar;
