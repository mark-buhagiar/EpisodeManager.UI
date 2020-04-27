import React from 'react';
import { withAuth } from '../../HoC/withAuth';
import withAuthHeaderInterceptor from '../../HoC/withAuthHeaderInterceptor';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Routes from '../routes';
import './App.scss';

const App = (): JSX.Element => {
    return (
        <div className="app">
            <Header />
            <div className="app-container">
                <Routes />
            </div>
            <Footer />
        </div>
    );
};

export default withAuth(withAuthHeaderInterceptor(App));
