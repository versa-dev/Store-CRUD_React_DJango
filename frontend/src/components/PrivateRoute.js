import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
    let token = localStorage.getItem('token')
    return (
        <Route
            {...rest}
            render={props => token === null ? (<Redirect to='/login' />) : (<Component {...props} />)}
        />
    )
};

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute)
