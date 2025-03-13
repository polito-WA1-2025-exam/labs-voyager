import dayjs from "dayjs";


export function User(username, password){

    this.username = username;
    this.password = password;

    this.shopping_cart = new ShoppingCart();

    this.addBag = (bag) => this.shopping_cart.add_bag(bag);
    this.removeItem = (item, bag) => this.shopping_cart.removeItem(item, bag);
}

export function Session(user){

    this.user = user;
    this.status = true;

    this.terminate = () => {
        this.status = false;
    }
}

export function SessionContainer(){

    this.sessions = [];

    this.add = (s) => {
        this.sessions.push(s);
    }

    this.show_active = () => {

        return this.sessions.filter(s => s.status);
    }
}

export function ShoppingCart(){

    this.list_bags = [];
    this.text_box = "";

    // a new instance of the bag should have been created
    this.add_bag = (bag) => {
        const now = dayjs();

        // TODO: check if there are other bags of this store
        
        if (bag.timestamp_start.isAfter(now)){
            this.list_bags.push(bag);
        } else {
            console.warn("Pick-up time after current time only.");
        }
    }

    this.writeText = (text) => this.text_box = text;
    
    this.showBags = () => [...this.list_bags];

    // a new instance of the bag should have been created
    this.removeItem = (item, bag) => {

        if (bag.removedItemsCounter < 2) {
            // TODO: item is not removed

            bag.food_items = bag.food_items.filter(i => i.name !== item.name);
            bag.removedItemsCounter++;
        } else {
            console.warn('[WARN]: Already removed max number of items (2) for this bag.');
        }
    }

}