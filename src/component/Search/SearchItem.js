import { useLayoutEffect } from "react";
import { useDispatch,useSelector } from "react-redux"
import {fetchProducts} from '../../store/fetchProduct';
import {Link} from 'react-router-dom';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import rank1 from '../../images/badge.png';
import rank2 from '../../images/second-rank.png';
import rank3 from '../../images/third-rank.png';
const SearchItem = ({searchItem}) => {
    const dispatch = useDispatch();
    const {data} = useSelector((state)=>state.product);
    let findItem = data?.filter((findSearchItem)=>{
        return ((findSearchItem.name.toLowerCase().includes(searchItem.toLowerCase()))?findSearchItem:"");
    });
    useLayoutEffect(()=>{
        dispatch(fetchProducts())
    },[dispatch]);
  return (
        <>
            <section className="search-view">
                <div className="container">
                    <div className="grid-card">
                    {
                        (searchItem === "")?<><div className="no-coin-found"><h1>Start Searching Your Favourite Crypto Curriencies</h1></div></>
                        :(findItem.length !== 0)?
                        findItem.map((detailCrypto)=>{
                            return(
                                    <>
                                    <Link to={`/coin?id=${detailCrypto.id}`} key={detailCrypto.id} className={`crypto-links ${(detailCrypto.market_cap_change_percentage_24h < 0)?"red-box":"green-box"}`}>
                                        <div className="g-card" >
                                        <div className="coin-detail">
                                        <div className="coin-img">
                                        <div className="c-image">
                                            <img src={detailCrypto.image} alt="error" />
                                        </div>
                                        <div className="c-tile">
                                            <h1>{detailCrypto.name}</h1>
                                            <p>{detailCrypto.symbol}</p>
                                        </div>
                                        </div>
                                        {(detailCrypto.market_cap_rank === 1)?<><div className="rank"><img src = {rank1} alt="error"/></div></>:(detailCrypto.market_cap_rank === 2)?<><div className="rank"><img src = {rank2} alt="error"/></div></>:(detailCrypto.market_cap_rank === 3)?<><div className="rank"><img src = {rank3} alt="error"/></div></>:null}
                                        </div>
                                        <div className="c-percentage">
                                        <div className="c-per">
                                        {(detailCrypto.market_cap_change_percentage_24h < 0)?<><p className='red'>{detailCrypto.market_cap_change_percentage_24h}</p><div className="down-trend"><TrendingDownIcon/></div></>:<><p className='green'>{detailCrypto.market_cap_change_percentage_24h}</p><div className="up-trend"><TrendingUpIcon/></div></>}
                                        </div>
                                        </div>
                                        <div className="c-price">
                                        <p>Price ${detailCrypto.current_price}</p>
                                        </div>
                                        <div className="c-total-supply">
                                        <p><span>Total Supply:</span> {detailCrypto.total_supply}</p>
                                        <p><span>Total Volume:</span> {detailCrypto.total_volume}</p>
                                        </div>
                                        </div>
                                    </Link>
                                    </>
                            )
                        }):<><div className="no-coin-found"><h1>No Coin Found</h1></div></>
                    }
                </div>
            </div>
        </section>
        </>
  )
}

export default SearchItem