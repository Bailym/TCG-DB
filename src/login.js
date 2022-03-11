import React from "react";
import { Container, Typography, Button, Box, TextField, Alert } from "@mui/material";
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
        <Box style={{ width: "100%" }}>
          {this.state.errorMessage !== "" ? <Alert severity="error" style={{marginBottom:"1vh"}}>{this.state.errorMessage}</Alert> : null}
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
            type="password" />
        </Box>
        <Button onClick={() => this.submitLogin()}>Login</Button>
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
