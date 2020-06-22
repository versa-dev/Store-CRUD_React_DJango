import React, { useState, useEffect, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBIcon } from
    "mdbreact";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './MainPage.module.css';
import Users from './Users';
import ProductManage from './ProductManage';
import Contact from './Contact';

const MainPage = ({ is_staff }) => {

    const [activeItemJustified, setActiveItemJustified] = useState("2");
    
    is_staff = is_staff || (localStorage.getItem('is_staff')==='true');
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
                        <MDBIcon icon="envelope" /> About
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
                            <Users />
                        </MDBTabPane>
                    :
                    null
                }
                <MDBTabPane tabId="2" role="tabpanel">
                    <ProductManage />
                </MDBTabPane>
                <MDBTabPane tabId="3" role="tabpanel">
                    <Contact />
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