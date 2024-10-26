
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from './screens/Landing';
import { Game } from './screens/Game';
import VantaBackground from './components/VantaBackground';

function App() {
  return (
    <div className="relative">
      <VantaBackground />
      <div className="absolute inset-0 flex items-center justify-center text-white z-10">
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />}/>
              <Route path="/game" element={<Game />}/>
            </Routes>
      </BrowserRouter>
      </div>
    </div>
  )
}

export default App
