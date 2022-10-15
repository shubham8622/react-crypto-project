import React, { useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {fetchProducts} from '../../store/fetchProduct';
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
import Header from '../Header'
const Coin = () => {
    Chart.register(CategoryScale);
    const dispatch = useDispatch();
    // const {data:coins} = useSelector((state)=>state.product);
    // console.log(coins);
    const [searchParams] = useSearchParams();
    const [price,setPrice] = useState([]);
    const [date,setDate] = useState();
    let params = searchParams.get('id');
    useLayoutEffect(()=>{
      let graphData = async () =>{
        let res = await fetch(`https://api.coingecko.com/api/v3/coins/${params}/market_chart?vs_currency=usd&days=30`,{
          mode: 'cors',
          headers: {
            'Access-Control-Allow-Origin':'*'
          }
        });
        res = await res.json();
        setPrice(res);
      }
      graphData();
      // dispatch(fetchProducts());
    });
    let today = new Date();
    let priorDate = new Date(new Date().setDate(today.getDate() - 30));
    // console.log(priorDate.getMonth());
    const data = {
      labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
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
  return (
    <>
      <Header/>
      <section className='chart-section'>
        <div className="container">

          <div className="main-chart">
            <Line data={data} />
          </div>
        </div>  
      </section>
    </>
  )
}

export default Coin