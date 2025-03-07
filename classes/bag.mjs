import dayjs from "dayjs";

export function FoodItem(name, quantity){

    this.name = name;
    this.quantity = quantity;
}


export function Bag(bag_type, food_items, size, price, business_from, timestamp_start, timestamp_end){

    this.bag_type = bag_type;
    this.food_items = food_items;
    this.price = price;
    this.size = size; // only small/ medium/ large
    this.business_from = business_from;
    this.timestamp_start = dayjs(timestamp_start);
    this.timestamp_end = dayjs(timestamp_end);
    this.is_available = true;

    this.reserve = () => {
        this.is_available = false;
    }
    this.free = () => {
        this.is_available = true;
    }
    
}

export function SurpriseBag(){
    Bag.call(this);

}

SurpriseBag.prototype = Object.create(Bag.prototype)
SurpriseBag.prototype.constructor = SurpriseBag

export function RegularBag(){
    Bag.call(this);

}

RegularBag.prototype = Object.create(Bag.prototype)
RegularBag.prototype.constructor = RegularBag



