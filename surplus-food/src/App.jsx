import { useState } from 'react';
import './App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Establishment from '../components/Establishment';
import ListEstablishments from '../components/ListEstablishments';
import { Business } from '../models/business.mjs';
import { RegularBag, SurpriseBag, FoodItem } from '../models/bag.mjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router';

function App() {

  const fakeEstablishments = [
    new Business('Asahi Sushi Restaurant', 'Sunrise Street', '011 1234567', undefined, 'Sushi', 1),
    new Business('Da Valentino Store', 'Italy Street', '011 9876543', 'Italian', undefined, 2),
    new Business('The Curry Corner', 'Mango Street', '011 2345678', 'Indian', undefined, 8),
    new Business('Sweet Treats Bakery', 'Sugar Avenue', '011 3456789', undefined, 'Desserts', 9),
    new Business('Taco Fiesta', 'Cactus Road', '011 4567890', 'Mexican', undefined, 10),
    new Business('Ocean Catch', 'Harbor Street', '011 5678901', undefined, 'Seafood', 11),
    new Business('Bella Pasta', 'Vineyard Lane', '011 6789012', 'Italian', undefined, 12),
    new Business('The Salad Spot', 'Green Street', '011 7890123', undefined, 'Healthy', 13),
    new Business('Kabob Kingdom', 'Desert Way', '011 8901234', 'Middle Eastern', undefined, 14),
    new Business('Cupcake Castle', 'Cherry Blvd', '011 9012345', undefined, 'Bakery', 15),
  ];

  const fakeBags1 = [new SurpriseBag(
    [
      new FoodItem('Salmon Roll', 2),
      new FoodItem('Tuna Nigiri', 3),
      new FoodItem('Miso Soup', 1),
    ],
    'small',
    5.99,
    1,
    "2025-05-18T10:00:00",
    "2025-05-18T12:00:00"
  ),
  new RegularBag(
    [
      new FoodItem('California Roll', 2),
      new FoodItem('Edamame', 1),
    ],
    'medium',
    7.49,
    1,
    "2025-05-18T10:00:00",
    "2025-05-18T12:00:00"
  )];

  const fakeBags2 = [new RegularBag(
    [
      new FoodItem('Lasagna', 1),
      new FoodItem('Bruschetta', 3),
    ],
    'medium',
    6.99,
    2,
    "2025-05-18T10:00:00",
    "2025-05-18T12:00:00"
  ),
  new SurpriseBag(
    [
      new FoodItem('Pasta Surprise', 1),
      new FoodItem('Garlic Bread', 2),
    ],
    'small',
    4.99,
    2,
    "2025-05-18T10:00:00",
    "2025-05-18T12:00:00"
  )];

  const fakeBags8 = [new RegularBag(
    [
      new FoodItem('Chicken Tikka', 2),
      new FoodItem('Naan Bread', 2),
    ],
    'large',
    8.99,
    8,
    "2025-05-18T10:00:00",
    "2025-05-18T12:00:00"
  ),
  new SurpriseBag(
    [
      new FoodItem('Paneer Curry', 1),
      new FoodItem('Rice', 2),
    ],
    'small',
    5.49,
    8,
    "2025-05-18T10:00:00",
    "2025-05-18T12:00:00"
  )];

  const fakebags9 = [new RegularBag(
    [
      new FoodItem('Cupcake', 2),
      new FoodItem('Brownie', 1),
      new FoodItem('Macaron', 4),
    ],
    'medium',
    6.49,
    9,
    "2025-05-18T10:00:00",
    "2025-05-18T12:00:00"
  ),
  new SurpriseBag(
    [
      new FoodItem('Mystery Cake Slice', 1),
    ],
    'small',
    3.99,
    9,
    "2025-05-18T10:00:00",
    "2025-05-18T12:00:00"
  )];

  fakeEstablishments.sort((a, b) => (a.name > b.name));
  const [establishments, setEstablishments] = useState(fakeEstablishments);
  const [bags, setBags] = useState(fakeBags1);  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<ListEstablishments establishments={establishments} />} />
            <Route path="businesses/:buId" element={<Establishment establishments={establishments}/>}/>
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;
