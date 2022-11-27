import  fetch  from 'node-fetch'
const API_KEY = 'k_o4zms241'

export async function mostPopular(limit){
    const rps = await fetch(`https://imdb-api.com/en/API/Top250Movies/${API_KEY}`)
    const movies = await rps.json()
    const myMovies = movies.items.slice(0,limit)
    const ids = myMovies.map(m=> m.id)
    return await getMovieById (ids)

}
export async function mostPopularByTitle(title, limit){
    const rps = await fetch(`https://imdb-api.com/en/API/AdvancedSearch/${API_KEY}?title=${title}&count=${limit}&title_type=feature`)
    const movies = await rps.json()
    const myMovies = movies.items.slice(0,limit)
    const ids = myMovies.map(m=> m.id)
    return await getMovieById (ids)
}

async function  getMovieById (ids){
    let newObj = {
        "total-duration": 0,
        "movies": []
    }
    for(const id of ids){
        let response = await fetch(`https://imdb-api.com/en/API/Title/${API_KEY}/${id}`)
        let movie = await response.json()
        newObj['total-duration'] += parseInt(movie.runtimeMins)
        newObj.movies.push({"id" : movie.id, "tittle" : movie.title, "duration" : movie.runtimeMins})
    }
    return newObj
}
