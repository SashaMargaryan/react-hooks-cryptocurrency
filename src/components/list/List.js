import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import Table from './Table';
import Pagination from './Pagination';
import Select from './Select';

const List = (props) => {
    const { history } = props;
    const [loading, setLoading] = useState(false);
    const [currencies, setCurrencies] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState( props.match.params.id ? +props.match.params.id : 1);
    const [perPage, setPerPage] = useState(10)
    const [error, setError] = useState('');

    const fetchCurrencies = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=${perPage}`);
            if(response.ok) {
                const data = await response.json();
                // console.log(data)
                setLoading(false);
                setCurrencies(data.currencies);
                setTotalPages(data.totalPages)
            }else {
                const error = await response.json();
                throw new Error (error.errorMessage);
            }
        }catch(err) {
            setLoading(false);
            setError("Currency with given id not found.")
        }
    };

    const handlePaginationClick = (direction) => {
        let nextPage = page;
        nextPage = direction === "next" ? nextPage + 1 : nextPage - 1;
        setPage(nextPage);
    }
    const handleChengeSelect = (event) => {
        const p = event.target.value
        setPerPage(p);
        fetchCurrencies();
    }
    const handleClick = event => {
        setPage(event);
        fetchCurrencies();
    }

    useEffect (() => {
        fetchCurrencies();
        history.push(`/page/${page}`)
    },[page,perPage]);

    if(loading) {
        return <div className="loading-container"><Loading /></div>
    };
    if(error) {
        return <div className="error">{error}</div>
    };

    const pegeNumber = [];
    for(let i=1; i<= totalPages ; i++) {
        pegeNumber.push(i);
    };
   
    return (
        <div>
            <Select  
                handleChengeSelect={ handleChengeSelect} 
                perPage={perPage} 
            />
            <Table 
                currencies={currencies} 
            />
            <Pagination  
                page={page} 
                totalPages={totalPages} 
                handlePaginationClick={handlePaginationClick}
                pegeNumber={pegeNumber}
                handleClick={handleClick}  
            />
        </div>
    )
};

export default List;