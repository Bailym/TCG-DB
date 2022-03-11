import React from "react";
import { Container, Typography, Button } from "@mui/material";

class Home extends React.Component{

  render = () => {
    return (
      <Container>
        <Typography variant="h2" >Home</Typography>
        <Button href="/cardlist">Base Set</Button>
      </Container>
    );
  }
}

export default Home;
