import sqlite from "sqlite3";

const db_name = "database/db.sqlite"
const db = new sqlite.Database(db_name, (err) => { if (err) throw err; });

const sql_business_query = `CREATE TABLE IF NOT EXISTS business(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    phoneNumber INTEGER NOT NULL,
    cuisineType TEXT,
    foodCategory TEXT
)`;

const sql_bag_query = `CREATE TABLE IF NOT EXISTS bag(
    id INTEGER PRIMARY KEY,
    bagType TEXT NOT NULL,
    size TEXT NOT NULL,
    price REAL NOT NULL,
    businessFrom INTEGER,
    timestampStart TEXT NOT NULL,
    timestampEnd TEXT NOT NULL,
    removedItemsCounter INTEGER,
    FOREIGN KEY(businessFrom) REFERENCES business(id)
)`;

const sql_food_item_query = `CREATE TABLE IF NOT EXISTS fooditem(
    id INTEGER PRIMARY KEY, 
    name TEXT NOT NULL, 
    quantity INTEGER NOT NULL, 
    bagId INTEGER NOT NULL,
    FOREIGN KEY(bagId) REFERENCES bag(id)
)`;

const sql_user_query = `CREATE TABLE IF NOT EXISTS user(
    id INTEGER PRIMARY KEY, 
    username TEXT NOT NULL, 
    password TEXT NOT NULL, 
    status INTEGER NOT NULL
)`;

let create_business_table = new Promise(
  (resolve, reject) => {

    db.run(sql_business_query, (err) => {
        if (err) reject(err);
        else resolve("Business Table created.");
    })
  }
);

let create_user_table = new Promise(
  (resolve, reject) => {

    db.run(sql_user_query, (err) => {
        if (err) reject(err);
        else resolve("User Table created.");
    })
  }
);

let create_bag_table = new Promise(
  (resolve, reject) => {

    db.run(sql_bag_query, (err) => {
        if (err) reject(err);
        else resolve("Bag Table created.");
    })
  }
);

let create_fooditem_table = new Promise(
  (resolve, reject) => {

    db.run(sql_food_item_query, (err) => {
        if (err) reject(err);
        else resolve("Fooditem Table created.");
    })
  }
);

create_user_table.then(mx => console.log(mx)).catch(err => console.log(err));
create_business_table.then(mx => {
  console.log(mx);
  return create_bag_table;
}).then( mx => {
  console.log(mx);
  return create_fooditem_table;
}).then(mx => console.log(mx)).catch(err => console.log(err));


Promise.all([create_user_table, create_business_table, create_bag_table, create_fooditem_table]).then(() => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
}).catch(err => console.log(err));