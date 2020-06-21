import React, { useState } from 'react';
import { MDBBadge, MDBBtn, MDBIcon, MDBInput, MDBRow } from 'mdbreact'
import styles from './Category.module.css';

const data = [
    {
        "id": 3,
        "name": "Shoes",
        "stock": 2
    },
    {
        "id": 4,
        "name": "Wear",
        "stock": 1
    },
    {
        "id": 3,
        "name": "Shoes",
        "stock": 2
    },
    {
        "id": 4,
        "name": "Wear",
        "stock": 1
    },
]

const Category = () => {

    const [addToggle, setAddToggle] = useState(false);
    const addClick = () => { setAddToggle(!addToggle) };
    return (
        <div>
            <MDBBtn onClick={addClick}> <MDBIcon icon="plus-circle" /> Add New Category</MDBBtn>
            {
                addToggle ?
                    <form>
                        <MDBInput label="Category Name" outline />
                        <MDBRow className={styles.addrow}>
                            <MDBBtn color="warning" className={styles.editbtn}><MDBIcon far icon="save" />Add</MDBBtn>
                            <MDBBtn color="danger" className={styles.editbtn} onClick={()=>setAddToggle(false)}><MDBIcon icon="undo" />Cancel</MDBBtn>
                        </MDBRow>
                    </form>
                : null 
            }
            <div className={styles.category_item} key={0}>
                All
            </div>
            {
                data.map(cat => {
                    return (
                        <div className={styles.category_item} key={cat.id} >
                            {cat.name}
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Category;