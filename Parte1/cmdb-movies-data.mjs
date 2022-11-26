import  fetch  from 'node-fetch'
const API_KEY = 'k_n372g739'

import { readFile, writeFile } from 'node:fs/promises'

let newObj = {
    "total-duration": 0,
    "movies": []
}
const IN_FILE_NAME = 'D:/ISEL/5_semestre/ipw/Part1/a1-js-ipw_pi-marsul1/Parte2/ids.json'
const OUT_FILE_NAME = 'D:/ISEL/5_semestre/ipw/Part1/a1-js-ipw_pi-marsul1/Parte2/movies-info.json'

let response = await readFile(IN_FILE_NAME)
let fileContent = await JSON.parse(response)
fileData(fileContent)


async function fileData(movies) {
    let m = []
    movies['movie-ids'].forEach( async movieId => {
            let response = await fetch(`https://imdb-api.com/en/API/Title/${API_KEY}/${movieId}`)
            let movie = await response.json()
            m.push(movie)
        }
    )
    m.map(movie => {
        newObj['total-duration'] += parseInt(movie.runtimeMins)
        newObj.movies.push({"id" : movie.id, "tittle" : movie.title, "duration" : movie.runtimeMins})
    })
    writeFile()
}
function write_file(){
    writeFile(OUT_FILE_NAME, JSON.stringify(newObj, null, 4))        // escreve no file.json
}