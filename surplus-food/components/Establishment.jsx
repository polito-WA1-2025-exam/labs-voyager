import { useParams } from "react-router";

function Establishment(props) {
    const {buId} = useParams();
    const b = props.establishments.filter(b => b.id == buId)[0];
    
    return <>
        <h1>{b.id ? `${b.id}: ${b.name}` : "b is undefined"}</h1>
    </>
}

export default Establishment;