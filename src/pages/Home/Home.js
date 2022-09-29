import { React, useState, useEffect } from "react";
import { Container, Typography, Button, Grid } from "@mui/material";
import "./Home.css";
const axios = require('axios')

function Home() {

  const [buttonComponents, setButtonComponents] = useState([])

  //set headers for axios
  const config = {
    method: 'get',
    url: `https://api.pokemontcg.io/v2/sets`,
    headers: {
      'X-Api-Key': process.env.REACT_APP_TCG_API_KEY
    }
  };

  useEffect(() => {
    //gets the titles of the sets from TCG API and creates buttons for each set
    async function getSetTitles() {

      let apiData = [];
      let tempComponents = [];

      //make axios request for this card set
      await axios(config)
        .then(async response => {
          //get the api data
          apiData = response.data
          let currentSetID = null
          let currentSetName = null

          //create a button for each set
          for (let i = 0; i < apiData.data.length; i++) {
            currentSetID = apiData.data[i].id
            currentSetName = apiData.data[i].name
            tempComponents.push(
              <Button id="setButton" key={currentSetID} href={process.env.PUBLIC_URL + `/#/cardlist?set=${currentSetID}`} >{currentSetName}</Button>
            ) //create a button. 
          }

          //update the state with the new components
          setButtonComponents(tempComponents);
        })
    }

    //call the async function
    getSetTitles();
  }, [])

  return (
    <Container>
      <Typography id="pageHeader" variant="h2">Home</Typography>
      <Grid
        id="buttonGrid"
        container
        justify={"center"}
        direction={"column"}>
        {buttonComponents}
      </Grid>
    </Container>
  );


}


export default Home;
