

export default {
    INVALID_PARAMETER: (argName, description) => {
        return {
            code: 1,
            message: `Invalid argument ${argName}`,
            description: description
        }
    },
    USER_NOT_FOUND: () => {
        return {
            code: 2,
            message: `User not found`
        }
    },
    GROUP_NOT_FOUND: (groupId) => {
        return {
            code: 3,
            message: `Group not found`
        }
    },
    MOVIE_ALREADY_IN_GROUP: (movieId) =>{
        return{
            code: 4,
            message: `Movie already in group`
        }
    },MOVIE_NOT_FOUND: (groupId) => {
        return {
            code: 5,
            message: `Movie not found`
        }
    },PASSWORDS_DO_NOT_MATCH: (groupId) => {
        return {
            code: 6,
            message: `Passwords do not match`
        }
    }

}

/*

export default {
    INVALID_PARAMETER: (argName, description) => {
        return {
            code: 1,
            message: `Invalid argument ${argName}`,
            description: description
        }
    },
    USER_NOT_FOUND: () => {
        return {
            code: 2,
            message: `User not found`
        }
    },
    GROUP_NOT_FOUND: (groupId) => {
        return {
            code: 3,
            message: `Group with id ${groupId} not found`
        }
    },
    MOVIE_ALREADY_IN_GROUP: (movieId) =>{
        return{
            code: 4,
            message: `Movie with id ${movieId} already in group`
        }
    },MOVIE_NOT_FOUND: (groupId) => {
        return {
            code: 5,
            message: `Movie with id ${groupId} not found`
        }
    },PASSWORDS_DO_NOT_MATCH: (groupId) => {
        return {
            code: 6,
            message: `Passwords do not match`
        }
    }

}
 */