import React, { useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {fetchProducts} from '../../store/fetchProduct';
import {fetchAllPrices} from '../../store/productPriceForGraph';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
import Header from '../Header'
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import rank1 from '../../images/badge.png';
import rank2 from '../../images/second-rank.png';
import rank3 from '../../images/third-rank.png';
const Coin = () => {
    Chart.register(CategoryScale);
    const dispatch = useDispatch();
    const detailData = useSelector(state=>state.product);
    const priceData = useSelector(state=>state.priceForGraph.info);
    const [selectGraphChart,setGraphChart] = useState("prices");
    const [searchParams] = useSearchParams();
    const [days,setDays] = useState(30);
    const [comparedCoin,setComparedCoin] = useState("");
    const [comparedPrice,setComparedPrice] = useState("");
    let params = searchParams.get('id');
    let detailCoinData = detailData.data.filter((ele)=>(ele.id === params)?ele:"");
    let allComparedCoin = detailData.data.map((ele)=> (ele.id !== params)?(ele.id):"" );
    let btnText = [
      {
        "id":1,
        "state":"prices",
        "text":"Price"
      },
      {
        "id":2,
        "state":"market_caps",
        "text":"Market Cap"
      },
      {
        "id":3,
        "state":"total_volumes",
        "text":"Total Volume"
      }
    ]
    useLayoutEffect(()=>{
      dispatch(fetchProducts());
      dispatch(fetchAllPrices([params,days]));
    },[]);
  
    const handleComparedCoin = async (event) =>{
      let params = event.target.value;
      setComparedCoin(params);
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${params}/market_chart?vs_currency=usd&days=${days}`);
      const cp = await res.json();
      setComparedPrice(cp);
    }
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
    dates_2 = getDaysArray(priorDate_2, today);
    const data = {
      labels: dates_2,
      datasets: [
        {
          label: `${params[0].toUpperCase()}${params.slice(1)}`,
          data: priceData[selectGraphChart]?.map(ele=>ele[1]),
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)"
        },
        {
          label:(comparedCoin === "")?"Select and compare":`${comparedCoin[0].toUpperCase()}${comparedCoin.slice(1)}`,
          data: comparedPrice[selectGraphChart]?.map(ele=>ele[1]),
          fill: false,
          borderColor: "#742774"
        }
      ]
    };
    const handleChange = (event) =>{
        setDays(event.target.value);
    }
  return (
    <>
      <Header/>
      {((detailCoinData.length === 0) && (priceData[selectGraphChart] !== 0) && (comparedPrice.prices !== 0))?
      <>
          <Box className = "loader-center" sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        </>
      :<>
        <section className='chart-section'>
        <div className="container">
        {
          detailCoinData?.map((c)=>{
            return(
              <>
                  {(c.market_cap_rank === 1)?<><div className="detail-rank"><img src = {rank1} alt="error"/></div></>:(c.market_cap_rank === 2)?<><div className="detail-rank"><img src = {rank2} alt="error"/></div></>:(c.market_cap_rank === 3)?<><div className="detail-rank"><img src = {rank3} alt="error"/></div></>:null}
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
                          <p><span>Total Supply:</span> {c.total_supply}</p>
                          <p><span>Total Volume:</span> {c.total_volume}</p>
                        </div>
                  </div>
              </>
            )
          })
        }
          <div className="select-days">
            <p>
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
               </p>
               <p>Compare it with
               <span>
                <Select
                  value={comparedCoin}
                  label="Days"
                  onChange={handleComparedCoin}
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
                  {
                  allComparedCoin.map((ele)=>{
                    return(
                        <MenuItem value={ele}>{ele.replace("-"," ").toUpperCase()}</MenuItem>
                    )
                  })}
                </Select>
              </span>
              </p>
          </div>   
          <div className="show-chart">
          <Stack spacing={2} direction="row" id="chartButton">
            {
              btnText.map((ele)=>{
                return(
                  <>
                    <Button variant="outlined" className = {`${(ele.text === "Price")?"changeBg":""}`} onClick={(event)=>{setGraphChart(ele.state);
                      let a = document.getElementById("chartButton").children;
                      a = Array.prototype.slice.call( a )
                      a.map((ele)=>(ele.classList.contains("changeBg"))?ele.classList.remove("changeBg"):"")
                      event.target.classList.add("changeBg")
                      }}>{ele.text}</Button>
                  </>
                )
              })
            }
          </Stack>
          </div>
          <div className="main-chart">
          <Line data={data} />
          </div>
        </div>  
        </section>
      </>
      }
    </>
  )
}

export default Coin