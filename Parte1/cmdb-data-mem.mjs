
const groups= []
let nextId= 1

function getGroups(){
    return groups   //apenas tem de retornar o array groups
}

function createGroup(name, desc){
    const x = {     //x = grupo
        "id":nextId,
        "name":name,
        "desc":desc,
        "movies":[],
        "totalDuration":0
    }
    groups.push(x)
    ++nextId
    return Promise.resolve(x)   //resolver a promessa de criar o grupo
}

function getGroupById(id){

}

//editGroup

//deleteGroup

export const data = {
    getGroups,
    createGroup,
    getGroupById,
}

export default data