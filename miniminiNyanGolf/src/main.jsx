import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HashRouter, Routes, Route } from 'react-router-dom';

import './index.css'
import App from './App.jsx'
// import {MinigolfC} from './maps/MinigolfC.jsx'
import {World as MinigolfC} from './maps/minigolf/World.jsx'
// import World from './World.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/MinigolfC" element={<MinigolfC />} />
      </Routes>
    </HashRouter>

  </StrictMode>
)
