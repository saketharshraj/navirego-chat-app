import {useEffect, useState} from "react";
import {Box, CircularProgress} from "@mui/material";

import {getAllChats} from "../../../api/getAllChats";

const AllChats = ({chats, setChats, current, setCurrent, chatLoading, setOpen}) =>  {

    const [allChatsLoading, setAllChatsLoading] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setAllChatsLoading(true);
                const response = await getAllChats();
                if (response.success) {
                    setChats(response.data)
                } else {
                    console.error('Error fetching data:', response.error);
                }
            } finally {
                setAllChatsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Box pt={8} width={"100%"} height={"100vh"} bgcolor={"black"}>
                <Box className="query-container" py={1} px={2}>
                    {
                        allChatsLoading && (
                            <Box width={'100%'} height={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                <CircularProgress color={"secondary"} size={28} />
                            </Box>
                        )
                    }
                    {
                        (chats?.length > 0) ? (
                            <>
                                {
                                    chats.map((each, index) => (
                                        <Box
                                            key={each._id}
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
                                                if(!chatLoading) setCurrent(each)
                                                // if(setOpen) setOpen(false)
                                            }}
                                            className="chat-title"
                                        >
                                            {each.title}
                                        </Box>
                                    ))
                                }
                            </>
                        ) : (
                            <>
                                {
                                    !allChatsLoading && (
                                        <Box width={'100%'} height={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} color={"#FFF"} textAlign={"center"}>
                                            Start a new chat
                                        </Box>
                                    )
                                }
                            </>
                        )
                    }
                </Box>
            </Box>
        </>
    );
}

export default AllChats;
