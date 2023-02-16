import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import Navbar from "../components/Navbar";
import { Grid } from "@mui/material";
import axios from "axios";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  console.log(pokemons);
  const getPokemons = async () => {
    let endpoints = [];

    for (let i = 1; i < 50; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }

    const requests = endpoints.map((endpoint) => axios.get(endpoint));
    const responses = Promise.all(requests);

    const result = (await responses).map((response) => response.data);
    setPokemons(result);
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <div>
      <Navbar />
      <Container maxWidth="false">
        <Grid container spacing={2}>
          {pokemons.length &&
            pokemons.map((pokemon, index) => (
              <Grid key={index} item xs={3}>
                <PokemonCard
                  name={pokemon.name}
                  url={pokemon.sprites.other.dream_world.front_default}
                />
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
}
