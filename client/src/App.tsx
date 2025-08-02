import { BrowserRouter as Router, } from 'react-router-dom';
import AppRouter from './routes/AppRouter'; 
import NavBar from './components/Navbar';
import { RecipeProvider } from './context/RecipeContext';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <AuthContextProvider>
    <RecipeProvider>
    <Router>
      <NavBar/>
      <AppRouter /> {/* Use AppRouter for routing */}
    </Router>
    </RecipeProvider>
    </AuthContextProvider>
  );
}

export default App;
