import React from "react";
import { Container, Typography, Button } from "@mui/material";

class Home extends React.Component{

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
