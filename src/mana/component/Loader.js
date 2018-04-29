import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

export default ({ loading }) => {
    if (loading) {
        return (
            <Dimmer active>
                <Loader>加载中</Loader>
            </Dimmer>
        );
    }
    return '';
};
