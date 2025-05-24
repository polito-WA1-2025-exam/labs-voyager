import { useParams } from "react-router";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { CardGroup, ListGroup } from "react-bootstrap";
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import { loadBagsFromEstablishment, loadEstablishment } from "../API/api.mjs";
import { BagCard } from "./Bag";

function Establishment(props) {
    const params = useParams();
    const buId = params.buId;
    // const b = props.establishments.filter(b => b.id == buId)[0];
    // const bags = props.bags.filter(bag => bag.business_from == buId);

    const [ establishment, setEstablishment ] = useState({});
    const [ bags, setBags ] = useState([]);

    useEffect(() => {
        loadEstablishment(buId).then(e => setEstablishment(e));
    }, [buId]);

    useEffect(() => {
        loadBagsFromEstablishment(buId).then(bags => setBags(bags))
    }, [buId]);

    return <>
        <h1>{establishment.id ? `${establishment.name}` : "e is undefined"}</h1>
        <CardGroup>
            {bags.map(bag => (
                <BagCard key={bag.id} establishment={establishment} bag={bag}></BagCard>
            )
            )}
        </CardGroup>
    </>
}

export default Establishment;