import sqlite from "sqlite3";
import { FoodItem } from "../classes/bag.mjs";
import { Business } from "../classes/business.mjs";
import { RegularBag } from "../classes/bag.mjs";
import dayjs from "dayjs";

const db = new sqlite.Database('./db.sqlite', (err) => {if (err) throw err});

const b1 = new Business("Burger King", "Via X", "333", "fast food", "meat");


const fi1 = new FoodItem("Poké", 1);
const fi2 = new FoodItem("Tuna Nigiri", 5);
const fi3 = new FoodItem("Salmon Nigiri", 5);
const fi4 = new FoodItem("Bao", 3);
const fi5 = new FoodItem("Maki", 4);
const rb1 = new RegularBag( [fi1, fi2, fi3, fi4, fi5], "large", 12, "store", dayjs("2025-03-31"), dayjs("2025-04-01"));

const query_add_b1 = 'INSERT INTO business(name, address, phoneNumber, cuisineType, foodCategory) VALUES (?, ?, ?, ?, ?)';
const promise_add_b1 = new Promise((resolve, reject) => { 
    db.run(query_add_b1, [b1.name, b1.address, b1.phone_number, b1.cuisine_type, b1.food_category], function(err) {
        if (err)
            reject(err);
        else {
            rb1.id = this.lastID;
            resolve(b1.id);
        }
    })
});

promise_add_b1.then(id => console.log(id)).then(err => console.log(err));


// query_retrieve_b1_id
// b1 = new Business()
// query_add_rb1 = `INSERT INTO bag(bagType, size, price, businessFrom, timestampStart, timestampEnd, removedItemsCounter) VALUES (?, ?, ?, ?, ?, ?, ?)`;
// db.run(query_add_rb1, [rb1.bag_type, rb1.size, rb1.price, rb1.business_from, rb1.timestamp_start, rb1.timestamp_end, rb1.removedItemsCounter], err => {
//     console.log(err.message);
// })

// query_add_fi1 = `INSERT INTO fooditem(name, quantity) VALUES (?, ?})`;
