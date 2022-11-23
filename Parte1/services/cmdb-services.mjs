// não pode ter saber nem ter conhecimento do http,só tem a ver com a logica da aplicaçãoe, nao pode saber nada do request,response
//este modulo tem como opera~çoes/meotod neste caso exportar como o gettask
//todos recebem como parametro o taskID(que é o que vem no equest.params.id), mas supostamente eles nao podiam ter acesso a tudo que envolve http
//new coments
//o invalidargument foi usado para quando o erro for para a web api ser em objeto,e nao string para o catch nao ter que fazer passing a string 
import * as groupsData from '../data/cmdb-data-mem.mjs'
import * as usersData from './users-data.mjs'
import errors from '../errors.mjs'


export async function  getGroups(userToken){// falta muita coisa neste
    return  groupsData.getGroups(userToken)   

export async function getGroupsById(groupId,userToken){// alterar para em vez de token ser user ID
    const user = await usersData.getUser(userToken)
    if(!user) {
        throw errors.USER_NOT_FOUND()
    }
    const group = await tasksData.getGroupsById(user.id, groupId)
    if(group) {
        return group
    }

    throw errors.TASK_NOT_FOUND(groupId)

}
export async function createGroup(groupToCreate,userToken){
    const user = await usersData.getUser(userToken)
    if(!user) {
        throw errors.USER_NOT_FOUND()
    }
    if(!isAString(userToken, groupToCreate.name)) {
         throw errors.INVALID_PARAMETER('name')
    }
    if(!isAString(userToken, groupToCreate.description)) {
        throw errors.INVALID_PARAMETER('description')
   }


    return tasksData.createTask(user.id, groupToCreate)
}

export async function deletedGroup(id){
    return groupsData.deleteGroup(id)
}
}

export async function updateGroup(groupId, groupToUpdate,userToken){
    if(NaN(user))
    throw errors.USER_NOT_FOUND(user.Id)
    
    if(!isAString(groupToUpdate.name))
    throw errors.INVALID_ARGUMENT(groupToUpdate.name)
    if(!isAString(groupToUpdate.description))
    throw errors.INVALID_ARGUMENT(groupToUpdate.description)   
    return groupsData.uptadeGroup(groupId,groupToUpdate)
}

//Auxiliary Functions

function isAString(value) {
    return typeof value == 'string' && value != ""
}

function NaN(value) {
    return typeof value != Number && value != "" 

}

