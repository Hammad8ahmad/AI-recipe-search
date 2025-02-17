import { Route, Routes } from 'react-router-dom';
import Interface from '../components/Interface';
import SavedRecipes from '../components/SavedRecipes';
// import SavedRecipes from '../components/SavedRecipes'; // Uncomment once you have this component

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Interface />} />
      <Route path="/saved" element={<SavedRecipes/>}/>
      {/* <Route path="/saved" element={<SavedRecipes />} /> */}
    </Routes>
  );
};

export default AppRouter;
