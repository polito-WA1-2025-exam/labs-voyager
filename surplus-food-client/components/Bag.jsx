import { Card, ListGroup, Button } from "react-bootstrap";
import FoodItem from "./FoodItem";
import { loadFoodItemsOfBag } from "../API/api.mjs";
import { useState, useEffect } from "react";


export function BagCard(props) {
    const businessName = props.establishment.name;
    const bag = props.bag;

    const [foodItems, setFoodItems] = useState([]);
    useEffect(() => {
        loadFoodItemsOfBag(bag.id).then(fi => setFoodItems(fi));
    }, [])


    return <>
        <Card>
            <Card.Header>
                {bag.bag_type == "Surprise" ? "Surprise" : "Regular"} Bag {`${bag.id}`}
            </Card.Header>
            <Card.Title>
                {businessName}
            </Card.Title>
            <Card.Subtitle>
                Size: {bag.size} <br />
                Price: {bag.price} €
            </Card.Subtitle>
            <Card.Body>
                <div className="d-grid gap-2">
                    {bag.is_available ?
                        <Button variant="primary" size="lg">Add to cart</Button> :
                        ""
                    }
                </div>
                <ListGroup>
                    {bag.bag_type != "Surprise" && <h4>The bag contains</h4>}
                    {/* TODO: change key for foodItem */}
                    {bag.bag_type != "Surprise" && foodItems.map(fi => (
                        <FoodItem key={fi.id} foodItem={fi}></FoodItem>
                    ))
                    }
                </ListGroup>
            </Card.Body>
            <Card.Footer>
                The bag is currently {bag.is_available ? "" : " not "} available. <br />
                The bag can be picked up from {bag.timestamp_start.toString()} until {bag.timestamp_end.toString()}.
            </Card.Footer>
        </Card>
    </>
}