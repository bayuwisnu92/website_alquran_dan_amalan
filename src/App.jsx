import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home'
import Detail from './pages/detail'
import About from './pages/about';
import Navbar from './components/Navbar';
import Tasbih from './pages/tasbih';
import Hrbukhori from './pages/hrbukhori';
import Amalan from './pages/amalan';
import InstallPrompt from './components/InstallPrompt';


function App() {
  
  return (
    <Router>
      <Navbar/>
      <InstallPrompt/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/about' element={<About/>} />
        <Route path='/tasbih' element={<Tasbih/>} />
        <Route path='/hrbukhori' element={<Hrbukhori/>} />
        <Route path='/amalan' element={<Amalan/>} />
      </Routes>
    </Router>
  );
}

export default App
