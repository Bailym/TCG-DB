import React from "react";
import { Container, Typography } from "@mui/material";
var axios = require('axios');

class About extends React.Component{
  
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
        <Typography variant="h2" >About</Typography>
      </Container>
    );
  }
}

export default About;
