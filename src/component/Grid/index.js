import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {fetchProducts} from '../../store/fetchProduct';
import Pagination from '../Pagination/Pagination';
import {Link} from 'react-router-dom';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import './style.css';
const Grid = (props) => {
  const dispatch = useDispatch();
  const {data:coins} = useSelector((state)=>state.product);
  const [currentPage,setCurrentPage] = useState(1);
  const [postPerPage,setPostPerPage] = useState(12);
  useEffect(()=>{
    dispatch(fetchProducts());
  },[dispatch])

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const coinsData = coins.slice(firstPostIndex,lastPostIndex);
  return (
    <>
        <section className={props.data}>
          <div className="container">
            <div className="grid-card">
              {
                coinsData.map((c)=>{
                  return(
                    <>
                      <Link to={`/coin?id=${c.id}`} className='crypto-links'>
                        <div className="g-card" key={c.id}>
                        <div className="coin-detail">
                          <div className="c-image">
                            <img src={c.image} alt="error" />
                          </div>
                          <div className="c-tile">
                            <h1>{c.name}</h1>
                            <p>{c.symbol}</p>
                          </div>
                        </div>
                        <div className="c-percentage">
                          <div className="c-per">
                          {(c.market_cap_change_percentage_24h < 0)?<><p className='red'>{c.market_cap_change_percentage_24h.toFixed(2)}%</p><div className="down-trend"><TrendingDownIcon/></div></>:<><p className='green'>{c.market_cap_change_percentage_24h.toFixed(2)}%</p><div className="up-trend"><TrendingUpIcon/></div></>}
                          </div>
                        </div>
                        <div className="c-price">
                          {(c.market_cap_change_percentage_24h < 0)?<p className="red price-color">${c.current_price}</p>:<p className='green price-color'>${c.current_price}</p>}
                        </div>
                        <div className="c-total-supply">
                          <p><span>Total Supply:</span> {c.total_supply} {c.symbol}</p>
                        </div>
                        </div>
                      </Link>
                    </>
                  )
                })
              }
            </div>
            <Pagination totalPosts={coins.length} postPerPage={postPerPage} setCurrentPage = {setCurrentPage} currentPage={currentPage}/>
          </div>
        </section>
    </>
  )
}

export default Grid