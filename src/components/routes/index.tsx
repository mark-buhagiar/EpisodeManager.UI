import React from 'react';
import HomePage from '../home/HomePage';
import LandingPage from '../landing/LandingPage';
import AdminPage from '../admin';
import ShowsPage from '../shows/ShowsPage';
import HelpPage from '../help/HelpPage';
import ProfilePage from '../profile';
import { Switch, Route } from 'react-router-dom';

const Routes: React.FC = (): JSX.Element => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/landing" component={LandingPage} />
            <Route exact path="/shows" component={ShowsPage} />
            <Route exact path="/help" component={HelpPage} />
            <Route exact path="/admin" component={AdminPage} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route path="/" render={(): JSX.Element => <div>404!</div>} />
        </Switch>
    );
};

export default Routes;
