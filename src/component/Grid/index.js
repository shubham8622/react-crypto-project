import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {fetchProducts} from '../../store/fetchProduct';
import Pagination from '../Pagination/Pagination';
import {Link} from 'react-router-dom';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import './style.css';
import rank1 from '../../images/badge.png';
import rank2 from '../../images/second-rank.png';
import rank3 from '../../images/third-rank.png';
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
                (coinsData)?coinsData.map((c)=>{
                  return(
                    <>
                      <Link to={`/coin?id=${c.id}`} className={`crypto-links ${(c.market_cap_change_percentage_24h < 0)?"red-box":"green-box"}`}>
                        <div className="g-card" key={c.id}>
                        <div className="coin-detail">
                          <div className="coin-img">
                            <div className="c-image">
                              <img src={c.image} alt="error" />
                            </div>
                            <div className="c-tile">
                              <h1>{c.name}</h1>
                              <p>{c.symbol}</p>
                            </div>
                          </div>
                            {(c.market_cap_rank === 1)?<><div className="rank"><img src = {rank1} alt="error"/></div></>:(c.market_cap_rank === 2)?<><div className="rank"><img src = {rank2} alt="error"/></div></>:(c.market_cap_rank === 3)?<><div className="rank"><img src = {rank3} alt="error"/></div></>:null}
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
                          <p><span>Total Supply:</span> {c.total_supply}</p>
                          <p><span>Total Volume:</span> {c.total_volume}</p>
                        </div>
                        </div>
                      </Link>
                    </>
                  )
                }):"Loading"
              }
            </div>
            <Pagination totalPosts={coins.length} postPerPage={postPerPage} setCurrentPage = {setCurrentPage} currentPage={currentPage}/>
          </div>
        </section>
    </>
  )
}

export default Grid