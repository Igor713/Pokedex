import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import Navbar from "../components/Navbar";
import { Box, CircularProgress, Grid } from "@mui/material";
import axios from "axios";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPokemons = async () => {
    setIsLoading(true);
    let endpoints = [];

    for (let i = 1; i < 50; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }

    try {
      const requests = endpoints.map((endpoint) => axios.get(endpoint));
      const responses = await Promise.all(requests);

      const result = responses.map((response) => response.data);
      setPokemons(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <div>
      <Navbar />
      <Container maxWidth="false">
        <Grid container spacing={2}>
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            !!pokemons.length &&
            pokemons.map((pokemon, index) => (
              <Grid key={index} item xs={3}>
                <PokemonCard
                  name={pokemon.name}
                  url={pokemon.sprites.other.dream_world.front_default}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </div>
  );
}
