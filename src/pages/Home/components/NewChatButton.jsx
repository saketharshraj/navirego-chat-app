import {Box} from "@mui/material";
import Logo from "../../../assets/logo-light.png";

import EditNoteIcon from '@mui/icons-material/EditNote';

const NewChatButton = ({setCurrent, setModal}) =>  {

    return (
        <>
            <Box p={2} width={"100%"} position={"absolute"} top={0} left={0}>
                <Box
                    width={"100%"} py={"8px"} px={"12px"}
                    borderRadius={"8px"} color={"#FFF"}
                    sx={{
                        cursor: "pointer",
                        backgroundColor: "hsla(0,0%,100%,.1)",
                        "&:hover": {
                            backgroundColor: "hsla(0,0%,100%,.1)",
                        },
                    }}
                    onClick={() => {
                        setCurrent({})
                        if(setModal) setModal(false)
                    }}
                    className="chat-title"
                    display={"flex"} alignItems={'center'} justifyContent={'space-between'}
                >
                    <Box display={"flex"} alignItems={'center'}>
                        <img src={Logo} width={'25px'} alt='Logo' />
                        <Box ml={2}>New Chat</Box>
                    </Box>
                    <EditNoteIcon />
                </Box>
            </Box>
        </>
    );
}

export default NewChatButton;
