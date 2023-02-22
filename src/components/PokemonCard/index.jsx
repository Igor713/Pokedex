import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './style.scss'

export default function PokemonCard({ id, name, url, types }) {
    const typesFormatted = types.map(typeInfo => typeInfo.type.name)

    return (
        <Card sx={{ maxWidth: 345, borderRadius: "12px" }} className={typesFormatted[0] + ' pokemon-color'}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={url}
                    alt={`Imagem do ${name}`}
                />
                <CardContent sx={{ textAlign: "center" }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {`${id}. ${name.charAt(0).toUpperCase() + name.slice(1)}`}
                    </Typography>
                    <Typography variant="p" color="text.secondary">
                        {typesFormatted.join(' | ')}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
