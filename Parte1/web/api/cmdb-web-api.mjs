//verifyauthentication é usado para verificar se ha token se nao ha dá logo resposta;
//é uma funcao intermedia
import toHttpResponse from './response-errors.mjs'
import errors from '../../errors.mjs'
//import {handle} from "express/lib/router/index.js";
//import * as groupServices from '../services/cmdb-services.mjs'
//exporta para o exterior,que tem o valor retornado pela funcao verifyAuthentication

export default function (groupServices) {
    // Validate argument
    if (!groupServices) {
        throw errors.INVALID_PARAMETER('tasksServices')
    }
    return {
        getGroups: handleRequest(getGroupsInternal),
        getGroupsById:  handleRequest(getGroupsByIdInternal),
        createGroup: handleRequest(createGroupInternal),
        deleteGroup: handleRequest(deleteGroupInternal),
        updateGroup: handleRequest(updateGroupInternal),
        addMovieToGroup: handleRequest(addMovieToGroupInternal),
        removeMovieFromGroup: handleRequest(removeMovieFromGroupInternal),
        createNewUser: handleRequest(createNewUserInternal),
        searchPopular: handleRequest(searchPopularInternal),
        searchByTitle: handleRequest(searchByTitleInternal)
    }

    async function searchPopularInternal(req, rps) {
        console.log(req.query.limit)
        return await groupServices.searchPopular(req.query.limit)
    }
    async function searchByTitleInternal(req, rps) {
        const title = req.path.title
        const limit = req.query.limit
        return await groupServices.searchByTitle(title,limit)
    }

    async function getGroupsInternal(req, rsp) {
        return await groupServices.getGroups(req.token, req.query.q, req.query.skip, req.query.limit)
    }

    async function getGroupsByIdInternal(req, rsp) {
        const groupId = req.params.groupId
        return groupServices.getGroupsById(req.token, groupId)
    }

    async function createGroupInternal(req, rsp) {
        let newGroup = await groupServices.createGroup(req.token, req.body)
        rsp.status(201)
        return {
            status: `Task with id ${newGroup.id} created with success`,
            newGroup: newGroup
        }
    }

    async function deleteGroupInternal(req, rsp) {
        const groupId = req.params.groupId
        const group = await groupServices.deleteGroup(req.token, groupId)
        rsp.status(200)
        return {
            status: `Task with id ${groupId} deleted with success`,
            group: group
        }
    }

    async function updateGroupInternal(req, rsp) {
        const groupId = req.params.groupId
        const group = await groupServices.updateGroup(req.token, groupId, req.body)
        rsp.status(200)
        return {
            status: `Task with id ${groupId}updated with success`,
            group: group
        }
    }

    async function addMovieToGroupInternal(req, rsp) {
        const groupId = req.params.groupId
        const movieId = req.body.id
        const movieTitle = req.body.title
        const movieDuration = req.body.runtimeMins
        const movie = await groupServices.addMovieToGroup(req.token, groupId, movieId, movieTitle, movieDuration)
        rsp.status(200)
        return {
            status: `Movie with ${movieId} added to group ${groupId}`,
            movie: movie
        }
    }

    async function removeMovieFromGroupInternal(req, rsp) {
        const groupId = req.params.groupId
        const movieId = req.params.movieId
        const movie = await groupServices.removeMovieFromGroup(req.token, groupId, movieId)
        rsp.status(200)
        return {
            status: `Movie with ${movieId} removed from group ${groupId}`,
            movie: movie
        }
    }

    async function createNewUserInternal(req, rps) {
        const userName = req.body.userName
        const userEmail = req.body.userEmail
        const userPassword = req.body.userPassword
        const user = await groupServices.createUser(userName,userEmail,userPassword)
        rps.status (201)
        return{
            token: user.token
        }
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
                rsp.status(response.status).json({error: response.body})
            }
        }
    }
}
