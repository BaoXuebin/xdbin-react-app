import React from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';

export default () => (
    <Dimmer active inverted>
        <Loader size="medium">Loading</Loader>
    </Dimmer>
);
