import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import NavLinkObj from '../../models/NavLink';

const NavLink: React.FC<NavLinkObj> = (props: NavLinkObj): JSX.Element => {
    const navLink = (
        <RouterNavLink
            className="nav-link"
            activeClassName="active-nav-link"
            to={props.to ?? ''}
            exact={props.exact ?? false}
        >
            {props.label}
        </RouterNavLink>
    );

    const clickableButton = (
        <span className="nav-link" onClick={props.action}>
            {props.label}
        </span>
    );

    return !props.to ? clickableButton : navLink;
};

export default NavLink;
