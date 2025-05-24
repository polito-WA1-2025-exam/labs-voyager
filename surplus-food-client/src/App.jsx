import { useEffect, useState } from 'react';
import './App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Establishment from '../components/Establishment';
import ListEstablishments from '../components/ListEstablishments';
import ShoppingCart from '../components/ShoppingCart';
import { Business } from '../models/business.mjs';
import { RegularBag, SurpriseBag, FoodItem } from '../models/bag.mjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import { loadEstablishments } from '../API/api.mjs';

function App() {
  const [establishments, setEstablishments] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    loadEstablishments().then(dataLoaded => {
      dataLoaded.sort((a, b) => (a.name > b.name));
      setEstablishments(dataLoaded);
    }
    )
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<ListEstablishments establishments={establishments} />} />
            <Route path="businesses/:buId" element={<Establishment establishments={establishments} />} />
            <Route path="shopping-cart" element={<ShoppingCart shoppingCart={shoppingCart} />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;
