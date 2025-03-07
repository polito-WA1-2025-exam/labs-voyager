import dayjs from "dayjs";

function User(username, password){

    this.username = username;
    this.password = password;
}

function Session(user){

    this.user = user;
    this.status = true;

    this.terminate = () => {
        this.status = false;
    }
}

function SessionContainer(){

    this.sessions = [];

    this.add = (s) => {
        this.sessions.push(s);
    }

    this.show_active = () => {

        return this.sessions.filter(s => s.status)
    }
}

function Business(name, address, phone_number, cuisine_type, food_category){

    this.name = name;
    this.address = address;
    this.phone_number = phone_number;
    this.cuisine_type = cuisine_type;
    this.food_category = food_category;

}

function BusinessContainer(){

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

function FoodItem(name, quantity){

    this.name = name;
    this.quantity = quantity;
}

function Bag(bag_type, food_items){

    this.bag_type = bag_type;
    this.food_items = food_items;

}

function SurpriseBag(){
    Bag.call(this);

}

SurpriseBag.prototype = Object.create(Bag.prototype)
SurpriseBag.prototype.constructor = SurpriseBag

function RegularBag(){
    Bag.call(this);

}

RegularBag.prototype = Object.create(Bag.prototype)
RegularBag.prototype.constructor = RegularBag


/*TESTING User, Session, SessionContainer*/

const user1 = new User("Bordello", 1234);
console.log(`Username: ${user1.username} Password: ${user1.password}`)
let session1 = new Session(user1);
console.log(session1)
let sessions = new SessionContainer();
sessions.add(session1)
sessions.show_active().forEach(x => console.log(x))
session1.terminate()
sessions.show_active().forEach(x => console.log(x))

/*TETSING Business, Business Container*/

const bad = new Business("x", "x", 0, "x", "x")
let bc = new BusinessContainer()
bc.add(new Business("Vale", "Via", "0000", "None", "Veggy"))
bc.add(new Business("Mattia", "Via", "0000", "None", "Veggy"))
bc.add(new Business("Pollo", "Via", "0000", "None", "Veggy"))
bc.add(bad)

bc.show().forEach(x => console.log(x))
bc.delete(bad)
bc.show().forEach(x => console.log(x))

