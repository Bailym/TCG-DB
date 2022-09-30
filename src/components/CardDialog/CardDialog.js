import { useState, useEffect } from 'react';
import { Button, Typography, DialogTitle, Grid, Dialog, DialogContent, DialogActions, Tabs, Tab, Box, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { TabPanel, TabContext } from '@mui/lab';
import "./CardDialog.css"
var axios = require('axios');

function CardDialog(props) {

    const [currentTab, setCurrentTab] = useState(0);    //the current tab 0-2
    const [attacksComponents, setAttacksComponents] = useState([]); //specific cards attacks
    const [priceComponents, setPriceComponents] = useState([]); //specific cards prices


    //when component mounts
    useEffect(() => {
        //when the component recieves card props
        if (props.card.attacks != null) {
            //create a list item for each attack. Create an avatar for each attack cost.
            let attacksComponents = []
            attacksComponents = props.card.attacks.map(attack =>
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

            //create components from the price data
            let cardPrices = props.card.cardmarket.prices
            priceComponents.push(
                <ListItem key={props.card.id + "avg"}>
                    <ListItemText>
                        <Typography variant="body1">{"Average Price: $" + cardPrices.averageSellPrice}</Typography>
                    </ListItemText>
                </ListItem>,
                <ListItem key={props.card.id + "avg24"}>
                    <ListItemText>
                        <Typography variant="body1">{"Average 24hr: $" + cardPrices.avg1}</Typography>
                    </ListItemText>
                </ListItem>,
                <ListItem key={props.card.id + "avg7"}>
                    <ListItemText>
                        <Typography variant="body1">{"Average 7 Days: $" + cardPrices.avg7}</Typography>
                    </ListItemText>
                </ListItem>,
                <ListItem key={props.card.id + "updatedat"}>
                    <ListItemText>
                        <Typography variant="body1">{"Updated on: " + props.card.cardmarket.updatedAt}</Typography>
                    </ListItemText>
                </ListItem>
            )

            //update state with created components
            setAttacksComponents(attacksComponents)
            setPriceComponents(priceComponents)
        }
    }, [props.card])


    //handles the dialog tab being changed
    function onTabChange(event, value) {
        setCurrentTab(value);
    }

    return (
        <Dialog open={props.open}  id="dialog" onClose={props.onClose}>
            <DialogTitle>{props.card.name + " - " + props.card.number}</DialogTitle>
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
                                    <Typography variant="body1">{"Card Type: " + props.card.supertype}</Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="body1">{"HP: " + props.card.hp}</Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="body1">{"Description:  " + props.card.flavorText}</Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    {props.card.types ? <Typography variant="body1">{"Type: " + props.card.types[0]}</Typography> : null}
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="body1">{"Evolves From: " + props.card.evolvesFrom}</Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    {props.card.subtypes ? <Typography variant="body1">{"Sub Type: " + props.card.subtypes[0]}</Typography> : null}
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    {props.card.level ? <Typography variant="body1">{"Level: " + props.card.level}</Typography> : <Typography variant="body1">{"Level: N/A"}</Typography>}
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="body1">{"Rarity: " + props.card.rarity}</Typography>
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
                <Button autoFocus onClick={props.onClose}>Back</Button>
            </DialogActions>
        </Dialog>
    )

}

export default CardDialog;