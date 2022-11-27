//falta criar getTaskAndDo usado pelo get e uptade
import express from 'express'
import * as webApi from './api/cmdb-web-api.mjs'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import yaml from 'yamljs'




let app = express()
const PORT = 1904
app.use(cors())
app.use(express.json())

const swaggerDocument = yaml.load('./docs/tasks-api.yaml')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(express.json())   //se o body tiver em formato json na transforma o body json num objeto request

//app.post("/users",webApi.createNewUser)  // obter todos os grupos
app.get("/groups",webApi.getGroups)  // obter todos os grupos
app.get("/groups/:groupId",webApi.getGroupsById) // obter um grupo
app.delete("/groups/:groupId",webApi.deleteGroup) // obter um grupo
app.post("/groups",webApi.createGroup) // criar grupo
app.put("/groups/:groupId/movies/:movieId",webApi.addMovieToGroup) // obter um grupo
app.delete("/groups/:groupId/movies/:movieId",webApi.removeMovieFromGroup) // obter um grupo
app.put("/groups/:groupId",webApi.updateGroup) // editar grupo

app.listen(PORT, () => console.log(`Server listening in http://localhost:${PORT}`))
//app.listen(Port, ()=>console.log("Listening on PORT:" + Port))    //esta mal temos que alterar
