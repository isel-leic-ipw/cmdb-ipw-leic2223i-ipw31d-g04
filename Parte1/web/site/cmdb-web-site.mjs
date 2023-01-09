
import url from 'url'
import toHttpResponse from "../api/response-errors.mjs";

const HAMMER_TOKEN = 'ef604e80-a351-4d13-b78f-c888f3e63b60'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export default function (groupServices) {
    // Validate argument
    if (!groupServices) {
        throw errors.INVALID_PARAMETER('tasksServices')
    }
    return {
        getHome: getHome,
        getCss: getCss,
        getGroup: handleRequest(getGroup),
        getGroups: handleRequest(getGroups),
        createGroup: handleRequest(createGroup),
        updateGroup: handleRequest(updateGroup),
        deleteGroup: handleRequest(deleteGroup),
        getNewGroup: getNewGroup,
        getUptadeGroup:getUptadeGroup,
    }

    async function getHome (req, rsp) {
        sendFile('index.html', rsp)
    }

    async  function  getCss (req, rsp) {
        sendFile('site.css', rsp)
    }

    async  function  getGroup (req, rsp) {
        const groupId = req.params.groupId
        const group = await groupServices.getGroupsById(req.token, groupId)
        return {name: 'group', data :group}
    }

    async function getGroups(req, rsp) {
        const groups =  await groupServices.getGroups(req.token, req.query.q, req.query.skip, req.query.limit)
        return {name: 'groups', data : {title: 'All groups', groups:groups}}
    }

    async function getNewGroup (req,rsp){
        rsp.render('newGroup')
    }
    async function getUptadeGroup (req,rsp){
        const group = await groupServices.getGroupsById(HAMMER_TOKEN,req.params.groupId)
        console.log(group)
        rsp.render("uptadeGroup", {name: group.name, description: group.description, id : req.params.groupId} )
        console.log("id", req.params.groupId)
    }

    async function createGroup(req, rsp) {
        console.log(req.body)
        let newGroup = await groupServices.createGroup(req.token, req.body)
        rsp.redirect('/groups')
    }
    async function deleteGroup(req, rsp) {
        const groupId = req.params.groupId
        const group = await groupServices.deleteGroup(req.token, groupId)
        rsp.redirect('/groups')
    }
    async function updateGroup(req, rsp) {
        const groupId = req.params.groupId
        console.log(req.body)
        const group = await groupServices.updateGroup(req.token, groupId, req.body)
        rsp.redirect(`/groups/${groupId}`)
    }

    function handleRequest(handler) {
        // while we dont have authentication in site interface,
        // let's hardcode a token for one user '

        const HAMMER_TOKEN = 'ef604e80-a351-4d13-b78f-c888f3e63b60'
        return async function (req, rsp) {
            req.token = HAMMER_TOKEN
            try {
                let view = await handler(req, rsp)
                if(view) {
                    rsp.render(view.name, view.data)
                }
            } catch (e) {
                // hammer time again, we are in an HTML response format
                // returning errors in Json format
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
