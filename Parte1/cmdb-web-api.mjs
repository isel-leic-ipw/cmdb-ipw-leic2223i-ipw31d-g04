
//webapi corresponde ao http -api
//put e get, implementações parecidas
import services from './cmdb-services.mjs'

 export async function getGroups(req,response){
    console.log(req.query)
   return response.json( services.getGroups())// nao é recursivo apenas vai buscar ao services
}

export async function createGroup(req,response){// esta funcao é toda marada man
    console.log(req.body)
   await services.createGroup(req.body.name,req.body.desc)
            .then(g=> response.json(g))// ver o que then faz, ja nao me lembro
}

export async function getGroupById(req, response){

}

//editGroup --> PUT

//deleteGroup --> DELETE



export const webapi = {
    getGroups,
    createGroup,
    getGroupById,
}


export default webapi//nao entendi o que é isto
