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
          id="emailText"
          label="Email"
          defaultValue=""
          placeholder="email" />
          <TextField 
          id="passwordText"
          label="Password"
          defaultValue=""
          placeholder="password"
          />
        </Box>
        <Button onClick={() => this.submitLogin()}>Login</Button>
      </Container>)
  }

  //attempt to login. Send request to server 
  submitLogin = async () => {
    let email = document.getElementById('emailText').value
    let password = document.getElementById('passwordText').value  //get the values from the form.

    await axios.post(`/api/login/${email}/${password}`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

}

export default Login;
