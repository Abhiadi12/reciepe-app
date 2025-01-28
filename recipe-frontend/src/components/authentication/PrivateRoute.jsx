import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ children }) {
  const { user } = useSelector((state) => state.auth);
  const isAuthenticated = user?.token; // Replace with actual logic
  return isAuthenticated ? children : <Navigate to="/" />;
}

export default PrivateRoute;
