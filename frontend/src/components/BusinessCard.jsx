import React from 'react';
import { Image } from 'react-bootstrap'
import shopIcon from '../assets/online-shop-svgrepo-com.svg'; 
import telephoneIcon from '../assets/telephone.svg';
import mapIcon from '../assets/geo-alt.svg';
import { useNavigate } from 'react-router-dom';


function BusinessCard(props){

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/business/${business.id}`);
    };

    const business = props.business;

    return <div 
            className='w-md border-box p-2 grid grid-cols-2 gap-3 border-2 border-black-500 rounded-xl' onClick={handleClick}
        >
        <Image 
            className='size-[200px]'
            src={shopIcon}
            alt='Business Icon'
            fluid
            rounded
        />
        <div
            className='flex flex-col justify-between '
        >
            <h4 className='basis-5/8'>{ business.name }</h4>
            <p className='basis-1/8 flex flex-rows gap-2'><Image className='size-[25px]' src={mapIcon} /> { business.address }</p>
            <p className='basis-1/8 flex flex-rows gap-2 '><Image className='size-[25px]' src={telephoneIcon} /> { business.phone_number }</p>
            <p className='basis-1/8'>{ business.cuisine_type || business.food_category }</p>
        </div>
        
    </div>
}


export default BusinessCard;