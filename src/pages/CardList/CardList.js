import * as React from 'react';
import CardComponent from '../../components/cardComponent';
import { Grid } from '@mui/material';
import { useLocation } from 'react-router-dom'
var axios = require('axios');


function CardList() {
    const [cardComponents, setCardComponents] = React.useState([]);
    const location = useLocation()

    //on component mount
    React.useEffect(() => {
        //get the parameters from the url
        const searchParams = new URLSearchParams(location.search)
        let set = searchParams.get('set');

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