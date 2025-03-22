import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../Context/UseAuthProvider";

const ProtectedRoute = ({ children }) => {
  const { isAuth, isLoading } = useAuthContext();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-300">
          <div className="w-full h-full border-t-2 border-b-2 border-blue-500 rounded-full"></div>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login with return path
  if (!isAuth) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  // If authenticated, render children
  return children;
};

export default ProtectedRoute;
