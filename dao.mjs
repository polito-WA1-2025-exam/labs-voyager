/* Data Access Object (DAO) module for accessing db */
import sqlite from 'sqlite3';
import {Business} from './classes/business.mjs'
import {SurpriseBag, RegularBag} from './classes/bag.mjs'

const db = new sqlite.Database('db2.sqlite', (err) => {if (err) throw err});

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


export const postBusiness = () => {}
export const putBusiness = () => {}

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

export const postBag = () => {}
export const putBag = () => {}

// TODO: add CRUD for foodItem