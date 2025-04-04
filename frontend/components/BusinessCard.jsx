import "../css/BusinessCard.css";


function BusinessCard(props){

    const business = props.business;

    return <div className="business-card">
        <div className="business-info">
            <h3>{business.name}</h3>
            <p>{business.address}</p>
            <p>{business.phone_number}</p>
            <p>{(business.cuisine_type == undefined) ? business.food_category : business.cuisine_type}</p>
        </div>
    </div>
}

export default BusinessCard;