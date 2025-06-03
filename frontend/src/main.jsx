import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner';

import Navbar from './components/Navbar.jsx'
import HeroBanner from './pages/heroBanner.jsx'
import Offers from './pages/Offers.jsx'
import Categories from './pages/Categories.jsx'
import Auth from './pages/Auth.jsx'
import Footer from './components/Footer.jsx'

import { Provider } from 'react-redux'
import store, { persistor } from './redux/store/index.js'
import { PersistGate } from 'redux-persist/integration/react';

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
          <Toaster richColors position="bottom-right" />
          <Navbar />
          <Routes>
            <Route path="/" element={
              <>
                <HeroBanner />
                <Offers />
                <Categories />
                <Footer />
              </>
            } />
            <Route path='/auth' element={< Auth />} />
            <Route path='/product/:id' element={< Offers />} />
            <Route path='/category/:id' element={< Categories />} />
          </Routes>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
