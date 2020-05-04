import React from 'react';
import { useAuth0 } from '../../helpers/reactAuth0Spa';
import useIsAuthorizedFor from '../../hooks/useIsAuthorizedFor';
import Permissions from '../../models/enums/Permissions';
import { Route, RouteLabel } from '../../models/enums/Routes';
import NavLinkObj from '../../models/NavLink';
import './Header.scss';
import NavLink from './NavLink';

const Header: React.FC = (): JSX.Element => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    const { isAuthorized: adminScreenAuthorized } = useIsAuthorizedFor(Permissions.READ_ADMIN);

    const navLinksLeft = [
        { id: 1, to: Route.HOMEPAGE, exact: true, label: RouteLabel.HOMEPAGE },
        { id: 3, to: Route.SHOWS, label: RouteLabel.SHOWS },
        { id: 5, to: Route.ADMIN, label: RouteLabel.ADMIN, visible: adminScreenAuthorized },
        { id: 4, to: Route.HELP, label: RouteLabel.HELP },
    ] as NavLinkObj[];

    const navLinksRight = [
        { id: 6, to: Route.PROFILE, label: RouteLabel.PROFILE },
        { id: 7, label: RouteLabel.LOG_OUT, action: logout },
        { id: 8, label: RouteLabel.LOG_IN, visible: !isAuthenticated, action: loginWithRedirect },
    ] as NavLinkObj[];

    const generateNavLink = ({ visible = isAuthenticated, ...link }: NavLinkObj): JSX.Element => {
        return visible ? <NavLink key={link.id} {...link}></NavLink> : <React.Fragment key={link.id}></React.Fragment>;
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
