import {MAX_LIMIT} from "../services/services-constants.mjs";


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
            userId: 0
        }
    })

let maxId = NUM_GROUPS


export async function getGroups(userId,q,skip,limit,){
    const predicate = q ? t => t.title.includes(q) : t => true
    const retGroups = groups
        .filter(t => t.userId == userId)
        .filter(predicate)
    const end = limit != MAX_LIMIT ? (skip + limit) : retGroups.length +1
    return groups.slice(skip,end)
}

export async function getGroupById(userId, groupId){//path
    return findGroupAndDoSomething(
        userId,
        groupId,
        (group, groupId) => {
            return group
        }
    )
}

export async function deleteGroup(userId, groupId){//path
    return findGroupAndDoSomething(
        userId,
        groupId,
        (group,groupIdx) => {
            groups.splice(groupIdx,1)
            return group
        }
    )
}

export async function createGroup(userId,groupToCreate){
    let newGroup = {     //x = grupo
        id:getNewId(),
        name:groupToCreate.name,
        description:groupToCreate.description,
        movies:[],
        totalDuration:0,
        userId: userId
    }
    groups.push(newGroup)
    return newGroup  //resolver a promessa de criar o grupo
}

//usa o body e o path,este parametro esta mal, mas preciso dele tambem nao cm parametro
// a validação tem que ser feita noutro modulo, acho que da para otimizar o do prof

export async function updateGroup(userId, groupId,groupToUpdate){
    return findGroupAndDoSomething(
        userId,
        groupId,
        (group, groupIdx) => {
            group.name = groupToUpdate.name
            group.description = groupToUpdate.description
            return group
        })
}

export async function addMovieToGroup (userId,groupId, movie){
    return findGroupAndDoSomething(
        userId,
        groupId,
        group => {
            const movieIdx = group.movies.findIndex(m => m.id == movie.id)
            if (movieIdx == -1){
                group.movies.push(movie)
                group.totalDuration += parseInt(movie.duration)
                return movie
            }
        }
    )
}
export async function removeMovieFromGroup(userId,groupId, movieId){
    return findGroupAndDoSomething(
        userId,
        groupId,
        group => {
            const movieIdx = group.movies.findIndex(movie => movie.id == movieId)
            if (movieIdx != -1) {
                group.movies.splice(movieIdx,1)
                return group
            }
        }
    )
}

// Auxiliary functions
function findGroupAndDoSomething(userId, groupId, action) {
    const groupIdx = groups.findIndex(group => group.id == groupId && group.userId == userId)
    const group = groups[groupIdx]
    if(groupIdx != -1) {
        return action(group, groupIdx)
    }
}
function getNewId() {
    return maxId++
}

/*
export function updateGroup(groupId,groupToUpdate){
    const updateGroup= groups.find(group => group.id == groupId)
    if(updateGroup != undefined) {

        const groupIdx = groups.findIndex(group => group.id == groupId)
        updateGroup.name = groupToUpdate.name
        updateGroup.description = groupToUpdate.description
        groups.splice(groupIdx,1,updateGroup)
        return updateGroup
    }
}
*/