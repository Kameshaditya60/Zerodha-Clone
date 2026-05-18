import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const LANDING_URL = process.env.REACT_APP_LANDING_URL || "http://localhost:3000";

function AuthCheck({ children }) {
    const [searchParams] = useSearchParams();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authStatus = searchParams.get("auth");
        const userNumber = searchParams.get("number");
        const storeAuth = localStorage.getItem("isAuthenticated");

        const isAuth = authStatus === "success" || storeAuth === "true";

        if (userNumber) {
            console.log(`Welcome, user with number: ${userNumber}`);
        }

        if (isAuth) {
            setIsAuthenticated(true);
            setLoading(false);
        } else {
            // Not authenticated — bounce back to the landing app's login page.
            window.location.href = `${LANDING_URL}/login`;
        }
    }, [searchParams]);

    if (loading) {
        return <div>Loading...</div>;
    }
    return isAuthenticated ? children : null;
}

export default AuthCheck;
