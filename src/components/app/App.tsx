import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../header/Header';
import Routes from '../routes';
import './App.scss';

const App = (): JSX.Element => {
    return (
        <div className="App">
            <Router>
                <Header />
                <div className="app-container">
                    <Routes />
                </div>
            </Router>
        </div>
    );
};

export default App;
