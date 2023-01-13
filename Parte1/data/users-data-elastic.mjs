
import { get, post, del, put } from './fetch-wrapper.mjs'

import uriManager from './uri-manager.mjs'
import crypto from "crypto";

const URI_MANAGER = uriManager()


export async function getUser(userToken) {
    const query = {
        query: {
            match: {
                token: userToken,
            },
        },
    }
    const rsp = post(URI_MANAGER.getAll('users'), query)
        .then((body) => body.hits.hits.map(createUserFromElastic))
        .then(users => users[0])

    return rsp
}

export async function getUserByName(userName) {
    const query = {
        query: {
            match: {
                name: userName,
            },
        },
    }
    const rsp = post(URI_MANAGER.getAll('users'), query)
        .then((body) => body.hits.hits.map(createUserFromElastic))
        .then(users => users[0])

    return rsp
}

export async function createNewUser(userName, password){
    let newUser = {
        name:userName,
        password:password,
        token: crypto.randomUUID()
    }
    return post(URI_MANAGER.create('users'), newUser)
}

function createUserFromElastic(UserElastic) {
    const userName = UserElastic._source.name
   // const password = UserElastic._source.password
    const userToken =  UserElastic._source.token
    const userId = UserElastic._source.id
    return {
        id: userId,
        name: userName,
       // password:password,
        userToken: userToken,
    }
}

