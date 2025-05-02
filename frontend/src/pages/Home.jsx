
import { useEffect, useState } from "react";
import BusinessCard from "../components/BusinessCard";
import axios from "axios";


function Home(){

    const [businesses, setBusinesses] = useState([])

    useEffect(() => {

        axios.get('/businesses').then(res => {
             setBusinesses(res.data)
             res.data.map(b => console.log(b))
            }).catch(err => console.error(err))
    }, [])
    

    return (
        <div className="border-box p-10">
          <div className="flex flex-row flex-wrap justify-evenly gap-5">
            { businesses.map((value, index) => <BusinessCard key={index} business={value} />)}
          </div>
        </div>
    )
}

export default Home;