import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from "./Loader";
import {verifyAccessToken} from "../api/verifyAccessToken";

const ProtectedRoute = ({ element }) => {
    const navigate = useNavigate();
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('access-token');

        if (!token) {
            // No token found, navigate to login page
            navigate('/login');
            return;
        }

        verifyAccessToken(token).then((verified) => {
            if (verified) {
                // Token is valid, allow access
                setIsVerified(true);
            } else {
                // Token is invalid, navigate to login page
                navigate('/login');
            }
        });
    }, [navigate]);

    if (!isVerified) {
        // Verification in progress or failed, show a loading spinner or a message
        return <Loader />;
    }

    // Render the protected component if the token is verified
    return <>{element}</>;
};

export default ProtectedRoute;
