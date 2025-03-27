/* Data Access Object (DAO) module for accessing db */
import sqlite from 'sqlite3';
import {Business} from './classes/business.mjs'
import {SurpriseBag, RegularBag, FoodItem} from './classes/bag.mjs'

const db = new sqlite.Database('./database/db2.sqlite', (err) => {if (err) throw err});

export const getBusinesses = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM business';
        db.all(query, [], (err, rows) => {
            if (err)
                reject(err);
            else {
                const businesses = rows.map(b => new Business(b.name, b.address, b.phoneNumber, b.cuisineType, b.foodCategory, b.id));
                resolve(businesses);
            }
        })
    });
}


export const getBusiness = (id) => {
    return new Promise ((resolve, reject) => {
        const query = 'SELECT * from business WHERE id=?';
        db.get(query, [id], (err, row) => {
            if (err)
                reject(err);
            else if (row == undefined) {
                resolve({error: 'Business not present, check inserted id'})
            } 
            else {
                const business = new Business(row.name, row.address, row.phoneNumber, row.cuisineType, row.foodCategory, row.id);
                resolve(business);
            }
        })
    })
}


export const postBusiness = (json) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO business(name, address, phoneNumber, cuisineType, foodCategory) VALUES (?, ?, ?, ?, ?)';
        if (json == undefined)
            reject({error: "Post request body is missing"})
        db.run(query, [json.name, json.address, json.phoneNumber, json.cuisineType, json.foodCategory], function(err){
            if (err)
                reject(err)
            else {
                const newId = this.lastID;
                if (newId == undefined)
                    reject({error: "Fail to insert new business"});
                else
                    resolve(newId);
            }
        })
    })
}

export const findRecord = (id, table) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * from ${table} WHERE id=?`;
        if (id == undefined)
            reject({error: "id is undefined"});
        db.get(query, [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row !== undefined);
            }
        });
    })
}

export const putBusiness = (buId, json) => {

    return new Promise( async (resolve, reject) => {

        const query = "UPDATE business SET name=?, address=?, phoneNumber=?, cuisineType=?, foodCategory=? WHERE business.id=?";
        if (json == undefined)
            reject({error: "Put request body is missing"});
        if (await findRecord(buId, "business") == false)
            reject({error: "Business not present, check inserted id."})
        
        db.run(query, [json.name, json.address, json.phoneNumber, json.cuisineType, json.foodCategory, buId], function(err){
            if (err)
                reject(err)
            else {
                const newId = this.lastID;
                if (newId == undefined)
                    reject({error: "Fail to update business"});
                else
                    resolve(newId);
            }
        })
    })
}

export const deleteBusiness = () => {}

export const getBags = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM bag';
        db.all(query, [], (err, rows) => {
            if (err)
                reject(err);
            else {
                const bags = [];
                for (const r of rows) {
                    if (r.bagType === 'Surprise') {
                        const sb = new SurpriseBag([], r.size, r.price, r.businessFrom, r.timestampStart, r.timestampEnd);
                        bags.push(sb);
                    } else {
                        const rb = new RegularBag([], r.size, r.price, r.businessFrom, r.timestampStart, r.timestampEnd);
                        // TODO:
                        // retreive food items from db
                        // append food items to regular bag
                        bags.push(rb);
                    }
                }
                resolve(bags);
            }
        })
    })
}


export const getBag =  (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM bag WHERE id=?';
        db.get(query, [id], (err, row) => {
            if (err)
                reject(err);
            else if (row == undefined) {
                resolve({error: 'Bag not present, check inserted id.'})
            }
            else {
                if (row.bagType === 'Surprise') {
                    const bag = new SurpriseBag([], row.size, row.price, row.businessFrom, row.timestampStart, row.timestampEnd);
                    resolve(bag);
                } else {
                    const bag = new RegularBag([], row.size, row.price, row.businessFrom, row.timestampStart, row.timestampEnd);
                    resolve(bag);
                }
            }
        })
    })
}


export const getBagsOfBusiness = (businessId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM bag WHERE businessFrom=?';
        db.all(query, [businessId], (err, rows) => {
            if (err)
                reject(err);
            else if (rows == undefined) {
                resolve({error: 'Business not present, check inserted id.'})
            }
            else {
                const bags = [];
                rows.map(b => {
                    if (b.bagType === 'Surprise') {
                        bags.push(new SurpriseBag([], b.size, b.price, b.businessFrom, b.timestampStart, b.timestampEnd));
                    } else {
                        bags.push(new RegularBag([], b.size, b.price, b.businessFrom, b.timestampStart, b.timestampEnd));
                    }
                });
                resolve(bags);
            }
        })
    })
}

const createFoodItem = (name, quantity, bagId) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO fooditem(name, quantity, bagId) VALUES (?, ?, ?)";
        if (name == undefined || quantity == undefined || bagId == undefined){
            reject({error: "Data is missing"})
        }
        db.run(query, [name, quantity, bagId], function(err){
            if (err)
                reject(err);
            else {
                const lastId = this.lastID;
                if (lastId == undefined)
                    reject({error: "Fail to insert new fooditem"});
                else
                    resolve(lastId);
            }  
        })
    })
} 

export const postBag = (buId, json) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO bag(bagType, size, price, businessFrom, timestampStart, timestampEnd, removedItemsCounter, isAvailable) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        if (json == undefined)
            reject({error: "Post request body is missing"})
        // Assumption: a new bag is always available and no food items have been removed 
        const counter = (json.bagType == "Surprise") ? undefined : 0;
        db.run(query, [json.bagType, json.size, json.price, buId, json.timestampStart, json.timestampEnd, counter, 1], function(err){
            if (err)
                reject(err);
            else {
                const lastId = this.lastID;
                if (lastId == undefined)
                    reject({error: "Fail to insert new bag"});
                else {
                    json.foodItems.map(async(f) => {
                        await createFoodItem(f.name, f.quantity, lastId).catch(err => reject(err.message))
                    })
                    resolve(lastId);
                }
                    
            }
        })
    })
}

export const putBag = () => {}
export const deleteBag = () => {}

export const getFoodItems = () => {}
export const postFoodItem = () => {}
export const putFoodItem = () => {}
export const deleteFoodItem = () => {}

export const getFoodItemsOfBags = (bagId) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM fooditem WHERE bagId=?"
        db.all(query, [bagId], (err, rows) => {
            if (err)
                reject(err);
            else if (rows == undefined) {
                resolve({error: 'Bag not present, check inserted id.'})
            } else {
                const fooditems = []
                rows.map(f => fooditems.push(new FoodItem(f.name, f.quantity, f.id)));
                resolve(fooditems);
            }
        })
    })
}

