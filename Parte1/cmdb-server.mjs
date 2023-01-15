//falta criar getTaskAndDo usado pelo get e uptade
import express from 'express'

import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import yaml from 'yamljs'
import hbs from 'hbs'
import url from "url";
import * as path from "path";
import cookieParser from 'cookie-parser'


import * as groupsDataMem from './data/memory/imdb-data-mem.mjs'
import * as usersDataMem from './data/memory/users-data-mem.mjs'

import * as groupDataElastic from './data/elastic/imdb-data-elastic.mjs'
import * as usersDataElastic from './data/elastic/users-data-elastic.mjs'
import * as moviesData from './data/cmdb-movies-data.mjs'
import groupsServicesInit from './services/cmdb-services.mjs'
import apiInit from './web/api/cmdb-web-api.mjs'
import siteGroupsInit from './web/site/cmdb-web-groups-site.mjs'
import siteUsersInit from './web/site/cmdb-web-users-site.mjs'

const elasticGroup = true // if true data mem else data elastic
const elasticUsers = true
const groupsData = elasticGroup ? groupDataElastic : groupsDataMem
const usersData = elasticUsers ? usersDataElastic : usersDataMem

const swaggerDocument = yaml.load('./docs/tasks-api.yaml')
const PORT = 1904

const services = groupsServicesInit (groupsData,usersData,moviesData)
const webApi = apiInit (services)
const webSiteGroups = siteGroupsInit(services)
const webSiteUsers = siteUsersInit(services)


let app = express()
app.use(cors())


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.json())   //se o body tiver em formato json na transforma o body json num objeto request
app.use(express.urlencoded())
app.use(cookieParser())


// view engine setup
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const viewsPath = `${__dirname}/web/site/views`
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(`${viewsPath}/partials`)


function getHome(req, rsp) {
    rsp.redirect('/home')
}

app.get('/', getHome)

//SITE
app.use(webSiteUsers)
app.use(webSiteGroups)
// API
app.use(webApi)

app.listen(PORT, () => console.log(`Server listening in http://localhost:${PORT}`))
//app.listen(Port, ()=>console.log("Listening on PORT:" + Port))    //esta mal temos que alterar

// view engine setup
//const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
//app.set('view engine', 'hbs');
//app.set('views', path.join(__dirname, 'web', 'site', 'views'));
//hbs.registerPartials(__dirname + '/public/partials');