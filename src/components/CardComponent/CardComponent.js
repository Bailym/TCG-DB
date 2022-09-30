import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Typography, Grid } from '@mui/material';
import CardDialog from '../CardDialog/CardDialog';
import "./CardComponent.css"

function CardComponent(props) {
    const [card, setCard] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    
    //on mount
    useEffect(() => {
        //read the cache for this set
        const cardSet = require("../../../backend/cache/" + props.SetID)

        //find the id for this specific card
        cardSet.data.forEach(card => {
            if (card.id === props.ApiID) {
                setCard(card);
            }
        })
    }, [])

    //handles opening and closing of CardDialog
    function toggleDialog() {
        setOpenDialog(!openDialog)
    }

    return (
        <Grid item xs={4}>
            <Card id="cardContainer" key={card.id} onClick={() => toggleDialog()}>
                <CardContent id="cardContent">
                    <Typography variant="h6" id="cardName">
                        {card.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" id="cardNumber">
                        {card.number}
                    </Typography>
                    <Typography id="cardRarity">
                        {card.rarity}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" id="cardArtist">
                        {card.artist}
                    </Typography>
                </CardContent>
                {card.images ? <CardMedia
                    component="img"
                    id="cardImg"
                    alt={card.name}
                    image={card.images.small}
                    title={card.name} /> : null}
            </Card>
            {card !== [] ? <CardDialog open={openDialog} card={card} onClose={() => toggleDialog()} /> : null}
        </Grid >
    );
}

export default CardComponent