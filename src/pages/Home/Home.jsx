import {useState, useEffect} from "react";
import {Grid, Hidden, Box} from "@mui/material";

import Navbar from "../../components/Navbar";
import AllChats from "./components/AllChats";
import Logo from "../../assets/logo-light.png";

import EditNoteIcon from '@mui/icons-material/EditNote';

const Home = () =>  {

    const [chats, setChats] = useState([])

    const [current, setCurrent] = useState(null)
    const [allChatsLoading, setAllChatsLoading] = useState(false);
    const [chatLoading, setChatLoading] = useState(false)

    return (
        <>
            {/*<Navbar />*/}
            <Grid container spacing={0} height={'auto'}>
                <Hidden mdDown>
                    <Grid item xs={0} md={3}>
                        <Box width={"100%"} position={"relative"}>
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
                                        // if(setOpen) setOpen(false)
                                    }}
                                    className="chat-title"
                                    display={"flex"} alignItems={'center'} justifyContent={'space-between'}
                                >
                                    <Box display={"flex"} alignItems={'center'}>
                                        <img src={Logo} width={'25px'} />
                                        <Box ml={2}>New Chat</Box>
                                    </Box>
                                   <EditNoteIcon />
                                </Box>
                            </Box>
                            <AllChats
                                p={1} br={"12px"} height={"calc(100vh - 130px)"}
                                chats={chats} allChatsLoading={allChatsLoading}
                                current={current} setCurrent={setCurrent}
                                chatLoading={chatLoading}
                            />
                        </Box>

                    </Grid>
                </Hidden>

                <Grid item xs={12} md={9}>
                    <Box width={"100%"} position={"relative"}>
                        <Navbar />
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default Home;
