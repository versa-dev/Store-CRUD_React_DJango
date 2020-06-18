import React from 'react';
import Header from '../components/Header';
import {MDBContainer} from 'mdbreact';

const Layout = ( props ) => {
    return (
        <div> 
            <Header />
            <MDBContainer>
                { props.children }
            </MDBContainer>    
        </div>   
    )
}
export default Layout;