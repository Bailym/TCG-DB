import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, Typography, DialogTitle, Grid, Dialog, DialogContent, DialogActions, Tabs, Tab, Box, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { TabPanel, TabContext } from '@mui/lab';
var axios = require('axios');



class CardComponent extends React.Component {

    state = {
        card: [],
        openModal: false,
        currentTab: 0,
        attacksComponents: [],
        priceComponents: [],
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

        //make axios request for this card \
        await axios(config)
            .then(async (response) => {
                apiData = response.data
                //the individual card in the set
                let card = apiData.data

                //update the state with the new component
                this.setState({
                    card: card,
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //open the modal by changing the state
    openModal = () => {
        console.log(this.state.card)
        this.setState({
            openModal: true
        })

        //create a list item for each attack. Create an avatar for each attack cost.
        let attacksComponents = []
        attacksComponents = this.state.card.attacks.map(attack =>
            <ListItem key={attack.name} style={{ border: "2px solid #000", marginBottom: "1vh" }}>
                <ListItemAvatar>
                    {attack.cost.map((cost, i) =>
                        <Avatar key={i}>
                            <Typography>{cost}</Typography>
                        </Avatar>)}
                </ListItemAvatar>
                <ListItemText>
                    <Typography variant="body1">{attack.name}</Typography>
                    <Typography variant="body1">{attack.damage}</Typography>
                    <Typography variant="body1">{attack.text}</Typography>
                </ListItemText>
            </ListItem>
        )

        let priceComponents = []
        let cardPrices = this.state.card.cardmarket.prices
        priceComponents.push(
            <ListItem key={this.state.card.id + "avg"}>
                <ListItemText>
                    <Typography variant="body1">{"Average Price: $" + cardPrices.averageSellPrice}</Typography>
                </ListItemText>
            </ListItem>,
            <ListItem key={this.state.card.id + "avg24"}>
                <ListItemText>
                    <Typography variant="body1">{"Average 24hr: $" + cardPrices.avg1}</Typography>
                </ListItemText>
            </ListItem>,
            <ListItem key={this.state.card.id + "avg7"}>
                <ListItemText>
                    <Typography variant="body1">{"Average 7 Days: $" + cardPrices.avg7}</Typography>
                </ListItemText>
            </ListItem>,
            <ListItem key={this.state.card.id + "updatedat"}>
            <ListItemText>
                <Typography variant="body1">{"Updated on: " + this.state.card.cardmarket.updatedAt}</Typography>
            </ListItemText>
        </ListItem>
        )


        this.setState({
            attacksComponents: attacksComponents,
            priceComponents: priceComponents,
        })


    }

    //close the modal by changing the state
    closeModal = () => {
        this.setState({
            openModal: false
        })
    }

    //when the dialog tab is changed
    onTabChange = (event, value) => {
        this.setState({
            currentTab: value
        })
    }

    render = () => {
        return (
            <Grid item xs={4}>
                <Card sx={{ display: 'flex' }} key={this.state.card.id} onClick={() => this.openModal()}>
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
                <Dialog open={this.state.openModal} onClose={() => this.closeModal()}>
                    <DialogTitle>{this.state.card.name + " - " + this.state.card.number}</DialogTitle>
                    <DialogContent>
                        <TabContext value={this.state.currentTab.toString()}>
                            <Tabs value={this.state.currentTab} onChange={this.onTabChange} aria-label="basic tabs example">
                                <Tab label="Key Details" />
                                <Tab label="Moves" />
                                <Tab label="Prices" />
                            </Tabs>
                            <TabPanel value={"0"} index={0}>
                                <List>
                                    <ListItem>
                                        <ListItemText>
                                            <Typography variant="body1">{"Card Type: " + this.state.card.supertype}</Typography>
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText>
                                            <Typography variant="body1">{"HP: " + this.state.card.hp}</Typography>
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText>
                                            <Typography variant="body1">{"Description:  " + this.state.card.flavorText}</Typography>
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText>
                                            {this.state.card.types ? <Typography variant="body1">{"Type: " + this.state.card.types[0]}</Typography> : null}
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText>
                                            <Typography variant="body1">{"Evolves From: " + this.state.card.evolvesFrom}</Typography>
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText>
                                            {this.state.card.subtypes ? <Typography variant="body1">{"Sub Type: " + this.state.card.subtypes[0]}</Typography> : null}
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText>
                                            {this.state.card.level ? <Typography variant="body1">{"Level: " + this.state.card.level}</Typography> : <Typography variant="body1">{"Level: N/A"}</Typography>}
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText>
                                            <Typography variant="body1">{"Rarity: " + this.state.card.rarity}</Typography>
                                        </ListItemText>
                                    </ListItem>
                                </List>

                            </TabPanel>
                            <TabPanel value={"1"} index={1}>
                                <List>
                                    {this.state.attacksComponents}
                                </List>
                            </TabPanel>
                            <TabPanel value={"2"} index={2}>
                                <List>
                                    {this.state.priceComponents}
                                </List>
                            </TabPanel>
                        </TabContext>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={this.closeModal}>Back</Button>
                    </DialogActions>
                </Dialog>
            </Grid >
        );
    }
}

export default CardComponent