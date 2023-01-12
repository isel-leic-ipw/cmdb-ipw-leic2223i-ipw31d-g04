//falta criar getTaskAndDo usado pelo get e uptade
import express from 'express'

import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import yaml from 'yamljs'
import hbs from 'hbs'
import url from "url";
import * as path from "path";
import cookieParser from 'cookie-parser'

import * as groupDataMem from './data/imdb-data-mem.mjs'
import * as usersData from './data/users-data.mjs'

import * as groupDataElastic from './data/imdb-data-elastic.mjs'
import * as moviesData from './data/cmdb-movies-data.mjs'
import groupsServicesInit from './services/cmdb-services.mjs'
import apiInit from './web/api/cmdb-web-api.mjs'
import siteInit from './web/site/cmdb-web-site.mjs'

const chooseData = false // if true data mem else data elastic
const groupData = chooseData ? groupDataMem : groupDataElastic

const swaggerDocument = yaml.load('./docs/tasks-api.yaml')
const PORT = 1904

const groupsServices = groupsServicesInit (groupData,usersData,moviesData)
const webApi = apiInit (groupsServices)
const webSite = siteInit(groupsServices)

let app = express()
app.use(cors())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.json())   //se o body tiver em formato json na transforma o body json num objeto request
app.use(express.urlencoded())
app.use(cookieParser())

// view engine setup
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'web', 'site', 'views'));
//hbs.registerPartials(__dirname + '/public/partials');

//SITE
app.get('/home', webSite.getHome)
app.get("/populars",webSite.searchMovies)
app.post('/groups/:groupId/delete',webSite.deleteGroup)
app.post('/groups/:groupId',webSite.updateGroup)
app.get('/groups/newGroup',webSite.getNewGroup)
app.get('/movies/:movieId',webSite.getMovieDetails)
app.get('/groups/:groupId/uptadeGroup',webSite.getUptadeGroup)
app.get('/groups/:groupId', webSite.getGroup)
app.get('/groups',webSite.getGroups)
app.post('/groups', webSite.createGroup)
app.get('/site.css', webSite.getCss)
app.get("/groups/movies/:movieId",webSite.addMovieToGroupView)
app.post("/groups/:groupId/movies/:movieId/put",webSite.addMovieToGroup)
app.post("/groups/:groupId/movies/:movieId/delete",webSite.removeMovieFromGroup)


// API
app.get("/api/populars",webApi.searchPopular)
app.get("/api/populars/:title", webApi.searchByTitle)
app.post("/api/users",webApi.createNewUser)  //
app.get("/api/groups",webApi.getGroups)  // obter todos os grupos
app.get("/api/groups/:groupId",webApi.getGroupsById) // obter um grupo
app.delete("/api/groups/:groupId",webApi.deleteGroup) // obter um grupo
app.post("/api/groups",webApi.createGroup) // criar grupo
app.put("/api/groups/:groupId/movies/:movieId",webApi.addMovieToGroup) // obter um grupo
app.delete("/api/groups/:groupId/movies/:movieId",webApi.removeMovieFromGroup) // obter um grupo
app.put("/api/groups/:groupId",webApi.updateGroup) // editar grupo

app.listen(PORT, () => console.log(`Server listening in http://localhost:${PORT}`))
//app.listen(Port, ()=>console.log("Listening on PORT:" + Port))    //esta mal temos que alterar
