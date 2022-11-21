//verifyauthentication é usado para verificar se ha token se nao ha dá logo resposta;
//é uma funcao intermedia
import * as groupServices from '../services/cmdb-services.mjs'
//exporta para o exterior,que tem o valor retornado pela funcao verifyAuthentication
export const getGroups = verifyAuthentication(getGroupsInternal)
export const getGroupsById = verifyAuthentication(getGroupsByIdInternal)
export const deleteGroup = verifyAuthentication(deleteGroupInternal)
export const updateGroup = verifyAuthentication(updateGroupInternal)
export const createGroup= verifyAuthentication(createGroupInternal)

 export async function getGroupsInternal(req,rsp){
    const groups = await groupServices.getGroups()
    rsp.json(groups)
}

export async function getGroupsByIdInternal(req,rsp){
  await getGroupAndAct(req.params.groupId, rsp, group => rsp.json(group).status(200))
}

export async function createGroupInternal(req,rsp){
    try {
        let newGroup = await groupServices.createGroup(req.body)
        rsp
            .status(201)
            .json({
                status: `Task with id ${newGroup.id} created with success`,
                newGroup: newGroup
            })

    } catch(e) {
        rsp
            .status(400)
            .json({error: `Error creating task: ${e}`})
    }
}

export async function deleteGroupInternal(req, rsp) {
    const groupId = req.params.groupId
    const deleted = await groupServices.deletedGroup(groupId)
    if(deleted) {
        rsp.status(200).json({status: `group with id ${groupId} deleted with success`})
    } else {
        rsp.status(404).json({error: `group with id ${groupId} not found`})
    }
    
}

export async function updateGroupInternal(req,rsp){
    await getGroupAndAct(req.params.groupId, rsp, update)

    async function update(group) {
        await groupServices.updateGroup(req.params.groupId,req.body)
        rsp.status(201)
        rsp.json({
            status: `group with id ${group.id} updated with success`,
            newgroup: group
            })
    }
}


async function getGroupAndAct(groupId, rsp, action) {
    const group = await groupServices.getGroupsById(groupId)
    if(group != undefined) {
        action(group)
    } else {
        rsp.status(404).json({error: `group with id ${groupId} not found`})
    }
}
function verifyAuthentication(handlerFunction) {
    return function(req, rsp) {
        let userToken = req.get("Authorization")
        userToken = userToken ? userToken.split(" ")[1] : null// se userToken entao vai fazer else,:(else) null
        if(!userToken) {
            return rsp
                    .status(401)
                    .json({error: `User token must be provided`})
            
        }
        req.token = userToken 
        handlerFunction(req, rsp)
    
    }
    
}

export function addMovieToGroup (req,rsp){

}

export function  removeMovieFromGroup(req,rsp){

}
