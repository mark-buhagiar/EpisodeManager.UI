import React from 'react';
import './Footer.scss';

const Footer: React.FC = (): JSX.Element => {
    const year = (): number => new Date().getFullYear();

    return (
        <div className="footer">
            <a href="https://www.linkedin.com/in/buhagiar-mark/" target="blank">
                From Mark with ♥️ - {year()}
            </a>
        </div>
    );
};

export default Footer;
