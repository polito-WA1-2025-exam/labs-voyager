import RegularBagIcon from "../assets/food-bag-svgrepo-com.svg"
import SurpriseBagIcon from "../assets/christmas-gifts-svgrepo-com.svg"
import InfoIcon from "../assets/info-circle.svg"
import { Image } from "react-bootstrap"
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Button from 'react-bootstrap/Button';


function FoodItemCard(props){

    const food = props.food

    return <div>
        <p>{food.name} ({food.quantity})</p>
    </div>
}

function FoodItemsModal(props){

    const show = props.show
    const handleClose = props.handleClose
    const food_items = props.food_items

    return <Modal size="sm" show={show} onHide={handleClose}>
        <Modal.Header>
            <Modal.Title>This bag contains:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            { (food_items.length < 1) 
            ? <p>No food items available.</p>
            : food_items.map((value, index) => <FoodItemCard key={index} food={value} />)
             }
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
    </Modal>

}

function ButtonShowModal(props){

    const bag_type = props.bag_type
    const handleShow = props.handleShow

    return <div>
        {
            (bag_type === "Regular") ? 
            <Button variant="info" onClick={handleShow}><Image src={InfoIcon} alt="Bag Icon" fluid rounded /></Button> 
            : 
            <Button variant="secondary" disabled><Image src={InfoIcon} alt="Bag Icon" fluid rounded /></Button>
        }
    </div>

    
}

function BagCard(props){

    const bag = props.bag;
    const icon = (bag.bag_type == "Regular") ? RegularBagIcon : SurpriseBagIcon;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <div 
        className='w-md border-box p-2 grid grid-cols-2 gap-3 border-2 border-black-500 rounded-xl'
    >
        <Image
            src={icon}
            alt="Bag Icon"
            fluid
            rounded
        />
        <div className='flex flex-col justify-between' >
            <h4 className="basis-5/8 flex flex-row gap-3">{bag.bag_type} Bag <ButtonShowModal bag_type={bag.bag_type} handleShow={handleShow} /></h4>
            <p className='basis-1/8'>Size: {bag.size}</p>
            <p className='basis-1/8'>Price: {bag.price} €</p>
            <p className='basis-1/8'>Pick-up range: <br/> {bag.timestamp_start} - <br/> {bag.timestamp_end}</p>
        </div>
        <FoodItemsModal show={show} handleClose={handleClose} food_items={bag.food_items} />
    </div>
}

export default BagCard