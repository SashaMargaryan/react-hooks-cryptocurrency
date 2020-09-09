import React from 'react';

const Select = ({  handleChengeSelect , perPage  }) => {
    return (
        <div>
            <select value={perPage} onChange={ handleChengeSelect}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="50">50</option>
            </select>
        </div>
    )
}
export default Select;