import React from "react";
import { Container, Typography, Button, Grid } from "@mui/material";
var axios = require('axios');

class Home extends React.Component {

  componentDidMount = async () => {
    await axios.get('/api/checkuser')  //call the server endpoint
      .then(async response => {
        if (response.data === false) {   //if false redirect to login (you are not logged in.)
          window.location.href = "/login";
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render = () => {
    return (
      <Container>
        <Typography variant="h2" align="center" paddingBottom="5vh" >Home</Typography>
        <Grid
          container
          justify={"center"}
          direction={"column"}>
          <Button href="/cardlist?set=base1" style={{ fontSize: "2vw" }}>Base Set</Button>
        </Grid>
      </Container>
    );
  }
}

export default Home;
