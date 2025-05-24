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
  // Application state
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [establishments, setEstablishments] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);

  // Load list of establishments at startup
  useEffect(() => {
    setErrorMessage('');
    setLoading(true);
    loadEstablishments().then(dataLoaded => {
      dataLoaded.sort((a, b) => (a.name > b.name));
      setEstablishments(dataLoaded);
      setLoading(false);
    }
    ).catch((ex) => {
      console.log('<App> received error: ' + ex);
      setErrorMessage('Loading error. Please try again');
    })
  }, [])

  return (
    <>
      {errorMessage && <div>{errorMessage}</div>}
      {isLoading && <div>... Loading ...</div>}
      {!errorMessage && !isLoading && <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<ListEstablishments establishments={establishments} />} />
            <Route path="businesses/:buId" element={<Establishment establishments={establishments} />} />
            <Route path="shopping-cart" element={<ShoppingCart shoppingCart={shoppingCart} />} />
          </Route>
          <Route path="*" element={<h1>404 Page Not Found</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>}
    </>
  )
}

export default App;
