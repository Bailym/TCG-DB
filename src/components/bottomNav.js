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

  setValue = (newValue) =>{
    this.setState({
      value: newValue
    })
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
          <BottomNavigationAction label="Collection" icon={<HomeIcon />} />
          <BottomNavigationAction label="Want List" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="About" icon={<InfoIcon />} />
        </BottomNavigation>
    );
  }
}

export default BottomNav