import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home'
import Detail from './pages/detail'
import Navbar from './components/navbar';


function App() {
  
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        
      </Routes>
    </Router>
  );
}

export default App
