import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner';

import Navbar from './components/Navbar.jsx'
const HeroBanner = lazy(() => import('./pages/heroBanner.jsx'));
const Offers = lazy(() => import('./pages/Offers.jsx'));
const Categories = lazy(() => import('./pages/Categories.jsx'));
const Auth = lazy(() => import('./pages/Auth.jsx'));
const Cart = lazy(() => import('./pages/Cart.jsx'));
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
          <Suspense fallback={<div>Cargando...</div>}>
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
              <Route path='/cart' element={< Cart />} />
            </Routes>
          </Suspense>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
