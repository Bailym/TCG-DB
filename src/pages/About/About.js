import React from "react";
import { Container, Typography, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
var axios = require('axios');

class About extends React.Component {

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
  }

  onSignOut = async () => {
    await axios.get('/api/logout')  //call the server endpoint
      .then(async response => {
        if (response.data === "OK") {   //if true redirect to login (you are not logged in.)
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
        <Typography variant="h2" align="center" paddingBottom="5vh" >About</Typography>
        <Box style={{ width: '95%', bgcolor: 'background.paper', margin:"auto" }}>
            <List>
              <ListItem>
                <ListItemButton style={{textAlign:"center"}} onClick={() => this.onSignOut()}>
                  <ListItemIcon><LogoutIcon /></ListItemIcon>
                  <ListItemText primary="Sign Out" style={{fontSize:"24px"}} />
                </ListItemButton>
              </ListItem>
            </List>
        </Box>

      </Container>
    );
  }
}

export default About;
