import {Suspense, lazy, useEffect} from "react";
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {Box} from "@mui/material";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const Signup = lazy(() => import("./pages/Signup/Signup"));

function App() {

    const navigate = useNavigate();
    const location = useLocation();

    // Define an array of paths to check against
    const authenticatedPaths = ['/login', '/signup'];

    useEffect(() => {
        const token = localStorage.getItem('access-token');
        if (token && authenticatedPaths.includes(location.pathname)) {
            navigate('/');
        }
    }, [location]);

    return (
        <>
            <Box>
                <Suspense
                    fallback={
                        <Loader />
                    }
                >
                    <Routes>
                        <Route path='/login' element={<Login />} />
                        <Route path='/sign-up' element={<Signup />} />
                        <Route
                            path="/"
                            element={<ProtectedRoute element={<Home />} />}
                        />
                        {/*<Route path="*" element={<NotFound />} />*/}
                    </Routes>
                </Suspense>
            </Box>
        </>
    );
}

export default App;
