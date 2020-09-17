const express = require("express")
const app = express()
const fetch = require("node-fetch")
const port = 3000
const cors = require("cors")

app.use(cors())

let pokemons = {}

app.get("/api/pokemon/:id", (req, res) => {
  const foundPokemon = pokemons[req.params.id]
  
  if (foundPokemon) {
    const resp = {
      status: 200,
      message: "Resource located!",
      data: foundPokemon,
    };
    return res.json(resp)
  }

  fetch(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`)
    .then(resp => resp.json())
    .then(data => {
      const pokemon = {
        id: data.id,
        name: data.name,
        weight: data.weight,
        height: data.height,
        types: data.types.map((type) => type.type.name),
        base_experience: data.base_experience,
        image: data.sprites.other["official-artwork"].front_default
          ? data.sprites.other["official-artwork"].front_default
          : `https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`,
      };
      const resp = {
        status: 200,
        message: "Resource located!",
        data: pokemon,
      }
      pokemons[pokemon.id] = pokemon
      return res.json(resp)
    })
    .catch(err => res.json(
      {
        "status": 404,
        "message": "Pokemon doesn't exists. Please check for a typo or try a different one.",
        "data": {}
      }
    ))
})

app.listen(port, () => {
  console.log(`Running at port ${port}`)
})
