import React from 'react';
import {MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Products from './Products';
import Category from './Category';

const ProductManage = () => {
    return(
        <MDBContainer>
            <MDBRow>
                <MDBCol md="3">
                    <Category />
                </MDBCol>
                <MDBCol md="9">
                    <Products />
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default ProductManage;