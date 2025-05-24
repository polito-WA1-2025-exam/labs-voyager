import { ListGroup, Badge } from "react-bootstrap";

function FoodItem(props) {
    const foodItem = props.foodItem;

    return <>
        <ListGroup.Item className="d-flex justify-content-between align-items-start">
            {foodItem.name}
            <Badge bg="primary" pill>
                {foodItem.quantity}
            </Badge>
        </ListGroup.Item>
    </>
}

export default FoodItem;