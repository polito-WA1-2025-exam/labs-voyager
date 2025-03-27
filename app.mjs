import express from "express";
import morgan from "morgan";
import sqlite from "sqlite3";

import {Business} from "./classes/business.mjs";
import {RegularBag, SurpriseBag, FoodItem} from "./classes/bag.mjs";
import {User} from "./classes/user.mjs";

// Database
const db_name = "database/db2.sqlite";
const db = new sqlite.Database(db_name, (err) => { if (err) throw err; });

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

function HideSurpriseBagItemsMiddleware(req, res, next){

    const originalJson = res.json;

    res.json = function(body){

        if (body && Array.isArray(body)){

            body = body.map(item => {

                item["food_items"] = item["bag_type"] === "Surprise" ? [] : item["food_items"];
                return item;
            })

        } else {
            console.log('Response body not valid for modification, passing to next middleware');
            return next();
        }

        originalJson.call(this, body);
    }

    next();
}

// Database Queries Management 
const runQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) return reject(err);
            resolve(rows || []); 
        });
    });
};

const selectAll = (table) => {
    return runQuery(`SELECT * FROM ${table}`);
};

const conditionedSelectAll = (table, attr, value) => {
    return runQuery(`SELECT * FROM ${table} WHERE ${attr} = ?`, [value]);
};

// Bag Management 
async function mapBags(row) {
    let foods = await conditionedSelectAll("fooditem", "bagId", row.id);
    foods = foods.map(f => new FoodItem(f.name, f.quantity, f.id));

    const bag = row.bagType === "Regular"
        ? new RegularBag(foods, row.size, row.price, row.businessFrom, row.timestampStart, row.timestampEnd, row.removedItemsCounter, row.id)
        : new SurpriseBag(foods, row.size, row.price, row.businessFrom, row.timestampStart, row.timestampEnd, row.id);

    return bag;
}


// Endpoints
const root = '/';
const home = `${root}home`;
const allBusinesses = `${home}/businesses`;
const allAvailableBags = `${home}/bags`;
const bagFromBags = `${allAvailableBags}/:bagId`;
const allBagsPerBusiness = `${allBusinesses}/:buId/bags`;
const bagPerBusiness = `${allBagsPerBusiness}/:bagId`;


// Root Endpoint: TESTING
app.get(root, (req, res) => res.send("The server works."));

// Home Endpoint
app.get(home, (req, res) => res.send("Home page"));

// Businesses Endpoint 
app.get(allBusinesses, async (req, res) => {

    try {
        let rows = await selectAll("business");
        let objects = rows.map(row => new Business(row.name, row.address, row.phoneNumber, row.cuisineType, row.foodCategory, row.id)).sort((a, b) => a.name.localeCompare(b.name));
    
        res.json(objects);
    }
    catch (error){
        console.log(error);
        res.status(500).json({ message: 'Error fetching businesses: '+error.message });
    }

});

app.get(allBagsPerBusiness, HideSurpriseBagItemsMiddleware, async (req, res) => {

    try {
        const buId = req.params.buId;

        if (!buId || buId.trim() === "") throw new Error("buId is not defined");

        let rows = await runQuery(`SELECT * FROM bag WHERE businessFrom = ? and isAvailable = ?`, [buId, 1]);
        if (rows.length === 0) {
            res.status(400).json({message: `Business ${buId} not found.`});
        } else {
            let objects = await Promise.all(rows.map(row => mapBags(row)));
            res.json(objects);
        }
        
    } catch (error){
        console.log(error);
        res.status(500).json({ message: 'Error fetching bags : '+error.message });
    }
    
});

// Bags Endpoint
app.get(allAvailableBags, HideSurpriseBagItemsMiddleware, async (req, res) => {

    try {
        let rows = await conditionedSelectAll("bag", "isAvailable", 1);
        let objects = await Promise.all(rows.map(row => mapBags(row)));

        res.json(objects)
    }
    catch (error){
        console.log(error);
        res.status(500).json({ message: 'Error fetching bags: '+error.message });
    }
});

// Server Activation
const port = 3000;
const server = app.listen(port, () => console.log("Server ready on port "+port));

process.on('SIGINT', () => {
    console.log("Closing database connection...");

    db.close((err) => {
        if (err)
            console.error(`Error closing ${db_name}: ${err.message}`);
        else{
            console.log(`Database ${db_name}: connection closed.`);
        }

        server.close(() => {

            console.log('Server stopped.');
            process.exit(0);
        });
    });    
});

