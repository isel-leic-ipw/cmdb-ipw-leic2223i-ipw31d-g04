
import url from 'url'
import toHttpResponse from "../response-errors.mjs";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export default function (services) {
    // Validate argument
    if (!services) {
        throw errors.INVALID_PARAMETER('tasksServices')
    }
    return {
        getHome: getHome,
        getCss: getCss,
        getMovieDetails:getMovieDetails, // not handler
        searchMovies:searchMovies,// not handler
        getGroup: handleRequest(getGroup),
        getGroups: handleRequest(getGroups),
        createGroup: handleRequest(createGroup),
        updateGroup: handleRequest(updateGroup),
        deleteGroup: handleRequest(deleteGroup),
        removeMovieFromGroup:handleRequest(removeMovieFromGroup),
        addMovieToGroupView:handleRequest(addMovieToGroupView),
        addMovieToGroup:handleRequest(addMovieToGroup),
        getNewGroup: handleRequest(getNewGroup), // handler
        getUptadeGroup:handleRequest(getUptadeGroup), // handler
    }

    async function getHome (req, rsp) {
        rsp.render("home", {title: "Home Page",  user:req.user})
    }

    async  function  getCss (req, rsp) {
        sendFile('site.css', rsp)
    }

    async function getMovieDetails(req, rps){
        const movieId = req.params.movieId
        const movie = await services.getMovieDetails(movieId)
        rps.render("movie", {title: 'Movie Details', movie: movie, user:req.user})
    }

    async function searchMovies(req, rps) {
        const movies = await services.searchMovies(req.query.limit,req.query.title)
        rps.render('movies', {title: 'Movies', movies:movies, user:req.user} )
    }

    async  function  getGroup (req, rsp) {
        const groupId = req.params.groupId
        const group = await services.getGroupsById(req.user.token, groupId)
        return {name: 'group', data :{ group: group, user:req.user}}
    }

    async function getGroups(req, rsp) {
        const groups =  await services.getGroups(req.user.token, req.query.q, req.query.skip, req.query.limit)
        return {name: 'groups', data : {title: 'Groups', groups:groups, user:req.user}}
    }

    async function getNewGroup (req,rsp){
        return {name: 'newGroup', data : { user: req.user}}
    }

    async function getUptadeGroup (req,rsp){
        const group = await services.getGroupsById(req.user.token,req.params.groupId)
        return  {name: "uptadeGroup", data : {group:group, user:req.user} }
    }

    async function createGroup(req, rsp) {
        let newGroup = await services.createGroup(req.user.token, req.body)
        rsp.redirect('/groups')
    }
    async function deleteGroup(req, rsp) {
        const groupId = req.params.groupId
        const group = await services.deleteGroup(req.user.token, groupId)
        rsp.redirect('/groups')
    }
    async function updateGroup(req, rsp) {
        const groupId = req.params.groupId
        const group = await services.updateGroup(req.user.token, groupId, req.body)
        rsp.redirect(`/groups/${groupId}`)
    }

    async function addMovieToGroupView(req, rsp){
        const movieId = req.params.movieId
        console.log("movieId",movieId)
        let groups =  await services.getGroups(req.user.token, req.query.q, req.query.skip, req.query.limit)
        groups = {
            groups:groups,
            movieId:movieId
        }
        return {name: 'addMovie', data :{groups:groups, user:req.user}}
    }

    async function addMovieToGroup(req, rsp) {
        const groupId = req.params.groupId
        const movieId = req.params.movieId
        console.log("site" , movieId)
        const movie = await services.getMovieDetails(movieId)
        const addMovie = await services.addMovieToGroup(req.user.token, groupId, movieId, movie.title, movie.runtimeMins,movie.image)
        rsp.redirect(`/groups/${groupId}`)
    }


    async function removeMovieFromGroup(req, rsp) {
        const groupId = req.params.groupId
        const movieId = req.params.movieId
        const movie = await services.removeMovieFromGroup(req.user.token, groupId, movieId)
        rsp.redirect(`/groups/${groupId}`)
    }


    function handleRequest(handler) {
        return async function (req, rsp) {
            try {
                let view = await handler(req, rsp)
                if(view) {
                    rsp.render(view.name, view.data)
                }
            } catch (e) {
                const response =  toHttpResponse(e)
                rsp.status(response.status).json({error: response.body})
            }
        }
    }

    function sendFile(fileName, rps){
        const fileLocation = __dirname + 'public/' + fileName
        rps.sendFile(fileLocation)
    }
}
