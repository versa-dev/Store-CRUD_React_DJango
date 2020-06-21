import React, { useState, Fragment , useEffect } from 'react';
import axios from 'axios';
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

    ///--------------- For pagination and display users-------------///
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(0);
    const [previous, setPrevious] = useState('');
    const [next, setNext] = useState('');
    const [active, setActive] = useState(1);

    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    };
    useEffect(() => {
        window.scrollTo(0,0);
        
        const fetchData = async() => {
            try {
                const res = await axios.get('/api/accounts/users', config);
                setUsers(res.data.results);
                setCount(res.data.count);
                setPrevious(res.data.previous);
                setNext(res.data.next);
            }
            catch (err) {

            }
        }
        fetchData();
    },[])
    const previous_number = () => {
        axios.get(previous, config)
        .then(res => {
            setUsers(res.data.results);
            setPrevious(res.data.previous);
            setNext(res.data.next);
            if (previous)
                setActive(active-1);
        })
        .catch(err => {

        })
    };
    const next_number = () => {
        axios.get(next, config)
        .then(res => {
            setUsers(res.data.results);
            setPrevious(res.data.previous);
            setNext(res.data.next);
            if (next)
                setActive(active+1);
        })
        .catch(err => {
            
        })
    }
    const visitPage = (page) => {
        axios.get(`/api/accounts/users/?page=${page}`,config)
        .then(res => {
            setUsers(res.data.results);
            setPrevious(res.data.previous);
            setNext(res.data.next);
            setActive(page);
        })
        .catch(err => {});
    };
    return (
        <div>
            <MDBBtn rounded color="success" className={styles.addbtn} onClick={toggleModal}><MDBIcon icon="plus-circle" />&nbsp;&nbsp;Add new user</MDBBtn>
            <MDBTable hover>
                <MDBTableHead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
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
                    <Pagination 
                        itemsPerPage = {5}
                        count = {count}
                        visitPage = {visitPage}
                        previous = {previous_number}
                        next = {next_number}
                        active = {active}
                        setActive = {setActive}
                    />
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