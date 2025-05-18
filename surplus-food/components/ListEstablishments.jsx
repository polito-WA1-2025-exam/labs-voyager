import { Table } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router";

function ListEstablishments(props) {
    const navigate = useNavigate;
    const establishments = props.establishments;

    return <>
        <h3>Establishments</h3>
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Telephone Number</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody>
                {establishments.map(e => (
                    <tr key={e.id}>
                        <td>
                            <Link to={`/businesses/${e.id}`}>
                                {e.name}
                            </Link>
                        </td>
                        <td>
                            {e.address}
                        </td>
                        <td>
                            {e.phone_number}
                        </td>
                        <td>
                            {e.cuisine_type ? "Store" : "Restaurant"}
                        </td>
                    </tr>))}
            </tbody>
        </Table>
    </>
}

export default ListEstablishments;