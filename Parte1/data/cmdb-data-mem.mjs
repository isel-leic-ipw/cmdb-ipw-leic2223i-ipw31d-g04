
let nextId= 1

const NUM_GROUPS = 3

// este código é para ajudar a realizar testes
let groups = new Array(NUM_GROUPS).fill(0, 0, NUM_GROUPS)
    .map((_, idx) => {
        return {
            id: idx,
            name: `Group ${idx}`,
            description: `Group ${idx} description`,
            movies:[],
            totalDuration:0
        }
    })

let maxId = NUM_GROUPS


export async function getGroups(){
    return groups   //apenas tem de retornar o array groups
}

export function getGroupById(groupId){//path
    return groups.find(group => group.id == groupId)
}

export function deleteGroup(groupId){//path
    const groupIdx = groups.findIndex(group => group.id == groupId)
    if(groupIdx != -1){
        groups.splice(groupIdx,1)
        return true
    }
    return false
}

export async function createGroup(groupToCreate){
    let newGroup = {     //x = grupo
        "id":getNewId(),
        "name":groupToCreate.name,
        "description":groupToCreate.description,
        "movies":[],
        "totalDuration":0
    }
    groups.push(newGroup)
    return newGroup  //resolver a promessa de criar o grupo
}

//usa o body e o path,este parametro esta mal, mas preciso dele tambem nao cm parametro
// a validação tem que ser feita noutro modulo, acho que da para otimizar o do prof

export function updateGroup(groupId,groupToUpdate){
    const updateGroup= groups.find(group => group.id == groupId)
    if(updateGroup != undefined) {
        const groupIdx = groups.findIndex(group => group.id == groupId)
        updateGroup.name = groupToUpdate.name
        updateGroup.description = groupToUpdate.description
        groups.splice(groupIdx,0,updateGroup)
        return updateGroup
    } 

} 
//criar a funcao create random group

function getNewId() {
    return maxId++
}

