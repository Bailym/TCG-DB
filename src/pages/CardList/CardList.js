import * as React from 'react';
import CardComponent from '../../components/cardComponent';
import { Grid } from '@mui/material';
var axios = require('axios');


function CardList() {
    const [cardComponents, setCardComponents] = React.useState([]);

    //on component mount
    React.useEffect(() => {
        //get the parameters from the url
        let params = new URLSearchParams(window.location.search);
        let set = params.get('set');
        const setData = require("../../../backend/cache/" + set)

        let newComponents = setData.data.map((card) => 
            <CardComponent key={card.id} ApiID={card.id} SetID={set} />
        ) 
        setCardComponents(newComponents)
    }, [])

    return (
        <Grid container spacing={2} alignItems={"center"}>
            {cardComponents}
        </Grid>
    );
}


export default CardList