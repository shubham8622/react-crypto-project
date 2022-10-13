import { useState } from 'react';
import SearchItem from './SearchItem';
import './style.css';
const Search = () => {
  const [searchItem,setSearchItem] = useState("");
  const handleSearch = (event)=>{
    event.preventDefault();
    console.log(event.target.value)
    setSearchItem(event.target.value);
  }
  return (
    <>
      <section className="search">
        <div className="container">
              <div className="search">
                  <input type="search" name="search" id="" placeholder="Search" onChange={handleSearch}/>
              </div>
          <SearchItem searchItem={searchItem}/>
        </div>
      </section>
    </>
  )
}

export default Search