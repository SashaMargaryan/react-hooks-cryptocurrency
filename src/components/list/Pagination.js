import React from 'react';
import "./Pagination.css";

const Pagination = (props) => {

    const { handlePaginationClick, page, totalPages, pegeNumber, handleClick } = props;
    return (
        <div className='Pagination'>

            <span className='Pagination-info'>
                Page <b>{page}</b> of <b>{totalPages}</b>
            </span>
            <br></br>

            <button
                onClick={() => handlePaginationClick('prev')}
                className='Pagination-button'
                disabled={page===1}
            >
                &larr;
            </button>

            <span >
                {pegeNumber.map(p => {
                    return <button className='Pagination-but'  onClick={() => handleClick(p)} key={p} > {p} </button>
                })}
            </span>

            <button
                onClick={() => handlePaginationClick("next")}
                className='Pagination-button'
                disabled={page===totalPages}
            
            >
                &rarr;
            </button>
        
    </div>
    )
}

export default Pagination;