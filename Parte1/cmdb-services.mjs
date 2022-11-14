
import data from './cmdb-data-mem.mjs'

function getGroups(){
    return data.getGroups()     //validar se existe grupos. N é necessário pois se n há grupos, n imprime nada
}

function createGroup(name, desc){
    //é necessário validar o nome
    return data.createGroup(name, desc)
}

function getGroupById(id){

}

//editGroup

//deleteGroup

export const services = {
    getGroups,
    createGroup,
    getGroupById,
}

export default services