import sqlite from "sqlite3";
import dayjs from "dayjs";

import { Business } from "../classes/business.mjs";
import { RegularBag, SurpriseBag, FoodItem } from "../classes/bag.mjs";
import { User } from "../classes/user.mjs";

const db_name = "database/db2.sqlite";
const db = new sqlite.Database(db_name, (err) => { if (err) throw err; });

function addBusiness(name, address, phone_number, cuisine_type, food_category) {

    const newBusiness = new Business(name, address, phone_number, cuisine_type, food_category);
    const sql = 'INSERT INTO business(name, address, phoneNumber, cuisineType, foodCategory) VALUES (?, ?, ?, ?, ?)';

    return new Promise((resolve, reject) => {

        db.run(sql, [name, address, phone_number, cuisine_type, food_category], function(err){
            if (err)
                reject(err);
            else {
                newBusiness.id = this.lastID;
                resolve(newBusiness);
            }
        });
    });
}

function addUser(username, password){

    const newUser = new User(username, password);
    const sql = 'INSERT INTO user(username, password, status) VALUES (?, ?, ?)';

    return new Promise((resolve, reject) => {

        db.run(sql, [newUser.username, newUser.password, newUser.status], function(err){

            if (err)
                reject(err);
            else{
                newUser.id = this.lastID;
                resolve(newUser)
            }
        });
    });
}

const promiseBag = (b) => new Promise((resolve, reject) => {
    const sqlBag = 'INSERT INTO bag(bagType, size, price, businessFrom, timestampStart, timestampEnd, removedItemsCounter) VALUES (?, ?, ?, ?, ?, ?, ?)';
    // TODO: fix timestampStart, timestampEnd parameters to correctly insert the dates
    
    const counter = undefined || b.removedItemsCounter;
    let inputs = [b.bag_type, b.size, b.price, b.business_from.id, b.timestamp_start.toString(), b.timestamp_end.toString(), counter];

    db.run(sqlBag, inputs, function(err){

        if (err)
            reject(err);
        else {
            b.id = this.lastID;
            resolve(b);
        }
    });
})
    

const promiseFood = (f, b) => new Promise((resolve, reject) => {
    const sqlFood = 'INSERT INTO fooditem(name, quantity, bagId) VALUES (?, ?, ?)';
    db.run(sqlFood, [f.name, f.quantity, b.id], function(err){

        if (err)
            reject(err);
        else {
            f.id = this.lastID;
            resolve(f);
        }
    })
})
    


async function addBag(constructor, food_items, size, price, business_from, timestamp_start, timestamp_end) {

    try {
        let newBag = new constructor(
            food_items, size, price, business_from, timestamp_start, timestamp_end
        ) 

        newBag = await promiseBag(newBag);
        console.log("Add new bag -> id:"+newBag.id);

        for (const item of food_items){

            const addedFood = await promiseFood(item, newBag);
            console.log("Add new food -> id:"+addedFood.id);
        }

        return newBag;
    }
    catch (err){

        throw new Error("addBag error:"+EvalError.message);
    }

}


async function main() {

    try {

        const bu1 = await addBusiness("Burger King", "Via X", "333", "fast food", "meat");
        console.log("==> Add new business -> id:", bu1.id);

        const bu2 = await addBusiness("Flower Burger", "Via Y", "334", "veggy", "vegetables");
        console.log("==> Add new business -> id:", bu2.id);

        const bu3 = await addBusiness("Carrot Maison", "Via Y", "335", "veggy", "vegetables");
        console.log("==> Add new business -> id:", bu3.id);

        const u1 = await addUser("pippo", "012345");
        console.log("==> Add new user -> id:"+u1.id);

        const u2 = await addUser("marko", "012345");
        console.log("==> Add new user -> id:"+u2.id);

        const u3 = await addUser("cleo97", "012345");
        console.log("==> Add new user -> id:"+u3.id);

        const poke = new FoodItem("Poké", 1);
        const salmon = new FoodItem("Salmon Nigiri", 5);
        const bao = new FoodItem("Bao", 3);
        const salmon2 = new FoodItem("Salmon Nigiri", 5);
        const bao2 = new FoodItem("Bao", 3);
        const veggyB1 = new FoodItem("Veggy burger with onions", 3);
        const veggyB2 = new FoodItem("Veggy burger with fake cheese", 3);
        const potatos1 = new FoodItem("French fries", 3);

        const bag1 = await addBag(
            RegularBag, [poke, salmon, bao], "large", 15.90, bu1, "2025-03-31", "2025-04-01"
        );
        console.log("==> Add new bag -> id:"+bag1.id);
        const bag2 = await addBag(
            SurpriseBag, [salmon2, bao2], "large", 15.90, bu1, "2025-03-31", "2025-04-01"
        );
        console.log("==> Add new bag -> id:"+bag2.id);
        const bag3 = await addBag(
            RegularBag, [veggyB1], "small", 10.00, bu2, "2025-04-30", "2025-05-01"
        )
        console.log("==> Add new bag -> id:"+bag3.id);
        const bag4 = await addBag(
            SurpriseBag, [veggyB2, potatos1], "medium", 15.00, bu3, "2025-04-30", "2025-05-01"
        )
        console.log("==> Add new bag -> id:"+bag4.id);


    } catch (err) {
        console.log(err);
    } finally {
        db.close((err) => {

            if (err) console.error(err.message);
            console.log('Close the database connection.');
        })
    }
}

main();