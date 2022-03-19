import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, Typography, Box, Grid, Item } from '@mui/material';
var axios = require('axios');



class CardComponent extends React.Component {
    constructor(props) {
        super(props);;
    }

    state = {
        cardDetails: null,
        card: []
    }

    componentDidMount = async () => {
        let apiData = []    //the raw api data object

        //set headers for axios
        var config = {
            method: 'get',
            url: `https://api.pokemontcg.io/v2/cards/${this.props.ApiID}`,
            headers: {
                'X-Api-Key': process.env.REACT_APP_TCG_API_KEY
            }
        };

        //make axios request for this card set
        await axios(config)
            .then(async (response) => {
                apiData = response.data
                //the individual card in the set
                let card = apiData.data
                //update the state with the new component
                this.setState({
                    card: card
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render = () => {
        return (
            <Grid item xs={4}>
                <Card sx={{ display: 'flex' }} key={this.state.card.id}>
                    <CardContent>
                        <Typography variant="h6">
                            {this.state.card.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {this.state.card.number}
                        </Typography>
                        <Typography>
                            {this.state.card.rarity}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {this.state.card.artist}
                        </Typography>
                    </CardContent>
                    {this.state.card.images ? <CardMedia
                        component="img"
                        sx={{ width: "5vw" }}
                        alt={this.state.card.name}
                        image={this.state.card.images.small}
                        title={this.state.card.name} /> : null}
                </Card>
            </Grid>
        );
    }
}

export default CardComponent