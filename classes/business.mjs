

export class Business{

    constructor(name, address, phone_number, cuisine_type, food_category, id = undefined){

        if (!name || !address || !phone_number) {
            // cuisine_type and food_category are not mandatory
            throw new Error("All parameters are required");
        }
        
        this.id = id;
        this.name = name;
        this.address = address;
        this.phone_number = phone_number;
        this.cuisine_type = cuisine_type;
        this.food_category = food_category;
        this.list_bags = [];

    }

    addBag = (bag) => {
        if (!bag) throw new Error("Bag is required");
        this.list_bags.push(bag);
        return this;
    }

    retrieveBags = () => {
        return [...this.list_bags];
    }

    removeBag = (bag) => {
        if (!bag) throw new Error("Bag is required");
        this.list_bags = this.list_bags.filter(b => b !== bag);
        return this;
    }
}


export class BusinessContainer{

    constructor(){
        this.list_businesses = [];
    }

    addBusiness = (b) => {
        if (!b) throw new Error("Business is required");
        this.list_businesses.push(b);
        return this;
    }

    showBusinesses = () => {
        return [...this.list_businesses].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    }

    deleteBusiness = (b) => {
        if (!b) throw new Error("Business is required");
        this.list_businesses = this.list_businesses.filter(x => x !== b);
        return this;
    }
}

