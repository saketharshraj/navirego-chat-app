import {Box, Button} from "@mui/material";
import CustomTextField from "../../../components/CustomTextField";

const BasicDetails = ({name, setName, description, setDescription, setCurrent}) => {

    return (
        <>
            <Box fontSize={'24px'} fontWeight={500}>
                Sign Up
            </Box>
            <Box color={'#333333'} fontSize={'12px'}>
                Enter your name & description for your account.
            </Box>
            <Box mt={5} />
            <CustomTextField
                page={'login'}
                label={"Enter your name"}
                type={"text"}
                value={name}
                onChange={(event) => {
                    setName(event.target.value);
                }}
            />
            <Box mt={2} />
            <CustomTextField
                page={'login'}
                label={"Enter a description"}
                type={"text"}
                value={description}
                onChange={(event) => {
                    setDescription(event.target.value);
                }}
            />
            <Box mt={2} />

            <Box mt={4} />
            <Button
                disabled={name === '' || description === ''}
                onClick={() => {
                    setCurrent(1)
                }}
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
                Next
            </Button>
        </>
    );
}

export default BasicDetails;
