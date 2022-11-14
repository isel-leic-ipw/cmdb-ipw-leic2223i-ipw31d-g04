import express from 'express'
import webapi from './cmdb-web-api.mjs'

let app = express()
const Port = 8080

app.use(express.json())   //initiate server

app.get("/group",webapi.getGroups)
app.post("/group",webapi.createGroup)
add.get("/group/:id",webapi.getGroupsById)       //:id significa q o id é parâmetro

app.listen(Port, ()=>console.log("Listening on PORT:" + Port))    //avisa q já está a ler