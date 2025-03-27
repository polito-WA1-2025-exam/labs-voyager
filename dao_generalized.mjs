import sqlite from 'sqlite3';
import {Business} from './classes/business.mjs'
import {SurpriseBag, RegularBag, FoodItem} from './classes/bag.mjs'

const db = new sqlite.Database('./database/db2.sqlite', (err) => {if (err) throw err});

const businessMapper = (b) => new Business(b.name, b.address, b.phoneNumber, b.cuisineType, b.foodCategory, b.id);
const bagMapper = (r) => (r.bagType === 'Surprise') ? new SurpriseBag([], r.size, r.price, r.businessFrom, r.timestampStart, r.timestampEnd) : new RegularBag([], r.size, r.price, r.businessFrom, r.timestampStart, r.timestampEnd);
const foodItemMapper = (f) => new FoodItem(f.name, f.quantity)

const get = (table, mapper) => {

    return new Promise((resolve, reject) => {

        db.all(`SELECT * FROM ${table}`, [], (err, rows) => {

            if (err)
                reject(err);
            else if (rows == undefined){
                reject({error: table+' not present, check inserted id'})
            } else {
                resolve(rows.map(mapper));
            }
        })
    })
}

export const getBusinesses = () => get("business", businessMapper);
export const getBags = () => get("bag", bagMapper);
export const getFoodItems = () => get("fooditem", foodItemMapper);



process.on('SIGINT', () => {
    db.close();
    process.exit(0);
});