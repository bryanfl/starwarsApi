const fetch = require("node-fetch");

const mapearPersona = (persona) => {
    return {
        "nombre": persona.name,
        "altura": persona.height,
        "peso": persona.mass,
        "color_de_pelo": persona.hair_color,
        "color_de_piel": persona.skin_color,
        "color_de_ojo": persona.eye_color,
        "fecha_nacimiento": persona.birth_year,
        "genero": persona.gender,
        "lugar_nacimiento": persona.homeworld,
        "peliculas": persona.films,
        "especies": persona.species,
        "vehiculos": persona.vehicles,
        "naves_estelares": persona.starships,
        "creado": persona.created,
        "editado": persona.edited,
        "url": persona.url
    }
}

const obtenerPersonas = async (event) => {
    try {
        const resultados = await fetch('https://swapi.py4e.com/api/people').then(res => res.json());

        const personas = resultados.results.map(persona => mapearPersona(persona));

        return {
            status: 200,
            body: personas
        }
    } catch (err){
        return {
            status: 500,
            body: {
                message: err.message
            }
        }
    }
}

const obtenerPersona = async (event) => {
    try {
        const { id } = event.pathParameters;

        const persona = await fetch(`https://swapi.py4e.com/api/people/${id}`).then(res => res.json());

        return {
            status: 200,
            body: mapearPersona(persona)
        }
    } catch (err){
        return {
            status: 500,
            body: {
                message: err.message
            }
        }
    }
}

module.exports = {
    obtenerPersonas,
    obtenerPersona
}