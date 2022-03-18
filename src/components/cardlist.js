import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, Typography, Box, Grid, Item } from '@mui/material';
var axios = require('axios');



class CardList extends React.Component {

    state = {
        cards: [],
        cardComponents: []
    }



    componentDidMount = async () => {

        //get the parameters from the url
        let params = new URLSearchParams(window.location.search);
        let set = params.get('set');

        let newComponents = []  //hold the components generated
        let apiData = []    //the raw api data object

        //set headers for axios
        var config = {
            method: 'get',
            url: `https://api.pokemontcg.io/v2/cards?q=set.id:${set}`,
            headers: {
                'X-Api-Key': process.env.REACT_APP_TCG_API_KEY
            }
        };

        //make axios request for this card set
        await axios(config)
            .then(async function (response) {
                apiData = response.data
                //create a component for each card in apiData
                for (let i = 0; i < apiData.data.length; i++) {
                    //the individual card in the set
                    let card = apiData.data[i]
                    //create a component from each card
                    newComponents.push(
                        <Grid item xs={4}>
                            <Card sx={{ display: 'flex' }} key={card.id}>
                                <CardContent>
                                    <Typography variant="h6">
                                        {card.name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        {card.number}
                                    </Typography>
                                    <Typography>
                                        {card.rarity}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        {card.artist}
                                    </Typography>
                                </CardContent>
                                <CardMedia
                                    component="img"
                                    sx={{ width: "5vw" }}
                                    alt={card.name}
                                    image={card.images.small}
                                    title={card.name} />
                            </Card>
                        </Grid>
                    )
                }
            })
            .catch(function (error) {
                console.log(error);
            });

        //set the state of the component
        this.setState({
            cardComponents: newComponents
        })

    }


    render = () => {
        return (
            /* //render cardComponents in a grid with 3 in each row
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '1vw' }}>
                {this.state.cardComponents}
            </Box> */
            <Grid container spacing={2} alignItems={"center"}>
                {this.state.cardComponents}
            </Grid>
        );
    }
}

export default CardList