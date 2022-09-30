import { useState, useEffect } from 'react';
import  Card from '@mui/material/Card' ;
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, Typography, DialogTitle, Grid, Dialog, DialogContent, DialogActions, Tabs, Tab, Box, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { TabPanel, TabContext } from '@mui/lab';
import "./cardComponent.css"
var axios = require('axios');

function CardComponent(props) {
    const [card, setCard] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentTab, setCurrentTab] = useState(0);
    const [attacksComponents, setAttacksComponents] = useState([]);
    const [priceComponents, setPriceComponents] = useState([]);

    //on mount
    useEffect(() => {

        const cardSet = require("../../backend/cache/" + props.SetID)

        //find the card id in cardSet.data
        cardSet.data.forEach(card => {
            if (card.id === props.ApiID) {
                setCard(card);
            }
        })
    }, [])

    //when the modal is opened.
    function openModal() {

        toggleModalShow()

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

        let priceComponents = []
 
        let cardPrices = card.cardmarket.prices
        priceComponents.push(
            <ListItem key={card.id + "avg"}>
                <ListItemText>
                    <Typography variant="body1">{"Average Price: $" + cardPrices.averageSellPrice}</Typography>
                </ListItemText>
            </ListItem>,
            <ListItem key={card.id + "avg24"}>
                <ListItemText>
                    <Typography variant="body1">{"Average 24hr: $" + cardPrices.avg1}</Typography>
                </ListItemText>
            </ListItem>,
            <ListItem key={card.id + "avg7"}>
                <ListItemText>
                    <Typography variant="body1">{"Average 7 Days: $" + cardPrices.avg7}</Typography>
                </ListItemText>
            </ListItem>,
            <ListItem key={card.id + "updatedat"}>
                <ListItemText>
                    <Typography variant="body1">{"Updated on: " + card.cardmarket.updatedAt}</Typography>
                </ListItemText>
            </ListItem>
        )

        setAttacksComponents(attacksComponents)
        setPriceComponents(priceComponents)

    }


    function toggleModalShow() {
        setOpen(!open);
    }

    //when the dialog tab is changed
    function onTabChange(event, value) {
        setCurrentTab(value);
    }

    return (
        <Grid item xs={4}>
            <Card id="cardContainer" key={card.id} onClick={() => openModal()}>
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
            <Dialog open={open} onClose={() => toggleModalShow()}>
                <DialogTitle>{card.name + " - " + card.number}</DialogTitle>
                <DialogContent>
                    <TabContext value={currentTab.toString()}>
                        <Tabs value={currentTab} onChange={(event, value) => onTabChange(event, value)} >
                            <Tab label="Key Details" />
                            <Tab label="Moves" />
                            <Tab label="Prices" />
                        </Tabs>
                        <TabPanel value={"0"} index={0}>
                            <List>
                                <ListItem>
                                    <ListItemText>
                                        <Typography variant="body1">{"Card Type: " + card.supertype}</Typography>
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                        <Typography variant="body1">{"HP: " + card.hp}</Typography>
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                        <Typography variant="body1">{"Description:  " + card.flavorText}</Typography>
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                        {card.types ? <Typography variant="body1">{"Type: " + card.types[0]}</Typography> : null}
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                        <Typography variant="body1">{"Evolves From: " + card.evolvesFrom}</Typography>
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                        {card.subtypes ? <Typography variant="body1">{"Sub Type: " + card.subtypes[0]}</Typography> : null}
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                        {card.level ? <Typography variant="body1">{"Level: " + card.level}</Typography> : <Typography variant="body1">{"Level: N/A"}</Typography>}
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                        <Typography variant="body1">{"Rarity: " + card.rarity}</Typography>
                                    </ListItemText>
                                </ListItem>
                            </List>

                        </TabPanel>
                        <TabPanel value={"1"} index={1}>
                            <List>
                                {attacksComponents}
                            </List>
                        </TabPanel>
                        <TabPanel value={"2"} index={2}>
                            <List>
                                {priceComponents}
                            </List>
                        </TabPanel>
                    </TabContext>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => toggleModalShow()}>Back</Button>
                </DialogActions>
            </Dialog>
        </Grid >
    );

}



export default CardComponent