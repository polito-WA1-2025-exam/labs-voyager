import BusinessCard from "../components/BusinessCard";
import {Business} from "../../classes/business.mjs";
import "../css/Home.css";


function Home(){

    const businesses = [
        new Business("name", "address", "333", undefined, "food", 1),
        new Business("name2", "address2", "3332222", "cuisine", undefined, 2)
    ]

    return <div className="home-page">
        <div className="business-grid">
            {businesses.map(b => <BusinessCard business={b} key={b.id}></BusinessCard>)}
        </div>
    </div>
}

export default Home;