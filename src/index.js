import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import WantList from './wantlist';
import About from './about';
import Login from './login';
import CardList from "./components/cardlist";
import BottomNav from "./components/bottomNav";
import { Container } from '@mui/material';
import { Box } from '@mui/material';

class Index extends React.Component {


  componentDidMount = () => {
    //disable scrolling on body
    document.body.style.overflow = 'hidden';
  }
  render = () => {
    return (
      <Box id="appContainer" style={{ backgroundColor: "#d0d3d9", maxHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <BottomNav />
        <Container id="contentContainer" maxWidth="md" style={{ margin: "auto", backgroundColor: "#fff", height: "100vh", overflowY: "scroll" }}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/wantlist" element={<WantList />} />
              <Route path="/about" element={<About />} />
              <Route path="/cardlist" element={<CardList />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Router>
          
        </Container>

      </Box>)
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));

