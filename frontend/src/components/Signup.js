import React, {useState} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBModalFooter } from 'mdbreact';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signup } from '../actions/auth';
import { setAlert } from '../actions/alert';
import styles from './Signup.module.css';


const Signup = ({ signup, setAlert, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const { name, email, password, password2 } = formData;
    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== password2){
            setAlert('Passwords do not match.', 'warning');
        }
        else
        {
          signup( name, email, password, password2 );
        }
    };
    if (isAuthenticated)
        return <Redirect to='/main' />
        
  return (
    
      <MDBRow>
        <MDBCol md="5" className={styles.signupform}>
          <MDBCard className={styles.signupcard}>
            <MDBCardBody>
              <form>
                <p className="h4 text-center py-4">Sign up</p>
                <div className="grey-text">
                  <MDBInput
                    label="Your name"
                    icon="user"
                    group
                    type="text"
                    name="name"
                    value={name}
                    validate
                    error="wrong"
                    success="right"
                    onChange={e => onChange(e)}
                  />
                  <MDBInput
                    label="Your email"
                    icon="envelope"
                    group
                    type="email"
                    name="email"
                    value={email}
                    validate
                    error="wrong"
                    success="right"
                    onChange={e => onChange(e)}
                  />
                  <MDBInput
                    label="Your password"
                    icon="lock"
                    group
                    type="password"
                    name="password"
                    value={password}
                    validate
                    onChange={e => onChange(e)}
                  />
                  <MDBInput
                    label="Your password"
                    icon="lock"
                    group
                    type="password"
                    name="password2"
                    value={password2}
                    validate
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn color="cyan" type="submit" onClick={onSubmit}>
                    Register
                  </MDBBtn>
                </div>
              </form>
              <MDBModalFooter>
                <div className="font-weight-light">
                  <p>Have an account? <a className={styles.a_link} href="/login">Login</a></p>
                </div>
              </MDBModalFooter>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow> 
  );
};

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => {
  return {
      isAuthenticated: state.auth.isAuthenticated
  }
}
export default connect(mapStateToProps, { setAlert, signup })(Signup);