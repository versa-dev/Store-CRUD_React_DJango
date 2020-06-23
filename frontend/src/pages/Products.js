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



const Products = ({ category_id, category_list }) => {
    const [addToggle, setAddToggle] = useState(false);
    const addClick = () => { setAddToggle(!addToggle) };

    ///--------------- For pagination and display users-------------///
    const [ totalProduct, setTotalProduct ] = useState([]);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [previous, setPrevious] = useState('');
    const [next, setNext] = useState('');
    const [active, setActive] = useState(1);
    const [pages, setPages] = useState(0);
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
                if (category_id === 0) {
                    setProducts(res.data.results);
                    setCount(res.data.count);
                    setPages(res.data.count)
                }
                else {
                
                    let all = []
                    for (let i = 1; i < (pages / 5 + 1); i++) {
                        const res = await axios.get(`/api/products/?page=${i}`, config)
                        all.push(res.data.results)
                    }
                    all = [].concat.apply([], all);
                    let filtered_products = all.filter(function (el) { return el.category === category_id })
                    setProducts(filtered_products);
                    setTotalProduct(all);
                    setCount(filtered_products.length);
                }
                setPrevious(res.data.previous);
                setNext(res.data.next);
            }
            catch (err) {
            }
        }
        fetchData();
    }, [category_id])
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

    //////------------------Create Product-----------///////
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        description: ''
    })
    const { name, price, category, description } = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })

    const onSave = async (e) => {
        e.preventDefault();
        if (name===""|price===""|category===null|description===null){
            alert("Field cant be empty")
        }
        const body = {
            name, price, description, category
        }
        const res = await axios.post('/api/products/', body, config);
        setAddToggle(false);
        const res1 = await axios.get('/api/products/', config);
        setProducts(res1.data.results);
        setCount(res1.data.count);
    }

    //////--------Remove product--------------//////////
    const onRemove = async(id) => {
        alert(`Are you sure to remove products ${id}?`);
        const res = await axios.delete(`/api/products/${id}/`, config);
        const res1 = await axios.get('/api/products/', config);
        setProducts(res1.data.results);  
        setCount(res1.data.count);  
    }

    //////--------Update product--------------//////////
    const [editToggle, setEditToggle] = useState(-1);
    const [updateFormData, setUpdateFormData] = useState({
        update_name: "",
        update_price: "",
        update_category: "",
        update_description: ""
    })
    const { update_name, update_price, update_category, update_description } = updateFormData;

    const [currentPage, setCurrentPage] = useState(0);
    const editClick = (id) => { 
        setEditToggle(id);
        let edit_product = products.filter(function (el) { return el.id === id })[0];
        setUpdateFormData({
            update_name: edit_product.name,
            update_price: edit_product.price,
            update_category: edit_product.category,
            update_description: edit_product.description
        })     
    };
    
    const onUpdateChange = (e) => setUpdateFormData({
            ...updateFormData,
            [e.target.name]: e.target.value
    })
    const onUpdate = async(e) => {
        e.preventDefault();
        const body = {
            "name":update_name, 
            "price":update_price, 
            "description":update_description,
            "category": update_category
        }
        const res = await axios.put(`/api/products/${editToggle}/`, body, config);
        
        setEditToggle(false);
        const res1 = await axios.get(`/api/products/?page=${currentPage}`, config);
        setProducts(res1.data.results);
        setCount(res1.data.count);
    }

    return (
        <div>
            <MDBBtn> {count} Products</MDBBtn>
            <MDBBtn onClick={addClick}><MDBIcon icon="plus-circle" /> Add New Product </MDBBtn>
            {
                    addToggle ?
                    <form>
                        <MDBInput label="Product Name" name="name" value={name} onChange={e => onChange(e)} outline />
                        <MDBInput label="Price" name="price" value={price} onChange={e => onChange(e)} outline />
                        <select className="browser-default custom-select" name="category" value={category} onChange={e => onChange(e)}>
                            <option>Category</option>
                            {
                                category_list.map(category => {
                                    return (
                                        <option value={`${category.id}`}>{category.name}</option>
                                    )
                                })
                            }
                        </select>
                        <MDBInput type="textarea" label="Description" outline name="description" value={description} onChange={e => onChange(e)}/>
                        <MDBRow className={styles.addrow}>
                            <MDBBtn color="warning" className={styles.editbtn} onClick={onSave}><MDBIcon far icon="save" /> Save</MDBBtn>
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
                products !== null?
                    products.map((product) => {
                        return (
                            <div>
                                {
                                    product.id !== editToggle ?
                                        <MDBCard key={product.id} className={styles.card_item}>
                                        <MDBCardTitle>{product.name}
                                            <MDBBadge pill color="info" className={styles.badge_item}>${product.price}</MDBBadge>
                                        </MDBCardTitle>
                                        <MDBCardText>
                                            <MDBRow>
                                                <MDBCol>
                                                    {product.description}
                                                </MDBCol>
                                                <MDBCol>
                                                    <Fragment className={styles.btngroup}>
                                                        <MDBBtn color="success" className={styles.editbtn} onClick={()=>onRemove(product.id)}>Remove</MDBBtn>
                                                        <MDBBtn color="secondary" className={styles.editbtn} onClick={() => editClick(product.id)}>Edit</MDBBtn>
                                                    </Fragment>
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBCardText>
                                    </MDBCard>
                                    :
                                        <form>
                                            <MDBInput label="Product Name" outline value={update_name} name="update_name" onChange={onUpdateChange} />
                                            <MDBInput label="Price" outline value={update_price} name="update_price" onChange={onUpdateChange} />
                                            <select className="browser-default custom-select" value={update_category} name="update_category" onChange={onUpdateChange}>
                                                <option>Category</option>
                                                {
                                                    category_list.map(category => {
                                                        return (
                                                            <option value={`${category.id}`}>{category.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <MDBInput type="textarea" label="Description" outline value={update_description} name="update_description" onChange={onUpdateChange}/>
                                            <MDBRow className={styles.addrow}>
                                                <MDBBtn color="warning" className={styles.editbtn} onClick={onUpdate}><MDBIcon far icon="save" /> Update</MDBBtn>
                                                <MDBBtn color="danger" className={styles.editbtn} onClick={() => setEditToggle(0)}><MDBIcon icon="undo" /> Cancel</MDBBtn>
                                            </MDBRow>
                                        </form>
                                }
                            </div>
                        )
                    })
                :
                ""
            }
        </div>
    )
}
Products.propTypes = {
    category_id: PropTypes.number.isRequired,
    category_list: PropTypes.array.isRequired
}
const mapStateToProps = (state) => {
    return {
        category_id: state.category.category_id,
        category_list: state.category.category_list
    }
}

export default connect(mapStateToProps, null)(Products);