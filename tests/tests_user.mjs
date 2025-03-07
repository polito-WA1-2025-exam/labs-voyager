import {User, Session, SessionContainer} from "../classes/user.mjs"

const user1 = new User("Bordello", 1234);
console.log(`Username: ${user1.username} Password: ${user1.password}`)
let session1 = new Session(user1);
console.log(session1)
let sessions = new SessionContainer();
sessions.add(session1)
sessions.show_active().forEach(x => console.log(x))
session1.terminate()
sessions.show_active().forEach(x => console.log(x))


