import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';


const Navbar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);
    const { isAuthenticated, user, logout, loadUser, loading } = authContext;
    const { clearContacts } = contactContext;
    const onLogout = () => {
        logout();
        clearContacts();
    }
    const [timer, setTimer] = useState(loading);
    useEffect(() => {
        if (localStorage.token) {
            loadUser();
        } else {
            setTimeout(() => {
                setTimer(false);
            }, 1500)
        }
        // eslint-disable-next-line
    }, []);

    const authLinks = (
        <>
            <li className="nav-item">
                <NavLink className="nav-link text-light" to="/">About</NavLink>
            </li>
            <li className="nav-item">
                <p className="mb-0 nav-link text-light text-capitalize">Hello <span className="font-weight-bold">{user && user.name}</span></p>
            </li>
            <li className="nav-item">
                <span
                    onClick={onLogout}
                    className="nav-link text-light"
                    style={{ cursor: 'pointer' }}>
                    <i className="fas fa-sign-out-alt mr-2"></i>
                        Logout
                </span>
            </li>
        </>
    );
    const guestLinks = (
        <>
            <li className="nav-item">
                <NavLink className="nav-link text-light" to="/">About</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link text-light" to="/register">Register</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link text-light" to="/login">Login</NavLink>
            </li>
        </>
    )
    return (
        <>
            <nav className="navbar navbar-dark bg-primary">
                <NavLink to="/home" style={{ pointerEvents: isAuthenticated ? '' : 'none' }} className="navbar-brand mb-0 h1 text-light"><i className={icon} style={{ fontSize: '1.3em' }}></i> {'  '}{title}</NavLink>
                <ul className="nav">
                    {
                        isAuthenticated ? authLinks : guestLinks
                    }
                </ul>
            </nav>
            {
                timer && loading && (<div className="intro-loader">
                    <div className="intro-spinner">
                        <div className="rect1"></div>
                        <div className="rect2"></div>
                        <div className="rect3"></div>
                        <div className="rect4"></div>
                        <div className="rect5"></div>
                    </div>
                </div>)
            }

        </>
    )
}

Navbar.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string
}

Navbar.defaultProps = {
    title: 'Contact Keeper',
    icon: 'far fa-address-card'
}
export default Navbar
