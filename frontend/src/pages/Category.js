import React, { useState, useEffect } from 'react';
import { MDBBadge, MDBBtn, MDBIcon, MDBInput, MDBRow } from 'mdbreact'
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './Category.module.css';
import { update_category, set_category } from '../actions/category';


const Category = ({update_category, set_category}) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    };
    const [data, setData] = useState([]);
    const fetchData = async() => {
        try {
            const res = await axios.get('/api/category/', config);
            console.log(res)
            let pages = res.data.count;
            let all = []
            for (var i = 1; i < pages / 5 + 1; i++){
                const res1 = await axios.get(`/api/category/?page=${i}`, config)
                all.push(res1.data.results)
            }
            all = [].concat.apply([], all);
            setData(all);
            update_category(all);
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        window.scrollTo(0,0);  
        fetchData();
    },[])
    const [addToggle, setAddToggle] = useState(false);
    const addClick = () => { setAddToggle(!addToggle) };

    const [name, setName] = useState("");

    const onChange = (e) => {
        setName(e.target.value);
    }
    const onSubmit = async (e) => {
        
        e.preventDefault();
        const stock = 0;
        const body = { 
            "name":name, "stock":stock };
        try{
            const res = await axios.post('/api/category/', body, config);
            
            setAddToggle(false)
            const res2 = await axios.get('/api/category/', config);
            let pages = res2.data.count;
            let all = []
            for (var i = 1; i < pages / 5 + 1; i++){
                const res1 = await axios.get(`/api/category/?page=${i}`, config)
                all.push(res1.data.results)
            }
            all = [].concat.apply([], all);
            setData(all);
            update_category(all);  
        }
        catch(err){
            console.log(err);
        }   
    }
    return (
        <div>
            <MDBBtn onClick={addClick}> <MDBIcon icon="plus-circle" /> Add New Category</MDBBtn>
            {
                addToggle ?
                    <form>
                        <MDBInput label="Category Name" outline onChange={e => onChange(e)} name="name"
                                value={name}/>
                        <MDBRow className={styles.addrow}>
                            <MDBBtn color="warning" className={styles.editbtn} onClick={onSubmit}><MDBIcon far icon="save" />Add</MDBBtn>
                            <MDBBtn color="danger" className={styles.editbtn} onClick={()=>setAddToggle(false)}><MDBIcon icon="undo" />Cancel</MDBBtn>
                        </MDBRow>
                    </form>
                : null 
            }
            <div className={styles.category_item} key={0} onClick={()=>set_category(0)}>
                All
            </div>
            {
                data.map(cat => {
                    return (
                        <div className={styles.category_item} key={cat.id} onClick={()=>set_category(cat.id)} >
                            {cat.name}
                        </div>
                    )
                })
            }
        </div>
    )
}

Category.propTypes = {
    update_category: PropTypes.func.isRequired,
    set_category: PropTypes.func.isRequired
}
export default connect(null,{update_category, set_category})(Category);