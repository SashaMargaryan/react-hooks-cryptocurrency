import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config';
import { renderChangePercent } from '../../helpers';
import Loading from '../common/Loading';
import './Detail.css';

const Detail = (props) => {
    const currencyId = props.match.params.id;
    const pathName = props.location.pathname;
    const [currency, setCurrency] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect (() => {
        setLoading(true);
        ( async () => {
            try {
                const respons = await fetch(`${API_URL}/cryptocurrencies/${currencyId}`);
                if(respons.ok) {
                    const data = await respons.json();
                    setCurrency(data);
                    setLoading(false);
                    // console.log(data)
                }else {
                    const error = await respons.json();
                    throw new Error(error.errorMessage);
                }
            } catch (error) {
                setLoading(false);
                setError("Currency with given id not found.")
            }
        })()
    },[pathName]);

    const handleBack = () => {
        props.history.goBack()
      }

    if(loading) {
        return <div className="loading-container"><Loading /></div>
    }
    if(error) {
        return <div className="error">{error}</div>
    }

    return (
        <div className="Detail">
            <button className={"Detail-btn"} onClick={handleBack}> <span className="Detail-span">&larr;</span> Back</button>
             <h1 className="Detail-heading">
                {currency.name} ({currency.symbol})
            </h1>

             <div className="Detail-container">
                <div className="Detail-item">
                    Price <span className="Detail-value">$ {currency.price}</span>
                </div>

                <div className="Detail-item">   
                    Rank <span className="Detail-value">{currency.rank}</span>
                </div>

                <div className="Detail-item">
                    24H Change
                    <span className="Detail-value">{renderChangePercent(currency.percentChange24h)}</span>
                </div>


                <div className="Detail-item">
                    <span className="Detail-title">Market cap</span>
                    <span className="Detail-dollar">$</span>
                    {currency.marketCap}
                </div>

                 <div className="Detail-item">
                    <span className="Detail-title">24H Volume</span>
                    <span className="Detail-dollar">$</span>
                    {currency.volume24h}
                </div>


                <div className="Detail-item">
                    <span className="Detail-title">Total supply</span>
                    {currency.totalSupply}
                </div>
             </div>
             
        </div>
    )
};

export default Detail;