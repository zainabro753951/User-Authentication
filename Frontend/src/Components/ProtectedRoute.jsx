import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../Context/UseAuthProvider";

const ProtectedRoute = ({ children, isAuth: propIsAuth }) => {
  const { isAuth: contextIsAuth, isLoading } = useAuthContext();
  const location = useLocation();

  // Use prop if provided, otherwise use context
  const isAuthenticated = propIsAuth !== undefined ? propIsAuth : contextIsAuth;

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login with return path
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render children
  return children;
};

export default ProtectedRoute;
