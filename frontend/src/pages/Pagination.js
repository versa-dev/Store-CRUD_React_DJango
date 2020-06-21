import React from 'react';
import PropTypes from 'prop-types';

import styles from './Pagination.module.css';

const Pagination = (props) => {
    const getNumbers = () => {
        let numbers = [];
        let itemsPerPage = props.itemsPerPage;
        let pageNumber = 1;

        for (let i = 0; i < props.count; i += itemsPerPage) {
            const page = pageNumber;
            let content = null;
            if ( props.active === page ){
                content = (
                    <div key={i} className={styles.activepageNumber}>
                        {pageNumber}
                    </div>
                )
            }
            else {
                content = (
                    <div key={i} className={styles.pageNumber} onClick={()=> props.visitPage(page)}>
                        {pageNumber}
                    </div>
                )
            } 
            numbers.push(
                content
            );
            pageNumber++;
        }
        return numbers;
    }
    return(
        <div className={styles.pagination}>
            <div onClick={()=>props.previous()} className={styles.pageNumber}>
                Prev
            </div>
            {getNumbers()}
            <div onClick={()=>props.next()} className={styles.pageNumber}>
                Next
            </div>            
        </div>
    )
}
Pagination.propTypes = {
    itemsPerPage: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    active: PropTypes.number.isRequired,
    visitPage: PropTypes.func.isRequired,
    previous: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired
}
export default Pagination;