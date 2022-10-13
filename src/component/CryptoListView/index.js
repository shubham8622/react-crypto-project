import './style.css'
import {useState} from 'react';
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Grid from '../Grid';
const List = () => {
  const [value,setValue] = useState(0);
  const style = {
    color: "white",
    width: "50vw",
    fontSize: "1.2rem",
    fontWeight: 600,
    fontFamily: "Inter",
    textTransform: "capitalize",
  };
  const handleChange = (event,value) =>{
    setValue(value);
  }

  return (
    <>
    <section className='view'>
      <div className="container">
        <div className="crypto-list-view">
          <div className="list-grid">
          <TabContext value={value}>
            <TabList variant="fullWidth" value={value} onChange={handleChange}>
              <Tab label="Grid" sx={style} />
              <Tab label="List" sx={style} />
            </TabList>
            <TabPanel value={0}>
              <div className="grid-flex">
                <Grid data={"grid-view"}/>
              </div>
            </TabPanel>
            <TabPanel value={1}><Grid data={"list-view"}/></TabPanel>
          </TabContext>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default List