import dayjs from "dayjs";


export function User(username, password){

    this.username = username;
    this.password = password;

    this.shopping_cart = new ShoppingCart();
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

    this.add_bag = (bag) => {

        const now = dayjs();
        if (bag.timestamp_start.isAfter(now)){
            this.list_bags.add(bag);
        } else {
            console.warn("Pick-up time after current time only.");
        }
    }

}