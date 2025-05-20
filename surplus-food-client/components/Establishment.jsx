import { useParams } from "react-router";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { CardGroup, ListGroup } from "react-bootstrap";
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

function Establishment(props) {
    const { buId } = useParams();
    const b = props.establishments.filter(b => b.id == buId)[0];
    const bags = props.bags.filter(bag => bag.business_from == buId);

    return <>
        <h1>{b.id ? `${b.name}` : "b is undefined"}</h1>
        <CardGroup>
            {bags.map(bag => (
                <BagCard key={bag.id} businessName={b.name} bag={bag}></BagCard>
            )
            )}
        </CardGroup>
    </>
}

export default Establishment;


function BagCard(props) {
    const businessName = props.businessName;
    const bag = props.bag;

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
                    {bag.bag_type != "Surprise" && bag.food_items.map(fi => (
                        <FoodItem key={bag.id + fi.quantity} foodItem={fi}></FoodItem>
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