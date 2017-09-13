import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

const Footer = ({ theme }) => {
    const ifNight = theme === 'night';
    return (
        <Container textAlign="center" className="xd-footer">
            © 2017 xdbin.com | <a href="http://www.miitbeian.gov.cn/">豫ICP备17010915号</a>
        </Container>
    );
};

Footer.propTypes = {
    theme: PropTypes.string
};
Footer.defaultProps = {
    theme: 'day'
};

function mapStateToProps(state) {
    return {
        theme: state.Global.theme
    };
}

export default connect(mapStateToProps)(Footer);
