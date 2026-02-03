import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { isAuthenticated } from "../components/utils/token";

const Private = ({ children }) => {
  const { userData, loading } = useContext(AuthContext);

  // console.log("Private - loading:", loading);
  // console.log("Private - userData:", userData);
  // console.log("Private - isAuthenticated:", isAuthenticated());


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated() || !userData) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default Private;
