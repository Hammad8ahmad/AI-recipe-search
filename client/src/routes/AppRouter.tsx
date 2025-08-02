import { Route, Routes } from "react-router-dom";
import Interface from "../components/Interface";
import SavedRecipes from "../components/SavedRecipes";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import PrivateRoute from "../components/PrivateRoute";
import PublicRoute from "../components/PublicRoute";

const AppRouter = () => {
  return (
    <Routes>
      {/* Protected Routes */}
      <Route path="/" element={<PrivateRoute><Interface /></PrivateRoute>} />
      <Route path="/saved" element={<PrivateRoute><SavedRecipes /></PrivateRoute>} />

      {/* Public-only Routes */}
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
    </Routes>
  );
};

export default AppRouter;
