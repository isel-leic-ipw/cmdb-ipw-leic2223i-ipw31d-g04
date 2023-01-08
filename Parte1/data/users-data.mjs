import crypto from 'crypto'

const NUM_USERS = 2

let users = new Array(NUM_USERS).fill(0, 0, NUM_USERS)
    .map((_, idx) => {
        return {
            id: idx,
            name: `User ${idx}`,
            email: `User${idx}@slb.pt`,
            password: `12345`,
            token: "ef604e80-a351-4d13-b78f-c888f3e63b60"// + idx
        }
    })
let maxId = NUM_USERS


export async function getUser(userToken) {
    return users.find(user => user.token == userToken)
}

export async function createNewUser(userName, userEmail, password){
    let newUser = {
        id: getNewId(),
        name:userName,
        email:userEmail,
        password:password,
        token: crypto.randomUUID()
    }
    users.push(newUser)
    return newUser  //resolver a promessa de criar o grupo
}
function getNewId (){
    return maxId++
}