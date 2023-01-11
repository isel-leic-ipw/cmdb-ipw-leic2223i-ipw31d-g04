import  fetch  from 'node-fetch'
//const API_KEY = 'k_o4zms241'
const API_KEY = 'k_h738jg8b'

export async function mostPopular(limit){
    const rps = await fetch(`https://imdb-api.com/en/API/Top250Movies/${API_KEY}`)
    const movies = await rps.json()
    const myMovies = movies.items.slice(0,limit)
    return await myMovies
}

export async function mostPopularByTitle(limit,title){
    const rps = await fetch(`https://imdb-api.com/en/API/AdvancedSearch/${API_KEY}?title=${title}&count=${limit}&title_type=feature`)
    const movies = await rps.json()
    const myMovies = movies.results.slice(0,limit)
    return await myMovies
}

export async function getMovieById (id){
    const rps =  await fetch(`https://imdb-api.com/en/API/Title/${API_KEY}/${id}`)
    const movie = await rps.json()
    const myMovie =  {
       "id": movie.id,
        "title": movie.title,
        "description": movie.plot,
        "image": movie.image,
        "runtimeMins": movie.runtimeMins,
        "directors": movie.directors,
        "actors": movie.actorList.map(actor => actor.name)
    }
    return myMovie
}

