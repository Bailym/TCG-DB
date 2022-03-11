import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, Typography, Box } from '@mui/material';
var axios = require('axios');



class CardList extends React.Component {

    state = {
        cards: [],
        cardComponents: []
    }



    componentDidMount = async () => {
        let newComponents = []  //hold the components generated
        let apiData = []    //the raw api data object

        //set headers for axios
        var config = {
            method: 'get',
            url: 'https://api.pokemontcg.io/v2/cards?q=set.id:base1',
            headers: {
                'X-Api-Key': 'fd094ea5-9cb1-4a45-bbaa-356ef83d8863'
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
                        <Card sx={{ display: 'flex' }} key={card.id}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        {card.name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {card.number}
                                    </Typography>
                                </CardContent>
                                <Box sx={{alignItems: 'center', pl: 1, pb: 1 }}>
                                    <Typography component="div">
                                        {card.rarity}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {card.artist}
                                    </Typography>

                                </Box>
                            </Box>
                            <CardMedia
                                component="img"
                                sx={{ width: "5vw" }}
                                alt={card.name}
                                image={card.images.small}
                                title={card.name} />
                        </Card>)
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
            //render cardComponents in a grid with 3 in each row
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '1vw' }}>
                {this.state.cardComponents}
            </Box>          
        );
    }
}

export default CardList