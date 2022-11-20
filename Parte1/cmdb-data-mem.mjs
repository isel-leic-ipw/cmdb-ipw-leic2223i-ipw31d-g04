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

function getGroupsById(id){//path
    return groups.find(group => group.id == id)
}

function deleteGroup(id){//path
    const groupsIdx = groups.findIndex(group => group.id == id)
    if(groupsIdx != -1){
        groups.splice(groupsIdx,1)
        return true
    }
    return false
}

function editGroup(groupToEdit){//usa o body e o path,este parametro esta mal, mas preciso dele tambem nao cm parametro
    // a validação tem que ser feita noutro modulo, acho que da para otimizar o do prof
    const editedgroup= groups.find(group => group.id == groupToEdit.id)
    if(editedgroup != undefined) {
        editedgroup.title = groupToEdit.title
        editedgroup.description = groupToEdit.description
        return editedgroup
    } 

} 
//criar a funcao create random group


export const data = {
    getGroups,
    createGroup,
    getGroupsById,
    deleteGroup,
    editGroup
}

export default data
