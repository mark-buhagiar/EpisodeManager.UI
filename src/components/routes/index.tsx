import React from 'react';
import HomePage from '../home/HomePage';
import LandingPage from '../landing/LandingPage';
import AdminPage from '../admin/AdminPage';
import { Switch, Route } from 'react-router-dom';

const Routes: React.FC = (): JSX.Element => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/landing" component={LandingPage} />
            <Route exact path="/admin" component={AdminPage} />
            <Route path="/" render={(): JSX.Element => <div>404!</div>} />
        </Switch>
    );
};

export default Routes;
