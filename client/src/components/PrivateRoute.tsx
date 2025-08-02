// src/components/PrivateRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuthContext();

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the children
  return children;
};

export default PrivateRoute;
