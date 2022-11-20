//webapi corresponde ao http -api
//put e get, implementações parecidas
import * as groupServices from './cmdb-services.mjs'

 export async function getGroups(req,rsp){
    const groups = await groupServices.getGroups()
    rsp.json(groups)
}

export async function getGroup(req,rsp){
  await getGroupAndAct(req.params.groupId, rsp, group => rsp.json(group).status(200))
}

export async function createGroup(req,rsp){
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

export async function deleteGroup(req, rsp) {
    const groupId = req.params.groupId
    const deleted = await groupServices.deletedGroup(groupId)
    if(deleted) {
        rsp.status(200).json({status: `group with id ${groupId} deleted with success`})
    } else {
        rsp.status(404).json({error: `group with id ${groupId} not found`})
    }
}

export async function updateGroup(req,rsp){
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
    const group = await groupServices.getGroup(groupId)
    if(group != undefined) {
        action(group)
    } else {
        rsp.status(404).json({error: `group with id ${groupId} not found`})
    }
}

export function addMovieToGroup (req,rsp){

}

export function  removeMovieFromGroup(req,rsp){

}