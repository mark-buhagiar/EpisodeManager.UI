import React from 'react';
import { useAuth0 } from '../../helpers/reactAuth0Spa';
import { Route, RouteLabel } from '../../models/enums/Routes';
import NavLinkObj from '../../models/NavLink';
import './Header.scss';
import NavLink from './NavLink';

const Header: React.FC = (): JSX.Element => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    const navLinksLeft = [
        { id: 1, to: Route.HOMEPAGE, exact: true, label: RouteLabel.HOMEPAGE },
        { id: 2, to: Route.MANAGE_SHOWS, label: RouteLabel.MANAGE_SHOWS },
        { id: 3, to: Route.SHOWS, label: RouteLabel.SHOWS },
        { id: 4, to: Route.HELP, label: RouteLabel.HELP },
        { id: 5, to: Route.ADMIN, label: RouteLabel.ADMIN },
    ] as NavLinkObj[];

    const navLinksRight = [
        { id: 6, to: Route.PROFILE, label: RouteLabel.PROFILE, visible: isAuthenticated },
        { id: 7, label: RouteLabel.LOG_OUT, visible: isAuthenticated, action: logout },
        { id: 8, label: RouteLabel.LOG_IN, visible: !isAuthenticated, action: loginWithRedirect },
    ] as NavLinkObj[];

    const generateNavLink = (link: NavLinkObj): JSX.Element => {
        return link.visible ? (
            <NavLink key={link.id} {...link}></NavLink>
        ) : (
            <React.Fragment key={link.id}></React.Fragment>
        );
    };

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
