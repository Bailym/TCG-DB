import * as React from 'react';
import CardComponent from '../../components/cardComponent';
import { Grid, IconButton, Container, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
var axios = require('axios');


function CardList() {
    const [cardComponents, setCardComponents] = React.useState([]);
    const location = useLocation()
    const [title, setTitle] = React.useState(null)

    //on component mount
    React.useEffect(() => {
        //get the parameters from the url
        const searchParams = new URLSearchParams(location.search)
        let set = searchParams.get('set');

        //get the data for this set from the cache
        const cacheData = require("../../../backend/cache/" + set)

        //create components from the cache data
        let newComponents = cacheData.data.map((card) =>
            <CardComponent key={card.id} ApiID={card.id} SetID={set} />
        )

        //update state
        setCardComponents(newComponents)
        setTitle(cacheData.data[0].set.name);
    }, [])

    function goHome() {
        window.location.href = "/#/"
    }

    return (
        <Container>
            <IconButton size="large" onClick={() => goHome()}>
                <ArrowBackIcon />
            </IconButton>
            {title == null ? null : <Typography id="pageHeader" variant="h2">{title}</Typography>}
            <Grid container spacing={2} alignItems={"center"}>
                {cardComponents}
            </Grid>
        </Container>
    );
}


export default CardList