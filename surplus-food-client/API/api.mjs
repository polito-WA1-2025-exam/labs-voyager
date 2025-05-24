import { Business } from "../models/business.mjs";

const URI = 'http://localhost:3000/api'

async function loadEstablishments() {
    try {
        const response = await fetch(URI + '/businesses');
        if (response.ok) {
            const establishments = await response.json();
            return establishments;
        } else {
            throw new Error("Application error in loadEstablishments");
        }
    } catch (ex) {
        throw new Error("Network error in loadEstablishments " + ex);
    }
}

async function loadEstablishment(buId) {
    try {
        const response = await fetch(URI + `/businesses/${buId}`);
        if (response.ok) {
            const establishment = await response.json();
            return establishment;
        } else {
            throw new Error("Application error in loadEstablishment");
        }
    } catch (ex) {
        throw new Error("Network error in loadEstablishment " + ex);
    }
}

async function loadBagsFromEstablishment(buId) {
    try {
        const response = await fetch(URI + `/businesses/${buId}/bags`);
        if (response.ok) {
            const bags = await response.json();
            return bags;
        } else {
            throw new Error("Application error in loadBagsFromEstablishment");
        }
    } catch (ex) {
        throw new Error("Network error in loadBagsFromEstablishment " + ex);
    }
}

async function loadFoodItemsOfBag(bagId) {
    try {
        const response = await fetch(URI + `/bags/${bagId}/fooditems`);
        if (response.ok) {
            const foodItems = await response.json();
            return foodItems;
        } else {
            throw new Error("Application error in loadFoodItemsOfBag");
        }
    } catch (ex) {
        throw new Error("Network error in loadFoodItemsOfBag " + ex);
    }
}

export { loadEstablishments, loadEstablishment, loadBagsFromEstablishment, loadFoodItemsOfBag };