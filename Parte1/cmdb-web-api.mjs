//webapi corresponde ao http -api
//put e get, implementações parecidas
import services from './cmdb-services.mjs'

 export async function getGroups(req,response){
    console.log(req.query)
   return response.json( services.getGroups())
}

export async function createGroup(req,rsp){
    console.log(req.body)
   let g= await services.createGroup(req.body.name,req.body.desc)
         rsp.status(201).json(g)  
}

export async function getGroupById(req, rsp){
   let a= await services.getGroupById(req.body.name,req.body.desc)
    rsp.status(200).json(a)
}

async function deletedGroup(req, rsp) {
    const id = req.params.id
    const deleted = await tasksServices.deleteTask(id)
    if(deleted) {
        rsp.status(200).json({status: `group with id ${id} deleted with success`})
    } else {
        rsp.status(404).json({error: `group with id ${id} not found`})
    }
}

async function editGroup(req,rsp){
    getTaskAndAct(req.params.id, rsp, update)

    function update(group) {
        rsp.status(201)
        rsp.json({
            status: `group with id ${id} updated with success`,
            newgroup: group
            })
    }
}
//editGroup --> PUT

//deleteGroup --> DELETE



export const webapi = {
    getGroups,
    createGroup,
    getGroupById,
    editGroup,
    deletedGroup
}


export default webapi//nao entendi o que é isto

async function getTaskAndAct(id, rsp, action) {
    const group = await services.getTask(id)
    if(group != undefined) {
        action(group)
    } else {
        rsp.status(404).json({error: `group with id ${id} not found`})
    }
}
