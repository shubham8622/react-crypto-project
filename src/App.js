import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Search from './component/Search';
import Home from './component/Home';
import About from './component/About'
function App() {
  return(
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="search" element={<Search/>}/>
        <Route path="about" element={<About/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App;
