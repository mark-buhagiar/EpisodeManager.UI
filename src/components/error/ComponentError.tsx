import React from 'react';
import './Error.scss';

const ComponentError: React.FC = (): JSX.Element => (
    <div className="component-error-container">
        <span className="component-error">
            <span className="material-icons">error_outline</span>
        </span>
    </div>
);
export default ComponentError;
