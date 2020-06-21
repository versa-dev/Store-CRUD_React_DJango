import React, { useState, Fragment } from 'react';
import {
    MDBCard, MDBCardBody, MDBCardText, MDBBtn, MDBCardTitle, MDBBadge,
    MDBIcon, MDBInput, MDBRow
} from 'mdbreact';

import styles from './Products.module.css';
import Pagination from './Pagination';

const data = [
    {
        "id": 1,
        "name": "Football Shoe",
        "price": 89.99,
        "description": "Best football shoes ever",
        "category": "shoes"
    },
    {
        "id": 2,
        "name": "Volleyball shoes",
        "price": 149.99,
        "description": "Best football shoes ever",
        "category": "wears"
    },
    {
        "id": 3,
        "name": "Football Shoe",
        "price": 199.99,
        "description": "Best football shoes ever",
        "category": "rats"
    },
    {
        "id": 4,
        "name": "Volleyball shoes",
        "price": 249.99,
        "description": "Best football shoes ever",
        "category": "insturument"
    },
]


const Products = () => {
    const [addToggle, setAddToggle] = useState(false);
    const addClick = () => { setAddToggle(!addToggle) };

    const [editToggle, setEditToggle] = useState(-1);
    const editClick = (id) => { setEditToggle(id) };

    const options = [
        {
            text: "Option 1",
            value: "1"
        },
        {
            text: "Option 2",
            value: "2"
        },
        {
            text: "Option 3",
            value: "3"
        }
    ]
    return (
        <div>
            <MDBBtn> 100 Products</MDBBtn>
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
                            <MDBBtn color="danger" className={styles.editbtn} onClick={()=>setAddToggle(false)}><MDBIcon icon="undo" /> Cancel</MDBBtn>
                        </MDBRow>
                    </form>
                    :
                    null
            }
            <Pagination />
            {
                data.map(producut => {
                    return (
                        <div>
                            {
                                producut.id !== editToggle ?
                                    <MDBCard key={producut.id} className={styles.card_item}>
                                        <MDBCardTitle>{producut.name}
                                            <MDBBadge pill color="info" className={styles.badge_item}>${producut.price}</MDBBadge>
                                        </MDBCardTitle>
                                        <MDBCardText>{producut.description}({producut.category})
                                        <Fragment className={styles.btngroup}>
                                                <MDBBtn color="success" className={styles.editbtn}>Remove</MDBBtn>
                                                <MDBBtn color="secondary" className={styles.editbtn} onClick={() => editClick(producut.id)}>Edit</MDBBtn>
                                            </Fragment>
                                        </MDBCardText>
                                    </MDBCard>
                                    :
                                    <form>
                                        <MDBInput label="Product Name" outline value={producut.name}/>
                                        <MDBInput label="Price" outline value={producut.price}/>
                                        <select className="browser-default custom-select">
                                            <option>Category</option>
                                            <option value="1">Option 1</option>
                                            <option value="2">Option 2</option>
                                            <option value="3">Option 3</option>
                                        </select>
                                        <MDBInput type="textarea" label="Description" outline value={producut.description}/>
                                        <MDBRow className={styles.addrow}>
                                            <MDBBtn color="warning" className={styles.editbtn}><MDBIcon far icon="save" /> Save</MDBBtn>
                                            <MDBBtn color="danger" className={styles.editbtn} onClick={()=>editClick(-1)}><MDBIcon icon="undo" /> Cancel</MDBBtn>
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

export default Products;