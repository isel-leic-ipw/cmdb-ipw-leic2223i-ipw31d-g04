
import { get, post, del, put } from './fetch-wrapper.mjs'
import uriManager from './uri-manager.mjs'
const URI_MANAGER = uriManager()


export async function getGroups(userId, q, skip, limit) {
    const query = {
        query: {
            match: {
                userId: userId,
            },
        },
    }
    return post(URI_MANAGER.getAll('groups'), query).then((body) => body.hits.hits.map(createGroupFromElastic)).then(filterGroups)

    function filterGroups (groups){
        if (q) q = q.toUpperCase()
        const predicate = q ? g => g.name.toUpperCase().includes(q) : g => true
        const retGroups = groups
            .filter(g => g.userId == userId)
            .filter(predicate)
        const end = limit != Infinity ? (skip + limit) : retGroups.length
        return retGroups.slice(skip,end)
    }
}

export async function getGroupById(userId, id) {
    const group = get(URI_MANAGER.get('groups', id))
        .then(createGroupFromElastic)
    return group
}


export async function createGroup(userId, groupToCreate) {
    const newGroup = {
        name: groupToCreate.name,
        description:groupToCreate.description,
        movies:[],
        totalDuration:0,
        userId: userId
    }
    return post(URI_MANAGER.create('groups'), newGroup)
}

export async function newGroupUpdated(userId, groupId, group) {
    const newGroup = Object.assign(group)
    return put(URI_MANAGER.update('groups', groupId), newGroup)
}

export async function deleteGroup(id) {
    return del(URI_MANAGER.delete('groups', id)).then((body) => body.id)
}

export function createGroupFromElastic(GroupElastic) {
    let group = GroupElastic._source
    group.id = GroupElastic._id
    return group
}

export async function addMovieToGroup (userId, groupId, movie) {
    const newMovie= Object.assign(movie)
    const group = await getGroupById(userId, groupId)

    const movieIdx = group.movies.findIndex(m => m.id == movie.id)
    if (movieIdx != -1) {
        return
    }

    if (group.id == groupId) {
        group.movies.push(newMovie)
    }
    const newDuration = group.totalDuration + parseInt(movie.duration)
    const newGroup = {
        name: group.name,
        description: group.description,
        movies: group.movies,
        totalDuration: newDuration,
        userId: group.userId,
    }
    return await newGroupUpdated(userId, groupId, newGroup)
}

export async function updateGroup(userId, groupId, groupToUpdate) {

    const group = await getGroupById(userId, groupId)

    const newGroup = {
        name: groupToUpdate.name,
        description: groupToUpdate.description,
        movies: group.movies,
        totalDuration: group.totalDuration,
        userId: group.userId
    }
    return await newGroupUpdated(userId, groupId, newGroup)
}

export async function removeMovieFromGroup(userId, groupId, movieId) {
    const group = await getGroupById(userId, groupId)
    console.log('groupDELETE', group)

    if (group.id == groupId) {
        const movieIdx = group.movies.findIndex(movie => movie.id == movieId)

        if (movieIdx != -1) {
            console.log(group.movies[movieIdx])
            group.totalDuration = group.totalDuration - group.movies[movieIdx].duration
            group.movies.splice(movieIdx, 1)
        }
    }
    const newGroup = group

    return await newGroupUpdated(userId, groupId, newGroup)
}