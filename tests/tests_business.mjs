import { Business, BusinessContainer } from "../classes/business.mjs"

/*TESTING Business, Business Container*/

const bad = new Business("x", "x", 0, "x", "x")
let bc = new BusinessContainer()
bc.add(new Business("Vale", "Via", "0000", "None", "Veggy"))
bc.add(new Business("Mattia", "Via", "0000", "None", "Veggy"))
bc.add(new Business("Pollo", "Via", "0000", "None", "Veggy"))
bc.add(bad)

bc.show().forEach(x => console.log(x))
bc.delete(bad)
bc.show().forEach(x => console.log(x))