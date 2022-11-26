//verifyauthentication é usado para verificar se ha token se nao ha dá logo resposta;
//é uma funcao intermedia
import toHttpResponse from './response-errors.mjs'
import * as groupServices from '../services/cmdb-services.mjs'
//exporta para o exterior,que tem o valor retornado pela funcao verifyAuthentication
export const getGroups = handleRequest(getGroupsInternal)
export const getGroupsById = handleRequest(getGroupsByIdInternal)
export const deleteGroup = handleRequest(deleteGroupInternal)
export const updateGroup = handleRequest(updateGroupInternal)
export const createGroup = handleRequest(createGroupInternal)
export const addMovieToGroup = handleRequest(addMovieToGroupInternal)
export const removeMovieFromGroup = handleRequest(removeMovieFromGroupInternal)


export async function getGroupsInternal(req, rsp) {
    return await groupServices.getGroups(req.token, req.query.q, req.query.skip, req.query.limit)
}

export async function getGroupsByIdInternal(req, rsp) {
    const groupId = req.params.groupId
    return groupServices.getGroupsById(req.token, groupId)
}

export async function createGroupInternal(req, rsp) {
    let newGroup = await groupServices.createGroup(req.token, req.body)
    rsp.status(201)
    return {
        status: `Task with id ${newGroup.id} created with success`,
        newGroup: newGroup
    }
}

export async function deleteGroupInternal(req, rsp) {
    const groupId = req.params.groupId
    const group = await groupServices.deleteGroup(req.token, groupId)
    rsp.status(200)
    return {
        status: `Task with id ${groupId} deleted with success`,
        group: group
    }
}

export async function updateGroupInternal(req, rsp) {
    const groupId = req.params.groupId
    const group = await groupServices.updateGroup(req.token,groupId,req.body)
    rsp.status(201)
    return {
        status: `Task with id ${groupId}updated with success`,
        group: group
    }
}

export async function addMovieToGroupInternal(req, rsp) {
    const groupId = req.params.groupId
    const movieId = req.body.id
    const movie =  await  groupServices.addMovieToGroup(req.token,groupId,movieId)
    rsp.status(201)
    return {
        status: `Movie with ${movieId} added to group ${groupId}`,
        movie : movie
    }
}

export async function removeMovieFromGroupInternal(req, rsp) {
    const groupId = req.params.groupId
    const movieId = req.body.id
    const movie =  await groupServices.removeMovieFromGroup(req.token,groupId,movieId)
    rsp.status(201)
    return {
        status: `Movie with ${movieId} removed from group ${groupId}`,
        movie : movie
    }
}
export  async function createNewUser (req, rps){

}


function handleRequest(handler) {
    return async function (req, rsp) {
        const BEARER_STR = "Bearer "
        const tokenHeader = req.get("Authorization")
        if (!(tokenHeader && tokenHeader.startsWith(BEARER_STR) && tokenHeader.length > BEARER_STR.length)) {
            rsp
                .status(401)
                .json({error: `Invalid authentication token`})
            return
        }
        req.token = tokenHeader.split(" ")[1]
        try {
            let body = await handler(req, rsp)
            rsp.json(body)
        } catch (e) {
            const response = toHttpResponse(e)
            rsp.status(response.status).json({error:response.body})
            console.log(e)
        }
    }
}

