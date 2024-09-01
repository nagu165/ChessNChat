
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from './screens/Landing';
import { Game } from './screens/Game';
import About from './screens/About';

function App() {
  return (
    <div className='h-screen bg-slate-950'>
      <BrowserRouter>
            <Routes>
              <Route path="/about" element={<About />}/>
              <Route path="/" element={<Landing />}/>
              <Route path="/game" element={<Game />}/>
            </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
