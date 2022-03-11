import React from "react";
import { Container, Typography, Button, Box, TextField } from "@mui/material";
var axios = require('axios');

class Login extends React.Component {

  render = () => {
    //login page
    return (
      <Container>
        <Typography variant="h2" align="center" paddingBottom="10vh" >Login</Typography>
        <Box style={{ width:"100%"}}>
          <TextField 
          id="usernameText"
          label="Username"
          defaultValue=""
          placeholder="username" />
          <TextField 
          id="passwordText"
          label="Password"
          defaultValue=""
          placeholder="password"
          />
        </Box>
        <Button onClick={{}}>Login</Button>
      </Container>)
  }

  //attempt to login. Send request to server 
  submitLogin = async () => {
    await axios.post('/login', {
      username: document.getElementById('usernameText').value,
      password: document.getElementById('passwordText').value
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

}

export default Login;
