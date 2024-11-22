import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Header from './Navbar.jsx';
import Brand from './Brand.jsx';
import Analysis from './Analysis.jsx';
import Inventory from './Inventory.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/brand' element={<Brand />} />
        <Route path='/analysis' element={<Analysis/>} />
        <Route path='/inventory' element={<Inventory/>} />

      </Routes>

    </BrowserRouter>
  </StrictMode>


)
