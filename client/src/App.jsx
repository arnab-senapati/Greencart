import React, { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import { useAppContext } from './context/AppContext';
import Login from './components/Login';
import AllProduct from './pages/AllProduct';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';
import MyOrders from './pages/MyOrders';
import SellerLogin from './components/seller/SellerLogin';
import SellerLayout from './pages/seller/SellerLayout';
import AddProduct from './pages/seller/AddProduct';
import ProductList from './pages/seller/ProductList';
import Orders from './pages/seller/Orders';
import Loading from './components/Loading';
import WhatsappButton from './components/WhatsappButton';
import ImageSlider from './components/ImageSlider';

const App = () => {
  const location = useLocation(); // 👈 Get current path
  const isSellerPath = location.pathname.includes('seller'); // check if seller route
  const { showUserLogin, isSeller } = useAppContext();


  // Mouse tracking effect (gradient)
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = `${(e.clientX / window.innerWidth) * 100}%`;
      const y = `${(e.clientY / window.innerHeight) * 100}%`;
      document.documentElement.style.setProperty('--x', x);
      document.documentElement.style.setProperty('--y', y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen text-gray-700 overflow-hidden">
      {/* Background animation layer */}
      <div id="gradient-bg" className="pointer-events-none fixed inset-0 -z-10"></div>

      {/* Global UI elements */}
      {!isSellerPath && <Navbar />}
      {showUserLogin && <Login />}
      <WhatsappButton />

      {/* ⬇️ Show slider only on Home page */}
      {location.pathname === '/' && <ImageSlider />}

      <Toaster />

      {/* Page container */}
<div className={`${isSellerPath ? '' : 'px-6 md:px-16 lg:px-24 xl:px-28'}`}>

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<AllProduct />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/loader" element={<Loading />} />

          <Route path="/seller" element={isSeller ? <SellerLayout /> : <SellerLogin />}>
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </div>

      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;