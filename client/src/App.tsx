import { BrowserRouter as Router, } from 'react-router-dom';
import AppRouter from './routes/AppRouter'; 
import NavBar from './components/Navbar';
import { RecipeProvider } from './context/RecipeContext';

function App() {
  return (
    <RecipeProvider>
    <Router>
      <NavBar/>
      <AppRouter /> {/* Use AppRouter for routing */}
    </Router>
    </RecipeProvider>
  );
}

export default App;
