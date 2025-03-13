import dayjs from "dayjs";

/* Warning */
/* Removed Session class to keep it simple: User has a status attribute to understand if they are logged in or not */

export class ShoppingCart{

    constructor(){

        this.list_bags = [];
        this.textBox = "";
    }

    addBag = (bag) => {
        if (!bag) throw new Error("Bag is required");

        const now = dayjs();
        const bagFrom = bag.availableFrom();
        
        if (bagFrom.isAfter(now)){
            this.list_bags.push(bag);
            console.log("Successfully added bag.");
        } else {
            console.warn("Pick-up time after current time only.");
        }

        return this;
    }

    showBags = () => [...this.list_bags];

    removeItem = (item, bag) => {
        if (bag.bag_type === "Regular") {
            if (bag.getRemovedItemsCounter() < 2) {
                bag.setFoodItems( bag.getFoodItems().filter(i => i !== item) );
                bag.increaseRemovedItemsCounter();
            } else {
                console.warn('[WARN]: Already remove max number (2) of items.');
            }
        } else {
            console.warn("[WARN]: It is not allowed to remove item from Surprise bags.")
        }
        return this;
    }
}


export class User{

    constructor(username, password){

        if (!username || !password) {
            throw new Error("Username and password are required");
        }

        this.username = username;
        this.password = password;

        this.status = false; // Convention: false = log out
        this.shoppingCart = new ShoppingCart();
    }

    logIn = () => {
        this.status = true;
        return this;
    }

    logOut = () => {
        this.status = false;
        return this;
    }

    showStatus = () => {
        return this.status;
    }

    retrieveCart = () => this.shoppingCart;
}
