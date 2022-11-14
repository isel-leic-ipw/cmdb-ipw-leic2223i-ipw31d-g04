
import services from './cmdb-services.mjs'

function getGroups(req,response){
    console.log(req.query)
    response.json(services.getGroups())
}

function createGroup(req,response){
    console.log(req.body)
    services.createGroup(req.body.name,req.body.desc)
            .then(g=> response.json(g))
}

function getGroupById(req, response){

}

//editGroup --> PUT

//deleteGroup --> DELETE



export const webapi = {
    getGroups,
    createGroup,
    getGroupById,
}


export default webapi