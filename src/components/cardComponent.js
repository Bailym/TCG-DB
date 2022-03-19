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
        cardDetails: null,
        card: [],
        openModal: false,
        currentTab: 0,
        attacksComponents: [],
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

                //create a list item for each attack. Create an avatar for each attack cost.
                let attacksComponents = []
                attacksComponents = card.attacks.map(attack =>
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
                //update the state with the new component
                this.setState({
                    card: card,
                    attacksComponents: attacksComponents,
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

                            </TabPanel>
                            <TabPanel value={"1"} index={1}>
                                <List>
                                    {this.state.attacksComponents}
                                </List>
                            </TabPanel>
                            <TabPanel value={"2"} index={2}>3</TabPanel>
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