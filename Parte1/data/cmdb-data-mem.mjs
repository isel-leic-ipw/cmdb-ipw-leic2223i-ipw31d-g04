// possivel duvida como meter o os dados do movies em memoria
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
            totalDuration:0,
            userId:0
        }
    })

let maxId = NUM_GROUPS


export async function getGroups(userId,q,limit,skip){
    const predicate = q ? t => t.name.includes(q) : t => true
    const retGroups = groups
        .filter(t => t.userId == userId)
        .filter(predicate)
    const end = limit != Infinity ? (skip+limit) : retGroups.length
    return retTasks.slice(skip,  end)  //apenas tem de retornar o array groups
}

export function getGroup(groupId,userId){//path
    return findTaskAndDoSomething(userId, groupId, group => group)
}

export function deleteGroup(groupId,userId){//path
    return findTaskAndDoSomething(
        userId, 
        groupId, 
        (group,groupIdx) => { 
            groups.splice(groupIdx, 1)
            return group // porque deste return de grou
        })
}
/*
export function deleteGroup(groupId){//path
    const groupIdx = groups.findIndex(group => group.id == groupId)
    if(groupIdx != -1){
        groups.splice(groupIdx,1)
        return true
    }
    return false
}
*/

export async function createGroup(groupToCreate,userId,movies){// rever por causa do movie, meter os parametros em vez de array vazio etc
    let newGroup = {     //x = grupo
        "id":getNewId(),
        "name":groupToCreate.name,
        "description":groupToCreate.description,
        "movies":[],
        "totalDuration":0,
        "userId":userId
    }
    groups.push(newGroup)
    return newGroup  //resolver a promessa de criar o grupo
}




//usa o body e o path,este parametro esta mal, mas preciso dele tambem nao cm parametro
// a validação tem que ser feita noutro modulo, acho que da para otimizar o do prof
export function updatedGroup(groupId,groupToUpdate){
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
function findTaskAndDoSomething(userId, groupId, action) {
    const groupIdx = groups.findIndex(group => group.id == groupId && group.userId == userId)
    const group = groups[groupIdx]
    if(groupIdx != -1) {
        return action(group, groupIdx)//funcao que retorna uma funcao
    } 
}


function getNewId() {
    return maxId++
}

