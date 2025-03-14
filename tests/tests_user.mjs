import {User} from "../classes/user.mjs"

const user1 = new User("Bordello", 1234);

console.log(user1.logIn().showStatus())

try{
    const uEmpty = new User();
} catch (error) {
    console.log(error.message);
}


