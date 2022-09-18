const { obtenerPersona } = require('../star_wars/personas');

test('Obtuvo personas correctamente', async () => {
    expect(await obtenerPersona({ pathParameters: { id: 1 } })).toBe({
        "status": 200,
        "body": {
            nombre: "Luke Skywalker",
            altura: "172",
            peso: "77",
            color_de_pelo: "blond",
            color_de_piel: "fair",
            color_de_ojo: "blue",
            fecha_nacimiento: "19BBY",
            genero: "male",
            lugar_nacimiento: "https://swapi.py4e.com/api/planets/1/",
            peliculas: [
                "https://swapi.py4e.com/api/films/1/",
                "https://swapi.py4e.com/api/films/2/",
                "https://swapi.py4e.com/api/films/3/",
                "https://swapi.py4e.com/api/films/6/",
                "https://swapi.py4e.com/api/films/7/"
            ],
            especies: [
                "https://swapi.py4e.com/api/species/1/"
            ],
            vehiculos: [
                "https://swapi.py4e.com/api/vehicles/14/",
                "https://swapi.py4e.com/api/vehicles/30/"
            ],
            naves_estelares: [
                "https://swapi.py4e.com/api/starships/12/",
                "https://swapi.py4e.com/api/starships/22/"
            ],
            creado: "2014-12-09T13:50:51.644000Z",
            editado: "2014-12-20T21:17:56.891000Z",
            url: "https://swapi.py4e.com/api/people/1/"
        }
    })

    expect(await obtenerPersona({})).toBe({
        "status": 500,
        "body": {
            "message": "Cannot destructure property 'id' of 'event.pathParameters' as it is undefined."
        }
    })
})