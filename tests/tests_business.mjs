import { Business, BusinessContainer } from "../classes/business.mjs"

/*TESTING Business, Business Container*/

let bc = new BusinessContainer();
const burgerKing = new Business("Burger King", "Via X", "333", "fast food", "meat");
bc.addBusiness(burgerKing).addBusiness(new Business("Eataly", "Via Y", "334", "fast food", "meat"));
bc.showBusinesses().forEach(b => console.log(b));
bc.deleteBusiness(burgerKing).showBusinesses().forEach(b => console.log(b));

try{
    const bEmpty = new Business();
} catch (error) {
    console.log(error.message);
}