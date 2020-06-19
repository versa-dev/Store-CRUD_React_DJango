import React, { useState, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBIcon } from
    "mdbreact";

import styles from './MainPage.module.css';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const MainPage = ({ is_staff }) => {

    const [activeItemJustified, setActiveItemJustified] = useState("1");

    const toggleJustified = tab => e => {
        if (activeItemJustified !== tab) {
            setActiveItemJustified(tab)
        }
    };

    return (
        <MDBContainer>
            <MDBNav className={styles.tab_header} >
                {
                    is_staff ?
                        <MDBNavItem className={styles.tab_item}>
                            <MDBNavLink className={activeItemJustified === "1" ? styles.act : styles.tab_link} to="#" active={activeItemJustified === "1"} onClick={toggleJustified("1")} role="tab" >
                                <MDBIcon icon="user" /> User Management
                            </MDBNavLink>
                        </MDBNavItem>
                        :
                        null
                }
                <MDBNavItem className={styles.tab_item}>
                    <MDBNavLink className={activeItemJustified === "2" ? styles.act : styles.tab_link} to="#" active={activeItemJustified === "2"} onClick={toggleJustified("2")} role="tab" >
                        <MDBIcon icon="heart" /> Products
                    </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem className={styles.tab_item}>
                    <MDBNavLink className={activeItemJustified === "3" ? styles.act : styles.tab_link} to="#" active={activeItemJustified === "3"} onClick={toggleJustified("3")} role="tab" >
                        <MDBIcon icon="envelope" /> Contact
                    </MDBNavLink>
                </MDBNavItem>
            </MDBNav>
            <MDBTabContent
                className={styles.tab_content}
                activeItem={activeItemJustified}
            >
                {
                    is_staff ?
                        <MDBTabPane tabId="1" role="tabpanel">
                            <p className="mt-2">
                                User Management
                            </p>
                        </MDBTabPane>
                    :
                    null
                }
                <MDBTabPane tabId="2" role="tabpanel">
                    <p className="mt-2">
                        This is products page.
                    </p>
                </MDBTabPane>
                <MDBTabPane tabId="3" role="tabpanel">
                    <p className="mt-2">
                        Contact pages
                    </p>
                </MDBTabPane>
            </MDBTabContent>
        </MDBContainer>
    );
}

MainPage.propTypes = {
    is_staff: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
    return {
        is_staff: state.auth.is_staff
    }
}
export default connect(mapStateToProps, null)(MainPage);