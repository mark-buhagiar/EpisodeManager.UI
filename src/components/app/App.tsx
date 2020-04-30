import React from 'react';
import { withAuth } from '../../HoC/withAuth';
import withAuthHeaderInterceptor from '../../HoC/withAuthHeaderInterceptor';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Routes from '../routes';
import './App.scss';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#e2e2e2',
        },
        text: {
            primary: '#e2e2e2',
            secondary: '#e2e2e2',
        },
        action: {
            active: '#e2e2e2',
            hover: '#333333',
        },
        background: {
            paper: '#2a292b',
        },
    },
});

const App = (): JSX.Element => {
    return (
        <ThemeProvider theme={theme}>
            <div className="app">
                <Header />
                <div className="app-container">
                    <Routes />
                </div>
                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default withAuth(withAuthHeaderInterceptor(App));
