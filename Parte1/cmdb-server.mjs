//falta criar getTaskAndDo usado pelo get e uptade
import express from 'express'
import * as webApi from './cmdb-web-api.mjs'
//import yaml from 'yamljs'
//import cors from 'cors'


let app = express()
const PORT = 1904

app.use(express.json())   //se o body tiver em formato json na transforma o body json num objeto request

app.get("/group",webApi.getGroups)  // obter todos os grupos
app.get("/group/:groupId",webApi.getGroup) // obter um grupo
app.delete("/group/:groupId",webApi.deleteGroup) // obter um grupo
app.post("/group",webApi.createGroup) // criar grupo
app.post("/group/:groupId/movies",webApi.addMovieToGroup) // obter um grupo
app.delete("/group/:groupId/movies/:movieId",webApi.removeMovieFromGroup) // obter um grupo
app.put("/group/:groupId",webApi.updateGroup) // editar grupo

app.listen(PORT, () => console.log(`Server listening in http://localhost:${PORT}`))
//app.listen(Port, ()=>console.log("Listening on PORT:" + Port))    //esta mal temos que alterar
