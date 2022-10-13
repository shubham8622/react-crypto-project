import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {fetchProducts} from '../../store/fetchProduct';
import './style.css';
const Grid = (props) => {
  const dispatch = useDispatch();
  const {data:coins} = useSelector((state)=>state.product);
  useEffect(()=>{
    dispatch(fetchProducts());
  },[])
  return (
    <>
        <section className={props.data}>
          <div className="container">
            <div className="grid-card">
              {
                coins.map((c)=>{
                  return(
                    <>
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
                          {(c.ath_change_percentage < 0)?<p className='red'>{c.ath_change_percentage}</p>:<p className='green'>{c.ath_change_percentage}</p>}
                          </div>
                        </div>
                        <div className="c-price">
                          <p>Price ${c.current_price}</p>
                        </div>
                        <div className="c-total-supply">
                          <p><span>Total Supply:</span> {c.total_supply} {c.symbol}</p>
                        </div>
                      </div>
                    </>
                  )
                })
              }
            </div>
          </div>
        </section>
    </>
  )
}

export default Grid