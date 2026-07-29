import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const signedIn = localStorage.getItem("signedIn") === "true";

    if (!signedIn) {
        return <Navigate to="/sign-in" replace />;
    }

    return children;
};

export default ProtectedRoute;
