import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  MDBInput
} from "mdbreact";
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../actions/auth';
import styles from './Login.module.css';



const Login = ({login,isAuthenticated}) => {
  
  const [formData, setFormData] = useState({
      email: '',
      password: ''
  });
  const { email, password } = formData;

  const onChange = e => setFormData({
      ...formData,
      [e.target.name]: e.target.value
  })
  const onSubmit = e => {
      e.preventDefault();
      login(email, password);
  }

  useEffect(()=>{
    isAuthenticated = isAuthenticated || (localStorage.getItem('token'))
  })
  if (isAuthenticated)
      return <Redirect to='/main' />
  return (
    <MDBContainer >
      <MDBRow >
        <MDBCol md="4" className={styles.loginform}>
          <MDBCard className={styles.logincard}>
            <MDBCardBody>
              <MDBCardHeader className={styles.cardheader} >
                <h3 className="my-3">
                  <MDBIcon icon="lock" /> Login:
                </h3>
              </MDBCardHeader>
              <form>
                <div className="grey-text">
                  <MDBInput
                    label="Type your email"
                    icon="envelope"
                    group
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => onChange(e)}
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Type your password"
                    icon="lock"
                    group
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => onChange(e)}
                    validate
                  />
                </div>

              <div className="text-center mt-4">
                <MDBBtn
                  color="light-blue"
                  className="mb-3"
                  type="submit"
                  onClick={onSubmit}
                >
                  Login
                </MDBBtn>
              </div>
              </form>
              <MDBModalFooter>
                <div className="font-weight-light">
                  <p>Not a member? <a className={styles.a_link} href="/signup">Sign Up</a></p>
                </div>
              </MDBModalFooter>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}
const mapStateToProps = state => {
  return {
      isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps, { login })(Login);