import sqlite from "sqlite3";

const db_name = "./db.sqlite"
const db = new sqlite.Database(db_name, (err) => { if (err) throw err; });

sql_business_query = `CREATE TABLE business(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    phoneNumber INTEGER NOT NULL,
    cuisineType TEXT,
    foodCategory TEXT
)`;

sql_bag_query = `CREATE TABLE bag(
    id INTERGER PRIMARY KEY,
    bagType TEXT NOT NULL,
    size TEXT NOT NULL,
    price REAL NOT NULL,
    businessFrom INTEGER,
    FOREIGN KEY(businessFrom) REFERENCES business(id),
    timestampStart TEXT NOT NULL,
    timestampEnd TEXT NOT NULL,
    removedItemsCounter INTEGER
)`;

sql_food_item_query = `CREATE TABLE fooditem(
    id INTEGER PRIMARY KEY, 
    name TEXT NOT NULL, 
    quantity INTEGER NOT NULL, 
    bagId INTEGER NOT NULL,
    FOREIGN KEY(bag) REFERENCES bag(id)
)`;

sql_user_query = `CREATE TABLE user(
    id INTEGER PRIMARY KEY, 
    username TEXT NOT NULL, 
    password TEXT NOT NULL, 
    status INTEGER NOT NULL
)`;

db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
});