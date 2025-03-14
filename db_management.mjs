import sqlite from "sqlite3";

const db_name = "./db.sqlite"
const db = new sqlite.Database(db_name, (err) => { if (err) throw err; });

sql_business_query = `CREATE TABLE business(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    phoneNumber INTEGER NOT NULL,
    cuisineType TEXT,
    foodCategory TEXT)`

sql_bag_query = `CREATE TABLE bag(
    id INTERGER PRIMARY KEY,
    bagType TEXT NOT NULL,
    size TEXT NOT NULL,
    price REAL NOT NULL,
    businessFrom INTEGER,
    FOREIGN KEY(businessFrom) REFERENCES business(id),
    timestampStart TEXT NOT NULL,
    timestampEnd TEXT NOT NULL,
    removedItemsCounter INTEGER)`

sql_food_item_query = `CREATE TABLE fooditem(
    
)` 

db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });