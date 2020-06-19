import React from 'react';
import Header from '../components/Header';
import {MDBContainer} from 'mdbreact';
import Alert from '../components/Alert'

const Layout = ( props ) => {
    return (
        <div> 
            <Header />
            <div style={{height:"60px"}}></div>
            <Alert />
            <MDBContainer>
                { props.children }
            </MDBContainer>    
        </div>   
    )
}
export default Layout;