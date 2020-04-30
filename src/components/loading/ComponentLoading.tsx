import React from 'react';
import { CircularProgress } from '@material-ui/core';
import './Loading.scss';

const ComponentLoading: React.FC = (): JSX.Element => (
    <span className="component-loading">
        <CircularProgress />
    </span>
);
export default ComponentLoading;
