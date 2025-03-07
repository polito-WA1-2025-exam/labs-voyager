

export function Business(name, address, phone_number, cuisine_type, food_category){

    this.name = name;
    this.address = address;
    this.phone_number = phone_number;
    this.cuisine_type = cuisine_type;
    this.food_category = food_category;

    this.list_bags = [];

    this.add_bag = (bag) => {
        this.list_bags.push(bag);
    }

    this.retrieve_bags = () => {
        return this.list_bags;
    }

    this.remove_bag = (x) => {
        this.list_bags = this.list_bags.filter(b => b !== x);
    }

}

export function BusinessContainer(){

    this.list_businesses = [];

    this.add = (b) => {
        this.list_businesses.push(b);
    }

    this.show = () => {
        // TODO: simplify it
        return this.list_businesses.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    }

    this.delete = (b) => {
        this.list_businesses = this.list_businesses.filter(x => x !== b)
    }
}