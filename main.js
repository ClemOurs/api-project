const urlPlanete = 'https://swapi.dev/api/planets/'
const urlFilm = 'https://swapi.dev/api/films/'

const urlTranslator = 'https://api.funtranslations.com/translate/sith.json?text='
text = document.querySelector('#text')
submit = document.querySelector('#send')
result = document.querySelector('#result')

submit.addEventListener("click", translate => {
    url = urlTranslator + text.value
    fetch(url)
        .then(response => response.json())
        .then(data => {
            textSith = data.contents.translated
            result.innerHTML = textSith
        })
})

function returnHome() {

    const infosPlanet = document.querySelector('#planet-infos')
    const infosFilm = document.querySelector('#film-infos')

    infosPlanet.className = "none"
    infosFilm.className = "none"

    infosPlanet.innerHTML = ''
    infosFilm.innerHTML = ''

    document.querySelector('#planets').classList.remove("none")
    document.querySelector('#films').classList.remove("none")
    document.querySelector('#translator').classList.remove("none")
    
}

function showPlanetes() {
    fetch(urlPlanete)
        .then(response => response.json())
        .then(response => {
            const container = document.querySelector('#planets')
            const content = document.querySelector('#content')
            planetsNext = response.next
                response.results.forEach(planet => {
                    content.innerHTML +=
                    `<div class="card" data-url="${planet.url}">
                        <img src="img/planetes/${planet.name}.png" alt="${planet.name}"/>
                        <h3>${planet.name}</h3>
                    </div>`
                })
            container.innerHTML +=
            `<button onclick="showMore()" id="showMore">Show all planets</button>`
            planetInfos(container)
        })
}

function planetInfos() {
    document.querySelectorAll('.card').forEach(planet => {
        planet.addEventListener('click', event => {
            // dataset fait référence à la ligne 7 (data-address)
            const planetAdress = planet.dataset.url
            document.querySelector('#planets').className = "none"
            document.querySelector('#films').className = "none"
            document.querySelector('#translator').className = "none"
            document.querySelector('#planet-infos').classList.remove("none")
            document.querySelector('#planet-infos').innerHTML = '<button onclick="returnHome()">Back Home</button>'

            fetch(`${planetAdress}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    const container = document.querySelector('#planet-infos')
                    container.innerHTML +=
                            `<div class="infos">
                                <h3>${data.name}</h3>
                                <h5>Terrain : ${data.terrain}</h5>
                                <h5>Total Population : ${data.population}</h5>
                                <p>climate : ${data.climate}</p>
                                <p>rotation : ${data.rotation_period}</p>
                                <p>orbital period : ${data.orbital_period}</p>
                                <p>diameter : ${data.diameter}</p>
                                <p>gravity : ${data.gravity}</p>
                            </div>`
                })
        })
    })
}

function showFilmInfos() {
    test = document.querySelectorAll('.film').forEach(film => {
        film.addEventListener('click', event => {
            const dataLink = urlFilm + film.id
            document.querySelector('#planets').className = "none"
            document.querySelector('#films').className = "none"
            document.querySelector('#translator').className = "none"
            document.querySelector('#film-infos').classList.remove("none")
            document.querySelector('#film-infos').innerHTML = '<button onclick="returnHome()">Back Home</button>'

            fetch(dataLink)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    const container = document.querySelector('#film-infos')
                    container.innerHTML +=`
                        <div class="infos">
                            <h2>${data.title}</h2>
                            <h5>Director : ${data.director}</h5>
                            <h5>Producers : ${data.producer}</h5>
                            <h5>Release date : ${data.release_date}</h5>
                            <p>${data.opening_crawl}</p>
                        </div>
                    `
                    characters = data.characters
                    vehicles = data.vehicles
                    ships = data.starships
                })
        })
    })
}

// function showCharacters(characters) {
//     const containerCharac = document.querySelector('#characters')
//     characters.forEach(charac => {
//         fetch(charac)
//             .then(response => response.json())
//             .then(data => {
//                 containerCharac.innerHTML +=
//                         `<div class="card">
//                             <p>${data.name}</p>
//                         </div>`
//             })
//     })
// }

// function showVehicles(vehicles) {
//     const containerVehicles = document.querySelector('#vehicles')
//     vehicles.forEach(vehicle => {
//         fetch(vehicle)
//         .then(response => response.json())
//         .then(data => {
//                 containerVehicles.innerHTML +=`
//                     <div class="card">
//                         <p>${data.name}</p>
//                     </div>
//                 `
//             })
//     })
// }

// function showShips(ships) {
//     const containerShips = document.querySelector('#ships')
//     ships.forEach(ship => {
//         fetch(ship)
//         .then(response => response.json())
//         .then(data => {
//                 containerShips.innerHTML +=
//                         `<div class="card">
//                             <p>${data.name}</p>
//                         </div>`
//             })
//     })
// }

function showMore() {
    if (planetsNext !== null) {
        fetch(planetsNext)
            .then(response => response.json())
            .then(response => {
                const content = document.querySelector('#content')
                response.results.forEach(planet => {
                    content.innerHTML +=`
                    <div class="card">
                        <h3>${planet.name}</h3>
                    </div>
                    `
                })

                if (response.next !== null) {
                    planetsNext = response.next
                } else {
                    document.querySelector('#showMore').style.display = 'none'
                    planetsNext = null
                }
        })
    }
}

showFilmInfos()
showPlanetes()