import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css'
import App from './App.tsx'
// import {MinigolfC} from './maps/MinigolfC.tsx'
import {World as MinigolfC} from './maps/minigolf/World.tsx'
// import World from './World.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/MinigolfC" element={<MinigolfC />} />
      </Routes>
    </BrowserRouter>

  </StrictMode>,
)
