import React, { useState, Fragment, useEffect } from 'react';
import {
    MDBCard, MDBCardBody, MDBCardText, MDBBtn, MDBCardTitle, MDBBadge,
    MDBIcon, MDBInput, MDBRow, MDBCol
} from 'mdbreact';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './Products.module.css';
import Pagination from './Pagination';



const Products = ({category_id}) => {
    const [addToggle, setAddToggle] = useState(false);
    const addClick = () => { setAddToggle(!addToggle) };

    const [editToggle, setEditToggle] = useState(-1);
    const editClick = (id) => { setEditToggle(id) };

    ///--------------- For pagination and display users-------------///
    const [products, setProducts] = useState([]);
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
        window.scrollTo(0, 0);
        
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/products', config);
                if (category_id == 0)
                    setProducts(res.data.results);
                else 
                    setProducts(res.data.results.filter(function(el){
                        return el.filter=category_id
                    }))
                setCount(res.data.count);
                setPrevious(res.data.previous);
                setNext(res.data.next);
            }
            catch (err) {

            }
        }
        fetchData();
    }, [])
    const previous_number = () => {
        axios.get(previous, config)
            .then(res => {
                setProducts(res.data.results);
                setPrevious(res.data.previous);
                setNext(res.data.next);
                if (previous)
                    setActive(active - 1);
            })
            .catch(err => {

            })
    };
    const next_number = () => {
        axios.get(next, config)
            .then(res => {
                setProducts(res.data.results);
                setPrevious(res.data.previous);
                setNext(res.data.next);
                if (next)
                    setActive(active + 1);
            })
            .catch(err => {

            })
    }
    const visitPage = (page) => {
        axios.get(`/api/products/?page=${page}`, config)
            .then(res => {
                setProducts(res.data.results);
                setPrevious(res.data.previous);
                setNext(res.data.next);
                setActive(page);
            })
            .catch(err => { });
    };

    return (
        <div>
            <MDBBtn> {count} Products</MDBBtn>
            <MDBBtn onClick={addClick}><MDBIcon icon="plus-circle" /> Add New Product </MDBBtn>
            {
                addToggle ?
                    <form>
                        <MDBInput label="Product Name" outline />
                        <MDBInput label="Price" outline />
                        <select className="browser-default custom-select">
                            <option>Category</option>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                        </select>
                        <MDBInput type="textarea" label="Description" outline />
                        <MDBRow className={styles.addrow}>
                            <MDBBtn color="warning" className={styles.editbtn}><MDBIcon far icon="save" /> Save</MDBBtn>
                            <MDBBtn color="danger" className={styles.editbtn} onClick={() => setAddToggle(false)}><MDBIcon icon="undo" /> Cancel</MDBBtn>
                        </MDBRow>
                    </form>
                    :
                    null
            }
            <Pagination
                itemsPerPage={5}
                count={count}
                visitPage={visitPage}
                previous={previous_number}
                next={next_number}
                active={active}
                setActive={setActive}
            />
            {
                products.map(producut => {
                    return (
                        <div>
                            {
                                producut.id !== editToggle ?
                                    <MDBCard key={producut.id} className={styles.card_item}>
                                        <MDBCardTitle>{producut.name}
                                            <MDBBadge pill color="info" className={styles.badge_item}>${producut.price}</MDBBadge>
                                        </MDBCardTitle>
                                        <MDBCardText>
                                            <MDBRow>
                                                <MDBCol>
                                                    {producut.description}({producut.category})
                                                </MDBCol>
                                                <MDBCol>
                                                    <Fragment className={styles.btngroup}>
                                                        <MDBBtn color="success" className={styles.editbtn}>Remove</MDBBtn>
                                                        <MDBBtn color="secondary" className={styles.editbtn} onClick={() => editClick(producut.id)}>Edit</MDBBtn>
                                                    </Fragment>
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBCardText>
                                    </MDBCard>
                                    :
                                    <form>
                                        <MDBInput label="Product Name" outline value={producut.name} />
                                        <MDBInput label="Price" outline value={producut.price} />
                                        <select className="browser-default custom-select">
                                            <option>Category</option>
                                            <option value="1">Option 1</option>
                                            <option value="2">Option 2</option>
                                            <option value="3">Option 3</option>
                                        </select>
                                        <MDBInput type="textarea" label="Description" outline value={producut.description} />
                                        <MDBRow className={styles.addrow}>
                                            <MDBBtn color="warning" className={styles.editbtn}><MDBIcon far icon="save" /> Save</MDBBtn>
                                            <MDBBtn color="danger" className={styles.editbtn} onClick={() => editClick(-1)}><MDBIcon icon="undo" /> Cancel</MDBBtn>
                                        </MDBRow>
                                    </form>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}
Products.propTypes = {
    category_id: PropTypes.number.isRequired
}
const mapStateToProps = ( state ) => {
    console.log(state.category)
    return {
       
        category_id: state.category.category_id
    }
} 

export default connect(mapStateToProps, null)(Products);