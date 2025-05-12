import { Table } from "react-bootstrap";

function Establishments(props) {
    const establishments = props.establishments;

    return <>
        <p>Establishments</p>
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
                            {e.name}
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

export default Establishments;