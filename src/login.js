import React from "react";
import { Container, Typography, Button, Box, TextField, Alert, Grid } from "@mui/material";
var axios = require('axios');
var sha512 = require('js-sha512');

class Login extends React.Component {

  state = {
    errorMessage: "",
  }

  render = () => {
    //login page
    return (
      <Container>
        <Typography variant="h2" align="center" paddingBottom="5vh" >Login</Typography>
          {this.state.errorMessage !== "" ? <Alert severity="error" style={{ marginBottom: "1vh" }}>{this.state.errorMessage}</Alert> : null}
          <Grid
            container
            direction={'column'}
            justify={'center'}
            alignItems={'center'}
          >
            <TextField
              id="emailText"
              label="Email"
              defaultValue=""
              placeholder="Email"
              fullWidth
              style={{marginBottom:"1vh"}}/>
            <TextField
              id="passwordText"
              label="Password"
              defaultValue=""
              placeholder="Password"
              type="password"
              fullWidth />
            <Button fullWidth style={{fontSize:"24px"}} onClick = {() => this.submitLogin()}> Login </Button>
          </Grid>
      </Container>)
  }

  //attempt to login. Send request to server 
  submitLogin = async () => {
    let email = document.getElementById('emailText').value
    let password = document.getElementById('passwordText').value  //get the values from the form.

    //Hash the entered password
    password = sha512.update(password);
    password = password.hex();

    //send the request to the server
    await axios.post(`/api/login/${email}/${password}`)
      .then((response) => {
        if (response.data === true) {
          //send the user to the home page
          window.location.href = "/";
        }
        else {
          console.log("here")
          //set error mesage to invalid credentials
          this.setState({ errorMessage: "Invalid login" })
        }
      })
      .catch(function (error) {
        console.log(error); //log any errors
      });
  }

}

export default Login;
