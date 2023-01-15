//verifyauthentication é usado para verificar se ha token se nao ha dá logo resposta;
//é uma funcao intermedia
import toHttpResponse from '../response-errors.mjs'
import errors from '../../errors.mjs'
import express from "express";
//import {handle} from "express/lib/router/index.js";
//import * as groupServices from '../services/cmdb-services.mjs'
//exporta para o exterior,que tem o valor retornado pela funcao verifyAuthentication

export default function (groupServices) {
    // Validate argument
    if (!groupServices) {
        throw errors.INVALID_PARAMETER('tasksServices')
    }

    const router = express.Router()


    router.get("/api/populars",searchPopular)
    router.get("/api/populars/:title", searchByTitle)
    router.post("/api/users",handleRequest(createNewUser))  //
    router.get("/api/groups",handleRequest(getGroups))  // obter todos os grupos
    router.get("/api/groups/:groupId",handleRequest(getGroupsById)) // obter um grupo
    router.delete("/api/groups/:groupId",handleRequest(deleteGroup)) // obter um grupo
    router.post("/api/groups",handleRequest(createGroup)) // criar grupo
    router.put("/api/groups/:groupId/movies/:movieId",handleRequest(addMovieToGroup)) // obter um grupo
    router.delete("/api/groups/:groupId/movies/:movieId",handleRequest(removeMovieFromGroup)) // obter um grupo
    router.put("/api/groups/:groupId",handleRequest(updateGroup)) // editar grupo

    return router

    async function searchPopular(req, rps) {
        console.log(req.query.limit)
        return await groupServices.searchPopular(req.query.limit)
    }
    async function searchByTitle(req, rps) {
        const title = req.path.title
        const limit = req.query.limit
        return await groupServices.searchMovies(limit,title)
    }

    async function getGroups(req, rsp) {
        return await groupServices.getGroups(req.user.token, req.query.q, req.query.skip, req.query.limit)
    }

    async function getGroupsById(req, rsp) {
        const groupId = req.params.groupId
        return groupServices.getGroupsById(req.user.token, groupId)
    }

    async function createGroup(req, rsp) {
        let newGroup = await groupServices.createGroup(req.user.token, req.body)
        rsp.status(201)
        return {
            status: `Task with id ${newGroup.id} created with success`,
            newGroup: newGroup
        }
    }

    async function deleteGroup(req, rsp) {
        const groupId = req.params.groupId
        const group = await groupServices.deleteGroup(req.user.token, groupId)
        rsp.status(200)
        return {
            status: `Task with id ${groupId} deleted with success`,
            group: group
        }
    }

    async function updateGroup(req, rsp) {
        const groupId = req.params.groupId
        const group = await groupServices.updateGroup(req.user.token, groupId, req.body)
        rsp.status(200)
        return {
            status: `Task with id ${groupId}updated with success`,
            group: group
        }
    }
    async function addMovieToGroup(req, rsp) {
        const groupId = req.params.groupId
        const movieId = req.body.id
        const movieTitle = req.body.title
        const movieDuration = req.body.runtimeMins
        const movieImage = req.body.image
        const movie = await groupServices.addMovieToGroup(req.user.token, groupId, movieId, movieTitle, movieDuration,movieImage)
        rsp.status(200)
        return {
            status: `Movie with ${movieId} added to group ${groupId}`,
            movie: movie
        }
    }

    async function removeMovieFromGroup(req, rsp) {
        const groupId = req.params.groupId
        const movieId = req.params.movieId
        const movie = await groupServices.removeMovieFromGroup(req.user.token, groupId, movieId)
        rsp.status(200)
        return {
            status: `Movie with ${movieId} removed from group ${groupId}`,
            movie: movie
        }
    }

    async function createNewUser(req, rps) {
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


