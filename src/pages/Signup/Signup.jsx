import {Box} from "@mui/material";
import {useState} from "react";
import {useSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";

import BasicDetails from "./components/BasicDetails";
import EmailPassword from "./components/EmailPassword";
import MainContainer from "../../components/MainContainer";
import {validateEmail} from "../../utils/validateEmail";
import {handleSignup} from "../../api/handleSignup";

const Index = () => {

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [description, setDescription] = useState("");

    const [current, setCurrent] = useState(0);
    const [loading,  setLoading] = useState(false);

    const handleClick = async () => {
        if (!validateEmail(email)) {
            enqueueSnackbar("Please enter a valid email", {
                variant: "error",
            });
            return;
        }
        try {
            setLoading(true);
            const { success, data, error } = await handleSignup(name, description, email, password);
            if (success) {
                enqueueSnackbar("Signup Successful", {
                    variant: "success",
                });
                navigate("/login")
            } else {
                enqueueSnackbar("Signup Unsuccessful: Invalid credentials", {
                    variant: "error",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <MainContainer current={current} setCurrent={setCurrent}>
                {
                    current === 0 && (
                        <BasicDetails
                            name={name}
                            setName={setName}
                            description={description}
                            setDescription={setDescription}
                            setCurrent={setCurrent}
                        />
                    )
                }
                {
                    current === 1 && (
                        <EmailPassword
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            confirmPassword={confirmPassword}
                            setConfirmPassword={setConfirmPassword}
                            loading={loading}
                            handleClick={handleClick}
                        />
                    )
                }

                <Box mt={5} display={'flex'} alignItems={'center'} width={'100%'} justifyContent={'center'}>
                    <Box color={'#333333'} fontSize={'12px'}>
                        Already have an account?
                    </Box>
                    <Box sx={{cursor: 'pointer'}} ml={0.5} fontWeight={500} fontSize={'14px'} color={'#006ff8'}
                         onClick={() => {
                             if(!loading)
                                 navigate('/login')
                         }}
                    >
                        LOGIN
                    </Box>

                </Box>
            </MainContainer>
        </>
    );
}

export default Index;
Index.layout = null;
Index.title = 'Sign up';
