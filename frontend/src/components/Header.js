import React, { Fragment, useEffect } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBCollapse, MDBNavItem, MDBNavLink, MDBRow } from 'mdbreact';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import PropTypes from 'prop-types';
import Alert from './Alert';


const Header = ({ auth: { isAuthenticated, loading }, logout }) => {
  const bgPink = { backgroundColor: '#e91e63' }
  const container = { height: 1300 }
  isAuthenticated = (localStorage.getItem('token')!==null);
  
  return (
    <div>
      <header>
        <MDBNavbar style={bgPink} dark expand="md" scrolling fixed="top">
          <MDBNavbarBrand>
            <strong>Sports Store</strong>
          </MDBNavbarBrand>
          <MDBCollapse navbar>
            <MDBNavbarNav left>
              <MDBNavItem active>
                <MDBNavLink to="/">Home</MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              {
                isAuthenticated ?
                  <MDBNavItem>
                    <MDBNavLink to="/logout" onClick={logout}>Logout</MDBNavLink>
                  </MDBNavItem>
                  :
                  <Fragment>
                    <MDBNavItem>
                      <MDBNavLink to="/login">Login</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="/signup">Signup</MDBNavLink>
                    </MDBNavItem>
                  </Fragment>
              }
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </header>
    </div>
  );
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, { logout })(Header);