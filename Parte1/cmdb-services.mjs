// não pode ter saber nem ter conhecimento do http,só tem a ver com a logica da aplicaçãoe, nao pode saber nada do request,response
//este modulo tem como opera~çoes/meotod neste caso exportar como o gettask
//todos recebem como parametro o taskID(que é o que vem no equest.params.id), mas supostamente eles nao podiam ter acesso a tudo que envolve http
import data from './cmdb-data-mem.mjs'

async function  getGroups(){//obtem os grupos todos, não precisa de parametros
    return  data.getGroups()     //validar se existe grupos. N é necessário pois se n há grupos, n imprime nada
}

async function createGroup(name, desc){
    //é necessário validar o nome
    return data.createGroup(name, desc)
}
async function getGroupById(id){
    return data.getGroupById(id)

}

async function editGroup(groupToEdit){
    if(!isAString(groupToEdit.title))
    throw "Invalid Argument"
    if(!isAString(groupToEdit.descrition))
    throw "Invalid Argument"
    
    return data.editGroup(groupToEdit)


}

async function deletedGroup(id){
    return data.deletedGroup(id)
}


//editGroup

//deleteGroup

export const services = {
    getGroups,
    createGroup,
    getGroupById,
    editGroup,
    deletedGroup
    
}

export default services

function isAString(value) {
    return typeof value == 'string' && value != ""

}
