import React, { useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {fetchProducts} from '../../store/fetchProduct';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
import Header from '../Header'
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
const Coin = () => {
    Chart.register(CategoryScale);
    const dispatch = useDispatch();
    const detailData = useSelector(state=>state.product);
    const [searchParams] = useSearchParams();
    const [price,setPrice] = useState([]);
    const [days,setDays] = useState(30);
    let params = searchParams.get('id');
    let detailCoinData = detailData.data.filter((ele)=>(ele.id === params)?ele:"");
    useLayoutEffect(()=>{
      dispatch(fetchProducts());
    },[]);
    useLayoutEffect(()=>{
      let graphData = async () =>{
        let res = await fetch(`https://api.coingecko.com/api/v3/coins/${params}/market_chart?vs_currency=usd&days=${days}`,{
          mode: 'cors',
          headers: {
            'Access-Control-Allow-Origin':'*'
          }
        });
        res = await res.json();
        setPrice(res);
      }
      graphData();
    });
    
    let today = new Date();
    let priorDate = new Date(new Date().setDate(today.getDate() - days));
    var getDaysArray = function (starting, ending) {
      for (
        var a = [], d = new Date(starting);
        d <= new Date(ending);
        d.setDate(d.getDate() + 1)
      ) {
        a.push(new Date(d).getDate() + "/" + (new Date(d).getUTCMonth() + 1));
      }
      return a;
    };
    var dates_2 = getDaysArray(priorDate, today);
    const priorDate_2 = new Date(
      new Date().setDate(today.getDate() - days)
    );
    var dates_2 = getDaysArray(priorDate_2, today);

    // console.log(priorDate.getMonth());
    const data = {
      labels: dates_2,
      datasets: [
        {
          label: "Trend",
          data: price?.prices?.map(ele=>ele[1]),
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)"
        }
      ]
    };
    const handleChange = (event) =>{
        setDays(event.target.value);
    }
  return (
    <>
      <Header/>
      <section className='chart-section'>
        <div className="container">
        {
          detailCoinData?.map((c)=>{
            return(
              <>
                  <div className="detail-card" key={c.id}>
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
              </>
            )
          })
        }
          <div className="select-days">
              Price Change in the last 
              <span>
                <Select
                  value={days}
                  label="Days"
                  onChange={handleChange}
                  className="select-days"
                  sx={{
                    height: "2.5rem",
                    color: "var(--white)",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--white)",
                    },
                    "& .MuiSvgIcon-root": {
                      color: "var(--white)",
                    },
                  }}
                >
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={30} selected>30</MenuItem>
                  <MenuItem value={60}>60</MenuItem>
                  <MenuItem value={90}>90</MenuItem>
                </Select>
              </span>
               days
          </div>  
          <div className="main-chart">
            <Line data={data} />
          </div>
        </div>  
      </section>
    </>
  )
}

export default Coin