import {useEffect, useState} from "react";
import { useSnackbar } from "notistack";

//MUI
import {Box, Button, CircularProgress} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useNavigate} from "react-router-dom";
import MainContainer from "../../components/MainContainer";
import CustomTextField from "../../components/CustomTextField";
import {handleLogin} from "../../api/handleLogin";
import {validateEmail} from "../../utils/validateEmail";

const Login = () => {

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [isVisible, setIsVisible] = useState(false);
    const [loading,  setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = async () => {
        if (!validateEmail(email)) {
            enqueueSnackbar("Please enter a valid email", {
                variant: "error",
            });
            return;
        }
        try {
            setLoading(true);
            // const { success, data, error } = await handleLogin(email, password);

            let success = true;

            if (success) {
                // console.log(data);
                localStorage.setItem("access-token", "abab")

                // Handle success (e.g., redirect user or update state)
                enqueueSnackbar("Login Successful", {
                    variant: "success",
                });
                navigate("/")
            } else {
                enqueueSnackbar("Login Unsuccessful: Invalid credentials", {
                    variant: "error",
                });
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <MainContainer current={0}>
                <Box fontSize={'24px'} fontWeight={500}>
                    Login to your account.
                </Box>
                <Box color={'#333333'} fontSize={'12px'}>
                    Enter your registered email ID and password.
                </Box>
                <Box mt={5} />
                <CustomTextField
                    page={'login'}
                    label={"Enter email id"}
                    type={"email"}
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                />
                <Box mt={2} />
                <CustomTextField
                    page={'login'}
                    label={"Enter password"}
                    type={isVisible ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                    endAdornment={
                        password === "" ? (<></>) : (
                            <IconButton
                                onClick={()=>{
                                    setIsVisible(!isVisible)
                                }}
                            >
                                {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                        )
                    }
                />
                <Box mt={4} />
                <Button
                    disabled={email === '' || password === '' || loading}
                    onClick={handleClick}
                    disableElevation
                    variant={"contained"}
                    fullWidth
                    sx={{
                        backgroundColor: "#268AFF",
                        color: "#FFF",
                        borderRadius: "15px",
                        zIndex: 2,
                        py: 1.5,
                        "&:hover": {
                            backgroundColor: "#006ff8",
                        },
                        textTransform: 'none'
                    }}
                >
                    {
                        loading ? <CircularProgress color={'info'} size={23.2}/> : "Login"
                    }
                </Button>
                <Box mt={5} display={'flex'} alignItems={'center'} width={'100%'} justifyContent={'center'}>
                    <Box color={'#333333'} fontSize={'12px'}>
                        Don’t have an account?
                    </Box>
                    <Box sx={{cursor: 'pointer'}} mr={0.5} ml={0.5} fontWeight={500} fontSize={'14px'} color={'#006ff8'}
                         onClick={ () => {
                             if(!loading)
                                 navigate('/sign-up')
                         }}
                    >
                        SIGNUP
                    </Box>
                </Box>
            </MainContainer>
        </>
    );
}
export default Login;
// Index.title = 'Login';
