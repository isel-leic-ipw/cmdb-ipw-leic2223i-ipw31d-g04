const NUM_USERS = 2    
let newUser=NUM_USERS

let users = new Array(NUM_USERS).fill(0, 0, NUM_USERS)
    .map((_, idx) => { 
        return {
            id: idx,
            name: `User ${idx}`,
            email: `User${idx}@slb.pt`,
            token: "ef604e80-a351-4d13-b78f-c888f3e63b6" + idx
        } 
    })



export async function getUser(userToken) {
    return users.find(user => user.token == userToken)
}

export async function createNewUser(){

let newGroup = {     //x = grupo
    id:getNewUserId(),
    name: `User ${id}`,
    email: `User${id}@slb.pt`,
    token: "ef604e80-a351-4d13-b78f-c888f3e63b6" + id
} 

groups.push(newGroup)
return newGroup  //resolver a promessa de criar o grupo
}


function getNewUserId() {
    return newUser++
}
