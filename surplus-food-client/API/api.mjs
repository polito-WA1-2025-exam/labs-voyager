import { Business } from "../models/business.mjs";

const URI = 'http://localhost:3000/api'

async function loadEstablishments() {
    const response = await fetch(URI + '/businesses');
    const establishments = await response.json();
    return establishments;
}

async function loadEstablishment(buId) {
    const response = await fetch(URI + `/businesses/${buId}`);
    const establishment = await response.json();
    return establishment;
}

async function loadBagsFromEstablishment(buId) {
    const response = await fetch(URI + `/businesses/${buId}/bags`);
    const bags = await response.json();
    return bags;
}

async function loadFoodItemsOfBag(bagId) {
    const response = await fetch(URI + `/bags/${bagId}/fooditems`);
    const foodItems = await response.json();
    return foodItems;
}

export { loadEstablishments, loadEstablishment, loadBagsFromEstablishment, loadFoodItemsOfBag };