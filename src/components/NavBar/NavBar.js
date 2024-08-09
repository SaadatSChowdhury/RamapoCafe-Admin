/**/
/*
NavBar::NavBar() - Navigation bar component for the admin panel.

NAME

        NavBar - A React component that provides a navigation bar for the admin panel of the RamapoCafe application.

SYNOPSIS

        const NavBar = () => { ... };

DESCRIPTION

        This component renders a navigation bar that is used across the admin panel pages of the RamapoCafe application. It includes:
        - A left section with the title "RamapoCafe AdminPanel".
        - A right section with two links:
            - "Orders" that navigates to the home page ("/").
            - "Add Food" that navigates to the add food page ("/addFood").

        The navigation links are styled to remove the default text decoration.

RETURNS

        Renders a JSX element that includes a styled navigation bar with links to different sections of the admin panel.
*/
/**/


import React from 'react'
import './NavBar.css'
import {Link} from 'react-router-dom'

const NavBar = () => {
    return (
        <div className="navbar">
            <div className="nav-left">
                <h1>RamapoCafe AdminPanel</h1>
            </div>
            <div className="nav-right">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <p>Orders</p>
                </Link>
                <Link to="/addFood" style={{ textDecoration: 'none' }}>
                    <p>Add Food</p>
                </Link>
            </div>
        </div>
    )
}

export default NavBar