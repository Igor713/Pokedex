import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import PokemonCard from '../components/PokemonCard'
import Navbar from '../components/Navbar'
import { Grid } from '@mui/material'
import axios from 'axios'

export default function Home() {

    const [pokemons, setPokemons] = useState([])

    useEffect(() => {
        getPokemons()
    }, [])

    const getPokemons = () => {
        let endpoints = []

        for (let i = 1; i < 50; i++) {
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        }

        let response = axios.all(endpoints.map((endpoint) => {
            axios.get(endpoint)
                .then((res) => setPokemons(res))
                .catch((err) => console.log(err))
        }))
        console.log(response)
        return response
    }

    return (
        <div>
            <Navbar />
            <Container maxWidth="false">
                <Grid container spacing={2}>
                    {pokemons.length === 0 && pokemons.map((pokemon, index) => (
                        <Grid key={index} item xs={3}>
                            <PokemonCard name={pokemon.name} image={pokemon.url} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}
