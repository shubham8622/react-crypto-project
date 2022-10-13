import React, { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {fetchProducts} from '../../store/fetchProduct';
import { useSearchParams } from "react-router-dom";
import {Link} from 'react-router-dom';
import Header from '../Header'
// https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily
const Coin = () => {
    const dispatch = useDispatch();
    const {data} = useSelector((state)=>state.product);
    const [searchParams] = useSearchParams();
    let params = searchParams.get('id');
    let searchData = data.find((ele)=> (ele.id === params)?ele:"");
    useLayoutEffect(()=>{
      dispatch(fetchProducts())
    },[dispatch]);
  
  return (
    <>
      <Header/>
      <section className="detail-view">
          <div className="container">
            <div className="grid-card">
              {
                (searchData !== undefined)?
                [searchData].map((detailCrypto,index)=>{
                    return(
                            <>
                              <Link to={`/coin?id=${detailCrypto.id}`} key={index} className='crypto-links'>
                                <div className="g-card">
                                <div className="coin-detail">
                                  <div className="c-image">
                                    <img src={detailCrypto.image} alt="error" />
                                  </div>
                                  <div className="c-tile">
                                    <h1>{detailCrypto.name}</h1>
                                    <p>{detailCrypto.symbol}</p>
                                  </div>
                                </div>
                                <div className="c-percentage">
                                  <div className="c-per">
                                  {(detailCrypto.ath_change_percentage < 0)?<p className='red'>{detailCrypto.ath_change_percentage}</p>:<p className='green'>{detailCrypto.ath_change_percentage}</p>}
                                  </div>
                                </div>
                                <div className="c-price">
                                  <p>Price ${detailCrypto.current_price}</p>
                                </div>
                                <div className="c-total-supply">
                                  <p><span>Total Supply:</span> {detailCrypto.total_supply} {detailCrypto.symbol}</p>
                                </div>
                                </div>
                              </Link>
                            </>
                      )
                }):""
              }
          </div>
        </div>
      </section>
    </>
  )
}

export default Coin