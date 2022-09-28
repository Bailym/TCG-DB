import React from "react";
import { Container, Typography, Button, Grid } from "@mui/material";
var axios = require('axios');

class Home extends React.Component {

  state = {
    buttonComponents: []
  }

  componentDidMount = async () => {
    /* await axios.get('/api/checkuser')  //call the server endpoint
      .then(async response => {
        if (response.data === false) {   //if false redirect to login (you are not logged in.)
          window.location.href = "/login";
        }
      })
      .catch(function (error) {
        console.log(error);
      }) */

    let tempComponents = [];
    let apiData = [];

    //set headers for axios
    var config = {
      method: 'get',
      url: `https://api.pokemontcg.io/v2/sets`,
      headers: {
        'X-Api-Key': process.env.REACT_APP_TCG_API_KEY
      }
    };

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
            <Button fullwidth key={currentSetID} href={process.env.PUBLIC_URL + `/cardlist?set=${currentSetID}`} style={{ fontSize: "2vw", textAlign:"center"}}>{currentSetName}</Button>
          ) //create a button. 
        }

        //update the state with the new components
        this.setState({
          buttonComponents: tempComponents
        })

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render = () => {
    return (
      <Container>
        <Typography variant="h2" align="center" paddingBottom="5vh" >Home</Typography>
        <Grid
          container
          justify={"center"}
          direction={"column"}>
          {this.state.buttonComponents}
        </Grid>
      </Container>
    );
  }
}

export default Home;
