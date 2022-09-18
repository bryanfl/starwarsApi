const fetch = require("node-fetch");

const mapearPlaneta = (planeta) => {
    return {
        "nombre": planeta.name,
        "periodo_de_rotacion": planeta.rotation_period,
        "periodo_orbital": planeta.orbital_period,
        "diametro": planeta.diameter,
        "clima": planeta.climate,
        "gravedad": planeta.gravity,
        "terreno": planeta.terrain,
        "superficie_del_agua": planeta.surface_water,
        "poblacion": planeta.population,
        "residentes": planeta.residents,
        "peliculas": planeta.films,
        "creado": planeta.created,
        "editado": planeta.edited,
        "url": planeta.url
    }
}

const obtenerPlanetas = async (event) => {
    try {
        const resultados = await fetch('https://swapi.py4e.com/api/planets').then(res => res.json());

        const planetas = resultados.results.map(planeta => mapearPlaneta(planeta));

        return {
            status: 200,
            body: planetas
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

const obtenerPlaneta = async (event) => {
    try {
        const { id } = event.pathParameters;

        const planeta = await fetch(`https://swapi.py4e.com/api/planets/${id}`).then(res => res.json());

        return {
            status: 200,
            body: mapearPlaneta(planeta)
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
    obtenerPlanetas,
    obtenerPlaneta
}