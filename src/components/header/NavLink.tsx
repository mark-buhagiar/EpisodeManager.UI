import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import NavLinkObj from '../../models/NavLink';

const NavLink: React.FC<NavLinkObj> = (props: NavLinkObj): JSX.Element => {
    return (
        <RouterNavLink
            className="nav-link"
            activeClassName="active-nav-link"
            to={props.to}
            exact={props.exact ?? false}
        >
            {props.label}
        </RouterNavLink>
    );
};

export default NavLink;
