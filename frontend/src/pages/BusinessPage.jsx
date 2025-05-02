import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BagCard from '../components/BagCard';
import dayjs from 'dayjs';

function Bag(bag_type, food_items, size, price, business_from, timestamp_start, timestamp_end, ){

    this.id = undefined;
    this.bag_type = bag_type;
    this.food_items = food_items;
    this.price = price;
    this.size = size; // only small/ medium/ large
    this.business_from = business_from;
    this.timestamp_start = dayjs(timestamp_start);
    this.timestamp_end = dayjs(timestamp_end);
    this.is_available = 1; // 1 = True and 0 = False
}

function FoodItem(name, quantity){

    this.id = undefined;
    this.name = name;
    this.quantity = quantity;
}

const fi1 = new FoodItem("Poké", 1);
const fi2 = new FoodItem("Tuna Nigiri", 5);
const fi3 = new FoodItem("Salmon Nigiri", 5);
const fi4 = new FoodItem("Bao", 3);
const fi5 = new FoodItem("Maki", 4);

function BusinessPage(){

    const { id } = useParams(); 
    const [bags, setBags] = useState([])

    useEffect(() => {
        axios.get(`/businesses/${id}/bags`)
        .then(res => {
            setBags(res.data)
            res.data.map(b => console.log(b))    
        })
        .catch(err => console.error(err));
        }, [id]);

    return <div className='border-box p-10 flex flex-row flex-wrap justify-evenly gap-5'>
        { (bags.length < 1) ? <p>Loading ...</p> : bags.map((value, index) => <BagCard key={index} bag={value} />) }
    </div>
}

export default BusinessPage