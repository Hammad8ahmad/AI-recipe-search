// import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import AppRouter from './routes/AppRouter'; // Import AppRouter
import NavBar from './components/Navbar';

function App() {
  return (
    <Router>
      <NavBar/>

      <AppRouter /> {/* Use AppRouter for routing */}
    </Router>
  );
}

export default App;
