import {Box} from "@mui/material";
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined';

import {queryList} from "../../../constants/queryList";
const AllChats = ({chats, current, setCurrent, chatLoading, allChatsLoading, setOpen}) =>  {

    return (
        <>
            <Box pt={8} width={"100%"} height={"100vh"} bgcolor={"black"}>
                <Box className="query-container" py={1} px={2}>
                    {
                        queryList.map((each, index) => (
                            <Box
                                key={index}
                                width={"100%"} mb={0.5}
                                py={"8px"} px={"12px"}
                                borderRadius={"8px"}
                                color={"#FFF"}
                                sx={{
                                    cursor: "pointer",
                                    "&:hover": {
                                        backgroundColor: "hsla(0,0%,100%,.1)",
                                    },
                                }}
                                onClick={() => {
                                    // if(setOpen) setOpen(false)
                                }}
                                className="chat-title"
                            >
                                {each.query}
                            </Box>
                        ))
                    }
                </Box>
            </Box>
        </>
    );
}

export default AllChats;
