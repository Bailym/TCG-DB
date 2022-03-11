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
      <Box id="appContainer" style={{ backgroundColor: "#d0d3d9", maxHeight: "100vh"}}>
        <Container id="contentContainer" maxWidth="md" style={{ margin: "auto", backgroundColor: "#fff", height:"95vh", maxHeight: "95vh", overflowY: "hidden" }}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/wantlist" element={<WantList />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Router>
        </Container>
        <Container id="navContainer" maxWidth="md" disableGutters={true} style={{ height: "5vh" }}>
          <BottomNav />
        </Container>
      </Box>)
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));  

