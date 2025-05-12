import { useState } from 'react';
import './App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Establishments from '../components/Establishments';
import { Business } from '../models/business.mjs';
import { RegularBag, SurpriseBag } from '../models/bag.mjs';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const fakeEstablishments = [
    new Business('Da Valentino Store', 'Italy Street', '011 9876543', 'Italian', undefined, 2),
    new Business('Asahi Sushi Restaurant', 'Sunrise Street', '011 1234567', undefined, 'Sushi', 1),
  ];

  const fakeBagsSushi = [
    // new RegularBag(),
  ];

  fakeEstablishments.sort((a, b) => (a.name > b.name));
  const [establishments, setEstablishments] = useState(fakeEstablishments);

  return (
    <>
      <Header/>
      <Establishments establishments={establishments}/>
      <Footer/>
    </>
  )
}

export default App;
