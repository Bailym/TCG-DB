import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';

class BottomNav extends React.Component {

  state = {
    value: 0,
  }

  setValue = (newValue) => {
    this.setState({
      value: newValue
    })
  }

  componentDidMount = () => {
    //set the nav value depending on the current url path.
    let path = window.location.pathname;
    let value = 0; //0 if home

    if (path === "/wantlist") {
      value = 1;  //1 if login
    }
    else if (path === "/about") {
      value = 2;  //2 if about
    }
    this.setValue(value);
  }


  render = () => {
    return (
      <BottomNavigation
        showLabels
        value={this.state.value}
        onChange={(event, newValue) => {
          this.setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Collection" icon={<HomeIcon />} href="/" />
        <BottomNavigationAction label="Want List" icon={<FavoriteIcon />} href="/wantlist" />
        <BottomNavigationAction label="About" icon={<InfoIcon />} href="/about" />
      </BottomNavigation>
    );
  }
}

export default BottomNav