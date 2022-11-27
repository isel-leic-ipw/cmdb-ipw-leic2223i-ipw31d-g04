// não pode ter saber nem ter conhecimento do http,só tem a ver com a logica da aplicaçãoe, nao pode saber nada do request,response
//este modulo tem como opera~çoes/meotod neste caso exportar como o gettask
//todos recebem como parametro o taskID(que é o que vem no equest.params.id), mas supostamente eles nao podiam ter acesso a tudo que envolve http
import * as groupsData from '../data/cmdb-data-mem.mjs'
import * as usersData from '../data/users-data.mjs'
import errors from '../errors.mjs'
import {MAX_LIMIT} from "./services-constants.mjs";

export async function  getGroups(userToken,q,skip=0,limit=MAX_LIMIT){//obtem os grupos todos, não precisa de parametros
    limit = Number(limit)
    skip = Number (skip)
    if(    isNaN(limit)
        || isNaN(skip)
        || skip > MAX_LIMIT
        || limit > MAX_LIMIT
        || (skip+limit) > MAX_LIMIT
        || skip < 0
        || limit < 0
    ){
        throw  errors.INVALID_PARAMETER("skip or limit", `Skip and limit must be positive, less than ${MAX_LIMIT} and its sum must be less or equal to ${MAX_LIMIT}`)
    }
    const user = await usersData.getUser(userToken)
    if(!user){
        throw errors.USER_NOT_FOUND()
    }
    return  groupsData.getGroups(user.id, q, skip,limit )     //validar se existe grupos. N é necessário pois se n há grupos, n imprime nada
}

export async function getGroupsById(userToken, groupId){
    const user = await usersData.getUser(userToken)
    if(!user){
        throw errors.USER_NOT_FOUND()
    }
    const group = await groupsData.getGroupById(user.id,groupId)
    if(group){
        return group
    }
    throw errors.GROUP_NOT_FOUND(groupId)
}
export async function createGroup(userToken, groupToCreate){
    const user = await usersData.getUser(userToken)
    if(!user){
        throw errors.USER_NOT_FOUND()
    }
    if(!isAString(groupToCreate.name))
        throw errors.INVALID_PARAMETER(groupToCreate.name)
    if(!isAString(groupToCreate.description))
        throw errors.INVALID_PARAMETER(groupToCreate.description)
    return groupsData.createGroup(user.id, groupToCreate)
}

export async function deleteGroup(userToken, groupId){
    const user = await usersData.getUser(userToken)
    if(!user){
        throw errors.USER_NOT_FOUND()
    }
    return groupsData.deleteGroup(user.id, groupId)
}

export async function updateGroup(userToken,groupId, groupToUpdate){
    const user = await usersData.getUser(userToken)
    if(!user){
        throw errors.USER_NOT_FOUND()
    }
    if(!isAString(groupToUpdate.name))
    throw errors.INVALID_PARAMETER(groupToUpdate.name)
    if(!isAString(groupToUpdate.description))
    throw errors.INVALID_PARAMETER(groupToUpdate.description)
    return groupsData.updateGroup(user.id, groupId,groupToUpdate)
}

export async function removeMovieFromGroup(userToken, groupId, movieId){
    const user = await usersData.getUser(userToken)
    if(!user){
        throw errors.USER_NOT_FOUND()
    }
    const group = await groupsData.getGroupById(user.id,groupId)
    if(!group){
        throw errors.GROUP_NOT_FOUND( groupId)
    }
    const retMovie = await groupsData.removeMovieFromGroup(user.id, groupId,movieId)
    if(!retMovie){
        throw errors.MOVIE_NOT_FOUND(movieId)
    }
    return retMovie
}

export async function addMovieToGroup(userToken, groupId, movieId, title, duration){
    const user = await usersData.getUser(userToken)
    if(!user){
        throw errors.USER_NOT_FOUND()
    }
    const movie = {
        id : movieId,
        title: title,
        duration: duration
    }
    const group = await groupsData.getGroupById(user.id,groupId)
    if(!group){
        throw errors.GROUP_NOT_FOUND(groupId)
    }
    const retMovie = await groupsData.addMovieToGroup(user.id, groupId,movie)
    if (!retMovie){
       throw errors.MOVIE_ALREADY_IN_GROUP(movie.id)
    }
    return retMovie
}

//Auxiliary Functions

function isAString(value) {
    return typeof value == 'string' && value != ""
}
