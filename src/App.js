import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import * as React from 'react';
import Search from './component/Search';
import Home from './component/Home';
import About from './component/About'
import Dashboard from './component/Dashboard';
import Coin from './component/Coin';
import {useSelector} from "react-redux";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
function App() {
  const whichMode = useSelector((state)=>state.lightMode.modeIs);
  const prefersDarkMode = useMediaQuery(`(prefers-color-scheme:${whichMode} )`);
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? whichMode:whichMode,
        },
      }),
    [prefersDarkMode],
  );
  return(
    <>
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="search" element={<Search/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="/coin" element={<Coin/>}/>
        </Routes>
      </Router>
      <CssBaseline />
    </ThemeProvider>
    </>
  )
}

export default App;
