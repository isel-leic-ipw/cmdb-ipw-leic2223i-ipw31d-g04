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

function getGroupsById(id){
    return groups.find(group => group.id == id)
}

function deleteGroup(id){
    const groupsIdx = groups.findIndex(group => group.id == id)
    if(groupsIdx != -1){
        groups.splice(groupsIdx,1)
        return true
    }
    return false
}

function editGroup(id){// a validação tem que ser feita noutro modulo, acho que da para otimizar o do prof
    const group= groups.find(group => group.id == id)
    if(group != undefined) {
        group.title = req.body.title
        group.description = req.body.description
        return group
    }

}


export const data = {
    getGroups,
    createGroup,
    getGroupsById,
    deleteGroup,
    editGroup
}

export default data