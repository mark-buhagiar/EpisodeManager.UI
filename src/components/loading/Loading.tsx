import React from 'react';
import './Loading.scss';

const Loading: React.FC = (): JSX.Element => {
    return (
        <div className="loading-container">
            <div className="loading-indicator">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loading;
