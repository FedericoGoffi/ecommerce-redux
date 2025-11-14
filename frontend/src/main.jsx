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
const ProductDetails = lazy(() => import('./pages/ProductDetails.jsx'));
const SearchCategories = lazy(() => import('./pages/SearchCategories.jsx'));
const Checkout = lazy(() => import('./pages/checkoutPage.jsx'));
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
                  <Categories />
                  <Offers />
                  <Footer />
                </>
              } />
              <Route path='/auth' element={< Auth />} />
              <Route path='/product/:id' element={<>< ProductDetails /><Footer /></>} />
              <Route path='/category/:id' element={<>< SearchCategories /><Footer /></>} />
              <Route path='/cart' element={< Cart />} />
              <Route path='/checkout' element={< Checkout />} />
            </Routes>
          </Suspense>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
