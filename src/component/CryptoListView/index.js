import './style.css'
import {useState} from 'react';
const List = () => {
  const [view,setView] = useState("");
  const handleView = (event) =>{
  }
  https://api.coingecko.com/api/v3/coins/list
  return (
    <>
      <div className="container">
        <div className="crypto-list-view">
          <div className="list-grid">
            <p onClick={handleView}>list view</p>
            <p onClick={handleView}>Grid view</p>
          </div>
          <div className="list">

          </div>
        </div>
      </div>
    </>
  )
}

export default List