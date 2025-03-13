import {User, Session, SessionContainer} from "../classes/user.mjs"
import { FoodItem, Bag } from "../classes/bag.mjs";
import dayjs from "dayjs";

const user1 = new User("Bordello", 1234);
// console.log(`Username: ${user1.username} Password: ${user1.password}`)
let session1 = new Session(user1);
// console.log(session1)
let sessions = new SessionContainer();
sessions.add(session1)
// sessions.show_active().forEach(x => console.log(x))
session1.terminate()
// sessions.show_active().forEach(x => console.log(x))

const fi1 = new FoodItem("Poké", 1);
const fi2 = new FoodItem("Tuna Nigiri", 5);
const fi3 = new FoodItem("Salmon Nigiri", 5);
const fi4 = new FoodItem("Bao", 3);
const fi5 = new FoodItem("Maki", 4);

const rb1 = new Bag("rb1", [fi1, fi2, fi3], "medium", 12, "store", dayjs("2025-03-31"), dayjs("2025-04-01"));
const rb2 = new Bag("rb2", [fi1, fi2, fi3, fi4, fi5], "large", 12, "store", dayjs("2025-03-31"), dayjs("2025-04-01"));

user1.addBag(rb2);
user1.shopping_cart.list_bags.forEach(b => console.log(b.food_items));
user1.shopping_cart.removeItem(fi1, rb2);
user1.shopping_cart.removeItem(fi2, rb2);
console.log(`Removed ${rb2.removedItemsCounter} items from bag ${rb2.bag_type}.`);
user1.shopping_cart.list_bags.forEach(b => console.log(b.food_items));
user1.removeItem(fi3, rb2);
user1.shopping_cart.list_bags.forEach(b => console.log(b.food_items));