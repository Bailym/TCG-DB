import React from "react";
import { Container, Typography, Button } from "@mui/material";
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
        <Typography variant="h2" >Home</Typography>
        <Button href="/cardlist?set=base1">Base Set</Button>
      </Container>
    );
  }
}

export default Home;
