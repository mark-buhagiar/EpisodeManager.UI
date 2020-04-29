import React from 'react';
import './Panel.scss';

interface Props {
    title: string;
    children: React.ReactNode;
}

const Panel: React.FC<Props> = ({ children, title }): JSX.Element => {
    return (
        <div className="panel">
            <div className="panel-title title">{title}</div>
            {children}
        </div>
    );
};

export default Panel;
