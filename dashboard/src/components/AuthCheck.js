import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function AuthCheck({children}) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = () => {
        // check for auth parameters in URL
        const authStatus = searchParams.get("auth");
        const userNumber = searchParams.get("number");

        //check localStorage
        const storeAuth = localStorage.getItem("isAuthenticated");
        const storeUserNumber = localStorage.getItem("userNumber");
        if(authStatus === "success" || storeAuth === "true") {
            setIsAuthenticated(true);
        }
        // show welcome message if userNumber is present
        if(userNumber ){
            console.log(`Welcome, user with number: ${userNumber}`);
        }else {
            window.location.href = 'http://localhost:3000';

        }

        setLoading(false);
    };

    if(loading) {
        return <div>Loading...</div>;
    }
    return isAuthenticated ? children : null;
}
export default AuthCheck; 