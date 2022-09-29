import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import CardList from "./pages/CardList/CardList";
import { Container } from '@mui/material';
import { Box } from '@mui/material';

class Index extends React.Component {

  render = () => {
    return (
      <Box id="appContainer" style={{ backgroundColor: "#d0d3d9", maxHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Container id="contentContainer" maxWidth="md" style={{ margin: "auto", backgroundColor: "#fff", height: "100vh", overflowY: "scroll" }}>
          <Router >
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/cardlist" element={<CardList />} />
            </Routes>
          </Router>
        </Container>
      </Box>)
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));

