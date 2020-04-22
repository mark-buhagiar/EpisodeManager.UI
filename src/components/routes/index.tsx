import React from 'react';
import HomePage from '../home/HomePage';
import { Switch, Route } from 'react-router-dom';

const Routes: React.FC = (): JSX.Element => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/" render={(): JSX.Element => <div>404!</div>} />
        </Switch>
    );
};

export default Routes;
