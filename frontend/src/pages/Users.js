import React, { useState, Fragment } from 'react';
import {
    MDBBtn,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBTableFoot,
    MDBIcon,
    MDBPagination,
    MDBPageNav,
    MDBPageItem,
    MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,
    MDBInput
} from 'mdbreact';

import styles from './Users.module.css';
import Pagination from './Pagination';

const users = [
    {
        "id": 1,
        "name": "user",
        "email": "user@gmail.com"
    },
    {
        "id": 2,
        "name": "testuser",
        "email": "testuser@gmail.com"
    },
    {
        "id": 3,
        "name": "user",
        "email": "user@gmail.com"
    },
    {
        "id": 4,
        "name": "testuser",
        "email": "testuser@gmail.com"
    },
    {
        "id": 5,
        "name": "user",
        "email": "user@gmail.com"
    },
    {
        "id": 6,
        "name": "testuser",
        "email": "testuser@gmail.com"
    }
]
const Users = () => {
    const [toggle, setToggle] = useState(false);

    const toggleModal = () => { setToggle(!toggle) };

    const [update, setUpdate] = useState(0);

    const toggleUpdate = userid => { setUpdate(userid) };
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

    return (
        <div>
            <MDBBtn rounded color="success" className={styles.addbtn} onClick={toggleModal}><MDBIcon icon="plus-circle" />&nbsp;&nbsp;Add new user</MDBBtn>
            <MDBTable hover>
                <MDBTableHead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {users.map(user => {
                        return (<tr>
                            <td>{user.id}</td>
                            <td>
                                {update !== user.id ?
                                    user.name
                                :
                                    <input value={user.name}/>
                                }
                            </td>
                            <td>
                                {update !== user.id ?
                                    user.email
                                :
                                    <input value={user.email}/>
                                }
                            </td>
                            <td style={{ alignItems: "center" }}>     
                                {
                                    update !== user.id ?
                                    <Fragment>
                                        <MDBBtn color="info" className={styles.editbtn} onClick={()=>toggleUpdate(user.id)}><MDBIcon icon="user-edit" />&nbsp;&nbsp;Edit</MDBBtn>
                                        <MDBBtn color="dark" className={styles.editbtn}><MDBIcon icon="user-minus" />&nbsp;&nbsp;Remove</MDBBtn>
                                    </Fragment>
                                    :
                                    <Fragment>
                                        <MDBBtn color="info" className={styles.editbtn} onClick={()=>toggleUpdate(0)}><MDBIcon icon="undo" />&nbsp;&nbsp;Undo</MDBBtn>
                                        <MDBBtn color="warning" className={styles.editbtn}><MDBIcon far icon="save" />&nbsp;&nbsp;Save</MDBBtn>
                                    </Fragment>
                                }       
                            </td>
                        </tr>)
                    })}
                </MDBTableBody>
                <MDBTableFoot>
                    <Pagination />
                </MDBTableFoot>
            </MDBTable>
            <MDBModal isOpen={toggle} toggle={toggleModal}>
                <MDBModalHeader toggle={toggleModal}>Add New User</MDBModalHeader>
                <MDBModalBody>
                    <form>
                        <div className="grey-text">
                            <MDBInput
                                label="User name"
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
                                label="User email"
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
                                label="User password"
                                icon="lock"
                                group
                                type="password"
                                name="password"
                                value={password}
                                validate
                                onChange={e => onChange(e)}
                            />
                            <MDBInput
                                label="Confirm password"
                                icon="lock"
                                group
                                type="password"
                                name="password2"
                                value={password2}
                                validate
                                onChange={e => onChange(e)}
                            />
                        </div>
                    </form>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" className={styles.editbtn} onClick={toggleModal}>Close</MDBBtn>
                    <MDBBtn color="primary" className={styles.editbtn}>Save changes</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </div>
    )
}

export default Users;