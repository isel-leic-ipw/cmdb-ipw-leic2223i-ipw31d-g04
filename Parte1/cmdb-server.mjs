//falta criar getTaskAndDo usado pelo get e uptade
import express from 'express'
import webapi from './cmdb-web-api.mjs'
import yaml from 'yamljs'
import cors from 'cors'


let app = express()
const Port = 8080

app.use(express.json())   //se o body tiver em formato json na transforma o body json num objeto request

app.get("/group",webapi.getGroups) 
app.post("/group",webapi.createGroup)
add.get("/group/:id",webapi.getGroupsById)       //:id significa q o id é parâmetro, supostamente nao e add,é app, se for add preciso de saber o que é

app.listen(Port, ()=>console.log("Listening on PORT:" + Port))    //avisa q já está a ler// nao sabia fazer
