
export default {
    INVALID_ARGUMENT: argName => {
        return {
            errorCode:1,
            description: `Invalid argument ${argName}`
        }
    },
    GROUP_NOT_FOUND: () =>{
        return{
            errorCode:2,
            description: "Group not found"
        }
    }
}