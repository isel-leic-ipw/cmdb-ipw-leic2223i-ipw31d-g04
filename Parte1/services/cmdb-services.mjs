// não pode ter saber nem ter conhecimento do http,só tem a ver com a logica da aplicaçãoe, nao pode saber nada do request,response
//este modulo tem como opera~çoes/meotod neste caso exportar como o gettask
//todos recebem como parametro o taskID(que é o que vem no equest.params.id), mas supostamente eles nao podiam ter acesso a tudo que envolve http

import errors from '../errors.mjs'
import {MAX_LIMIT} from "./services-constants.mjs";


export default function (groupsData, usersData, moviesData) {
    // Validate arguments
    if (!groupsData) {
        throw errors.INVALID_PARAMETER('tasksData')
    }
    if (!usersData) {
        throw errors.INVALID_PARAMETER('usersData')
    }
    return {
        getGroups: getGroups,
        getGroupsById: getGroupsById,
        createGroup: createGroup,
        deleteGroup: deleteGroup,
        updateGroup: updateGroup,
        removeMovieFromGroup: removeMovieFromGroup,
        addMovieToGroup: addMovieToGroup,
        createUser:createUser,
        signup: signup,
        searchMovies:searchMovies,
        searchByTitle:searchByTitle,
        getMovieDetails:getMovieDetails,
        validateCredentials:validateCredentials,

    }

    async function validateCredentials(username, password) {
        try {
            const user = await usersData.getUserByName(username)

            if(user.password != password) {
                return null
            }
            return { username: user.name, token: user.token }
        } catch(e) {
            return null
        }
    }
    async function signup (userName,  userEmail, password,passwordConfirm) {
        if(password != passwordConfirm) {
            throw errors.PASSWORDS_DO_NOT_MATCH()
        }
        await createUser(userName, password, userEmail)
    }

    async function createUser(userName, password, userEmail) {
        if (!isAString(userName))
            throw errors.INVALID_PARAMETER(userName)
        if (!isAString(userEmail))
            // throw errors.INVALID_PARAMETER(userEmail)
            if (!isAString(password))
                throw errors.INVALID_PARAMETER(password)
        const user = await usersData.createNewUser(userName, password, userEmail)
    }

    async function getMovieDetails(movieId) {
        if(!isAString(movieId)){
            errors.INVALID_PARAMETER(movieId)
        }
        const movie = await moviesData.getMovieById(movieId)
        return movie
    }


    async function searchMovies(limit, title) {
        limit = Number(limit)
        if(limit === 0 ) limit = MAX_LIMIT
        if(isNaN(limit)){
            errors.INVALID_PARAMETER(limit)
        }
        if(!isAString(title)) {
            errors.INVALID_PARAMETER(title)
        }
         if (title ){
             const movies =  await moviesData.mostPopularByTitle(limit,title)
            return movies
        } else return  await moviesData.mostPopular(limit)
    }

    // useless function on the website
    async function searchByTitle(title, limit=MAX_LIMIT) {
        limit = Number(limit)
        if(!isAString(title)){
            errors.INVALID_PARAMETER(limit)
        }
        if(isNaN(limit)){
            errors.INVALID_PARAMETER(limit)
        }
        const movies = await moviesData.mostPopularByTitle(limit,title)
        return movies
    }

    async function getGroups(userToken, q, skip = 0, limit ) {//obtem os grupos todos, não precisa de parametros
        limit = Number(limit)
        skip = Number(skip)
        if(limit==0){
            limit = MAX_LIMIT
        }
        const user = await usersData.getUserByToken(userToken)

        if (!user) {
            throw errors.USER_NOT_FOUND()
        }

        if(!q && !skip && !limit){
            limit = MAX_LIMIT
            return groupsData.getGroups(user.id, q, skip, limit)
        }
        if (isNaN(limit)
            || isNaN(skip)
            || skip > MAX_LIMIT
            || limit > MAX_LIMIT
           // || (skip + limit) > MAX_LIMIT
            || skip < 0
            || limit < 0
        ) {
            throw  errors.INVALID_PARAMETER("skip or limit", `Skip and limit must be positive, less than ${MAX_LIMIT} and its sum must be less or equal to ${MAX_LIMIT}`)
        }
       // return groupsData.getGroups(user.id, q, skip, limit)     //validar se existe grupos. N é necessário pois se n há grupos, n imprime nada*/
        return groupsData.getGroups(user.id, q, skip, limit)
    }

    async function getGroupsById(userToken, groupId) {
        const user = await usersData.getUserByToken(userToken)
        if (!user) {
            throw errors.USER_NOT_FOUND()
        }
        const group = await groupsData.getGroupById(user.id, groupId)
        if (group) {
            return group
        }
        throw errors.GROUP_NOT_FOUND(groupId)
    }


    async function createGroup(userToken, groupToCreate) {
        const user = await usersData.getUserByToken
        (userToken)
        if (!user) {
            throw errors.USER_NOT_FOUND()
        }
        if (!isAString(groupToCreate.name))
            throw errors.INVALID_PARAMETER(groupToCreate.name)
        if (!isAString(groupToCreate.description))
            throw errors.INVALID_PARAMETER(groupToCreate.description)
        return groupsData.createGroup(user.id, groupToCreate)
    }

    async function deleteGroup(userToken, groupId) {
        const user = await usersData.getUserByToken(userToken)
        if (!user) {
            throw errors.USER_NOT_FOUND()
        }
        const group = await groupsData.getGroupById(user.id , groupId)
        if (!group) {
            throw errors.GROUP_NOT_FOUND(groupId)
        }
        await groupsData.deleteGroup( groupId, user.id,)
    }

    async function updateGroup(userToken, groupId, groupToUpdate) {
        const user = await usersData.getUserByToken(userToken)
        if (!user) {
            throw errors.USER_NOT_FOUND()
        }
        if (!isAString(groupToUpdate.name))
            throw errors.INVALID_PARAMETER(groupToUpdate.name)
        if (!isAString(groupToUpdate.description))
            throw errors.INVALID_PARAMETER(groupToUpdate.description)
        return groupsData.updateGroup(user.id, groupId, groupToUpdate)
    }

    async function removeMovieFromGroup(userToken, groupId, movieId) {
        const user = await usersData.getUserByToken(userToken)
        if (!user) {
            throw errors.USER_NOT_FOUND()
        }
        const group = await groupsData.getGroupById(user.id, groupId)
        if (!group) {
            throw errors.GROUP_NOT_FOUND(groupId)
        }
        const retMovie = await groupsData.removeMovieFromGroup(user.id, groupId, movieId)
        if (!retMovie) {
            throw errors.MOVIE_NOT_FOUND(movieId)
        }
        return retMovie
    }

    async function addMovieToGroup(userToken, groupId, movieId, title, duration,imgage) {
        const user = await usersData.getUserByToken(userToken)
        if (!user) {
            throw errors.USER_NOT_FOUND()
        }
        console.log("addMovieToGroup", movieId)
        const movie = {
            id: movieId,
            title: title,
            duration: duration,
            image: imgage
        }
        const group = await groupsData.getGroupById(user.id, groupId)
        if (!group) {
            throw errors.GROUP_NOT_FOUND(groupId)
        }
        const retMovie = await groupsData.addMovieToGroup(user.id, groupId, movie)
        if (!retMovie) {
            throw errors.MOVIE_ALREADY_IN_GROUP(movie.id)
        }
        return retMovie
    }

    //Auxiliary Functions
    function isAString(value) {
        return typeof value == 'string' && value != ""
    }
}

