import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Container } from 'semantic-ui-react';

const Footer = ({ theme }) => {
    const ifNight = theme === 'night';
    return (
        <Segment color={ifNight ? 'blakc' : 'grey'} inverted>
            <Container textAlign="center">
                © 2017 xdbin.com | <a style={{ color: 'white' }} href="http://www.miitbeian.gov.cn/">豫ICP备17010915号</a>
            </Container>
        </Segment>
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
