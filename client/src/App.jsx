import React, { useEffect, useState } from 'react';
import NavBar from './components/Navbar'
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index'
import Phones from './pages/Phones';
import Laptops from './pages/Laptops';
import Accessories from './pages/Accessories';
import Item from './pages/Item';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Admin from './pages/Admin';
import { UserProvider } from './UserContext';
import ScrollToTop from './components/ScrollToTop';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <>
    <UserProvider>
    <NavBar />
    <ScrollToTop/>
    <Routes>
      <Route path='/' element={<Index/>}/>
      <Route path='/phones' element={<Phones/>}/>
      <Route path='/laptops' element={<Laptops/>}/>
      <Route path='/accessories' element={<Accessories/>}/>
      <Route path='/item/:id' element={<Item/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/account' element={<Account/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/orders' element={<Orders/>}/>
      <Route path='/admin' element={
        <PrivateRoute>
        <Admin/>
        </PrivateRoute>
        }/>
    </Routes>
    </UserProvider>
    <Footer/>
    </>
  )
}

export default App