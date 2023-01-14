import crypto from "crypto";


const SESSIONS = {

}

const SESSION_COOKIE= "_session_"
export default function(){
    return function(req, rsp, next){
        let sessionId = req.cookie[SESSION_COOKIE]
        let session = getSession (sessionId)
        req.session = session.data
        rsp.cookie (SESSION_COOKIE, session.id)
        next()
    }
    function getSession (session){
        let session2 = SESSIONS[sessionId]
        if (session2 == undefined){
            session2 = {
                id: crypto.randomUUID(),
                data:{}
            }
            SESSIONS[session2.id]=session2
        }
        return session
    }

}