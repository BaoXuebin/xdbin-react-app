import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'semantic-ui-react';

// offsetX 水平偏移量, 百分百或字符串
const ProgressBar = ({ offsetX }) => {
    const style = { marginTop: '15px', marginLeft: offsetX };
    return <Progress percent={10} size="tiny" color="red" style={style} />;
};

ProgressBar.propTypes = {
    offsetX: PropTypes.string
};
ProgressBar.defaultProps = {
    offsetX: 0
};

export default ProgressBar;
