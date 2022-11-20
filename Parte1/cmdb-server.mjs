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
app.get("/group/:id",webapi.getGroupById)  
app.put("/group/:id",webapi.editGroup)     

app.listen(Port, ()=>console.log("Listening on PORT:" + Port))    //esta mal temos que alterar
