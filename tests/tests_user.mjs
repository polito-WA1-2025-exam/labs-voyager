import {User} from "../classes/user.mjs"
import { FoodItem, RegularBag, SurpriseBag } from "../classes/bag.mjs";
import dayjs from "dayjs";

const user1 = new User("Bordello", 1234);

console.log(user1.logIn().showStatus())

try{
    const uEmpty = new User();
} catch (error) {
    console.log(error.message);
}


const fi1 = new FoodItem("Poké", 1);
const fi2 = new FoodItem("Tuna Nigiri", 5);
const fi3 = new FoodItem("Salmon Nigiri", 5);
const fi4 = new FoodItem("Bao", 3);
const fi5 = new FoodItem("Maki", 4);


const rb2 = new RegularBag( [fi1, fi2, fi3, fi4, fi5], "large", 12, "store", dayjs("2025-03-31"), dayjs("2025-04-01"));
const sb1 = new SurpriseBag( [fi1, fi2, fi3, fi4, fi5], "large", 12, "store", dayjs("2025-03-31"), dayjs("2025-04-01"));


user1.retrieveCart().addBag(rb2);
user1.retrieveCart().showBags().forEach(b => console.log(b.food_items));
user1.retrieveCart().removeItem(fi1, rb2);
user1.retrieveCart().removeItem(fi2, rb2);
console.log(`Removed ${rb2.getRemovedItemsCounter()} items from bag ${rb2.bag_type}.`);
user1.retrieveCart().showBags().forEach(b => console.log(b.food_items));
user1.retrieveCart().removeItem(fi3, rb2);
user1.retrieveCart().showBags().forEach(b => console.log(b.food_items));

user1.retrieveCart().addBag(sb1);
user1.retrieveCart().removeItem(fi1, sb1);