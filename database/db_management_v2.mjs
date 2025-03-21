import sqlite from "sqlite3";

const db_name = "database/db2.sqlite";
const db = new sqlite.Database(db_name, (err) => { if (err) throw err; });

const runQuery = (sql, message) => {

    return new Promise((resolve, reject) => {

        db.run(sql, (err) => {
            if (err) {
                return reject(new Error(`SQL error: ${err.message}`));
            }
            resolve({success: true, message});
        });
    })
}


function businessTable() {

    const sql = `CREATE TABLE IF NOT EXISTS business(
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        phoneNumber INTEGER NOT NULL,
        cuisineType TEXT,
        foodCategory TEXT)`;

    return runQuery(sql, "Business Table created.")
};

function bagTable() {

    const sql = `CREATE TABLE IF NOT EXISTS bag(
        id INTEGER PRIMARY KEY,
        bagType TEXT NOT NULL,
        size TEXT NOT NULL,
        price REAL NOT NULL,
        businessFrom INTEGER,
        timestampStart TEXT NOT NULL,
        timestampEnd TEXT NOT NULL,
        removedItemsCounter INTEGER,
        FOREIGN KEY(businessFrom) REFERENCES business(id))`;

        return runQuery(sql, "Bag Table created.");
}

function foodTable() {

    const sql = `CREATE TABLE IF NOT EXISTS fooditem(
        id INTEGER PRIMARY KEY, 
        name TEXT NOT NULL, 
        quantity INTEGER NOT NULL, 
        bagId INTEGER NOT NULL,
        FOREIGN KEY(bagId) REFERENCES bag(id)
    )`;

    return runQuery(sql, "FoodItem Table created.");
}

function userTable(){

    const sql = `CREATE TABLE IF NOT EXISTS user(
        id INTEGER PRIMARY KEY, 
        username TEXT NOT NULL, 
        password TEXT NOT NULL, 
        status INTEGER NOT NULL)`;

    return runQuery(sql, "User Table created.");
}

async function main() {

    try {

        const stepCheck = (step) => {
            if (!step.success){
               throw new Error(step.message);
            }
            console.log(step.message);
        }

        const step1 = await userTable();
        stepCheck(step1);
        const step2 = await businessTable();
        stepCheck(step2);
        const step3 = await bagTable();
        stepCheck(step3);
        const step4 = await foodTable();
        stepCheck(step4);

    } catch (err) {
        console.log(err.message);
        
    } finally {

        if (db) {
            db.close((err) => {
                if (err) {
                    console.error('Error closing the database connection:', err.message);
                } else {
                    console.log('Database connection closed.');
                }
            });
        }
    }
}

main();

