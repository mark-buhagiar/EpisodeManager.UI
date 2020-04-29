import React from 'react';
import './LandingPage.scss';
import ButtonGroup from '../common/button/ButtonGroup';
import { ButtonProps } from '../common/button/Button';
import { useAuth0 } from '../../helpers/reactAuth0Spa';
import { Redirect } from 'react-router-dom';

const LandingPage: React.FC = (): JSX.Element => {
    const { loginWithPopup, isAuthenticated } = useAuth0();
    const buttons = [
        { label: 'Log In / Sign Up', onClick: async (): Promise<void> => await loginWithPopup() },
    ] as ButtonProps[];

    const landingPage = (
        <div className="landing-page">
            <div className="title site-name">
                Episode
                <br />
                Manager
                <span className="version-number">v2.0</span>
            </div>
            <ButtonGroup className="button-group" buttons={buttons} />
            <div className="sub-text">
                Please contact me if you previously had an account and would like your data to be migrated
            </div>
        </div>
    );

    return isAuthenticated ? <Redirect to="/" /> : landingPage;
};

export default LandingPage;
