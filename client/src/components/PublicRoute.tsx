import { Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuthContext();

  // If user is logged in, redirect to home
  if (user) {
    return <Navigate to="/" replace />;
  }

  // Otherwise show the public page (login/signup)
  return children;
};

export default PublicRoute;
