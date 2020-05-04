import React from 'react';
import { CircularProgress } from '@material-ui/core';
import './Loading.scss';

const ComponentLoading: React.FC = (): JSX.Element => (
    <div className="component-loading-container">
        <span className="component-loading">
            <CircularProgress />
        </span>
    </div>
);
export default ComponentLoading;
