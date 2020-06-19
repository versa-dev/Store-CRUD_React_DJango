import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MDBContainer, MDBAlert } from 'mdbreact';

const Alert = ({alerts}) => alerts!== null && alerts.length>0 && alerts.map(alert=>{
    return (
        <div>
            <MDBAlert key={alert.id} color = {alert.alertType}>
                {alert.msg}
            </MDBAlert>
        </div>
    )
})
Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}
const mapStateToProps = state => ({
    alerts: state.alert
})
export default connect(mapStateToProps)(Alert);