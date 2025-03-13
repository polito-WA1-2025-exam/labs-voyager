import dayjs from "dayjs";

// TODO
// - [] constructor
// - [] container
// - [] add new object
// - [] retrieve object based on criteria
// - [] manipulate object
// - [] delete object


export class FoodItem{

    constructor(name, quantity){

        if (!name || !quantity){
            throw new Error("All Food details are required")
        }
        this.name = name;
        this.quantity = quantity;
    }
}

class Bag{

    constructor(bag_type, food_items, size, price, business_from, timestamp_start, timestamp_end){

        if (!bag_type || !food_items || !size || !price || !business_from || !timestamp_start || !timestamp_end){
            throw new error("All Bag details are required")
        }

        this.bag_type = bag_type;
        this.food_items = food_items;
        this.price = price;
        this.size = size; // only small/ medium/ large
        this.business_from = business_from;
        this.timestamp_start = dayjs(timestamp_start);
        this.timestamp_end = dayjs(timestamp_end);
        this.is_available = true;
    }

    availableFrom = () => {
        return this.timestamp_start;
    }

    availableUntil = () => {
        return this.timestamp_end;
    }

    reserve = () => {
        this.is_available = false;
        return this;
    }

    free = () => {
        this.is_available = true;
        return this;
    }
}

export class SurpriseBag extends Bag{

    constructor(food_items, size, price, business_from, timestamp_start, timestamp_end) {
        super("Surprise", food_items, size, price, business_from, timestamp_start, timestamp_end);
    }

}

export class RegularBag extends Bag{

    constructor(food_items, size, price, business_from, timestamp_start, timestamp_end) {
        super("Regular", food_items, size, price, business_from, timestamp_start, timestamp_end);
    }
}
