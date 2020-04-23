import React from 'react';
import NavLinkObj from '../../models/NavLink';
import './Header.scss';
import NavLink from './NavLink';
import { Routes, RouteLabels } from '../../models/enums/Routes';

const Header: React.FC = (): JSX.Element => {
    const navLinksLeft = [
        { to: Routes.HOMEPAGE, exact: true, label: RouteLabels.HOMEPAGE },
        { to: Routes.MANAGE_SHOWS, label: RouteLabels.MANAGE_SHOWS },
        { to: Routes.SHOWS, label: RouteLabels.SHOWS },
        { to: Routes.HELP, label: RouteLabels.HELP },
        { to: Routes.ADMIN, label: RouteLabels.ADMIN },
    ] as NavLinkObj[];

    const navLinksRight = [{ to: Routes.PROFILE, label: RouteLabels.PROFILE }] as NavLinkObj[];

    const generateNavLink = (link: NavLinkObj): JSX.Element => <NavLink key={link.to} {...link}></NavLink>;

    return (
        <nav className="nav-bar no-select">
            <div id="navContainer" className="app-container">
                <span className="app-title">Episode Manager</span>
                {navLinksLeft.map(generateNavLink)}
                <span className="spacer"></span>
                {navLinksRight.map(generateNavLink)}
            </div>
        </nav>
    );
};

export default Header;
