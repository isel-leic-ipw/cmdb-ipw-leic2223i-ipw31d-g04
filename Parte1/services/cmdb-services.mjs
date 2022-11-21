// não pode ter saber nem ter conhecimento do http,só tem a ver com a logica da aplicaçãoe, nao pode saber nada do request,response
//este modulo tem como opera~çoes/meotod neste caso exportar como o gettask
//todos recebem como parametro o taskID(que é o que vem no equest.params.id), mas supostamente eles nao podiam ter acesso a tudo que envolve http
import * as groupsData from '../data/cmdb-data-mem.mjs'
import errors from '../errors.mjs'

export async function  getGroups(){//obtem os grupos todos, não precisa de parametros
    return  groupsData.getGroups()     //validar se existe grupos. N é necessário pois se n há grupos, n imprime nada
}

export async function getGroupsById(groupId){
    return groupsData.getGroupById(groupId)

}
export async function createGroup(groupToCreate){
    //é necessário validar o nome
    return groupsData.createGroup(groupToCreate)
}

export async function deletedGroup(id){
    return groupsData.deleteGroup(id)
}

export async function updateGroup(groupId, groupToUpdate){
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
