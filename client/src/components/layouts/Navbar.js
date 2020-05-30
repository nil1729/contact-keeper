import React, {useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';


const Navbar = ({title, icon}) => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);
    const {isAuthenticated, user, logout} = authContext;
    const {clearContacts } = contactContext;
    const onLogout = ()=>{
        logout();
        clearContacts();
    }
    const authLinks = (
        <>
            <li className="nav-item">
                <p className="nav-link text-light text-capitalize">Hello <span className="font-weight-bold">{user && user.name}</span></p>
            </li>
            <li className="nav-item">
                <span
                    onClick={onLogout}
                    className="nav-link text-light"
                    style={{cursor:'pointer'}}>
                    <i className="fas fa-sign-out-alt mr-2"></i>        
                        Logout
                </span>
            </li>
        </>
    );
    const guestLinks = (
        <>
            <li className="nav-item">
                <Link className="nav-link text-light" to="/">About</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-light" to="/register">Register</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-light" to="/login">Login</Link>
            </li>
        </>
    )
  return (
    <nav className="navbar navbar-dark bg-primary">
        <span className="navbar-brand mb-0 h1 text-light"><i className={icon} style={{fontSize:'1.3em'}}></i> {'  '}{title}</span>
        <ul className="nav">
            {
                isAuthenticated ? authLinks : guestLinks
            }
        </ul>
    </nav>
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
