import { useState} from "react";
import {Grid, Hidden, Box} from "@mui/material";

import Navbar from "../../components/Navbar";
import AllChats from "./components/AllChats";
import NewChatButton from "./components/NewChatButton";
import Messages from "./components/Messages";

const Home = () =>  {

    const [chats, setChats] = useState([])

    const [current, setCurrent] = useState({})
    const [chatLoading, setChatLoading] = useState(false)

    return (
        <>
            <Grid container spacing={0} height={'auto'}>
                <Hidden mdDown>
                    <Grid item xs={0} md={2.5}>
                        <Box width={"100%"} height={"100vh"} position={"relative"}>
                            <NewChatButton setCurrent={setCurrent} />
                            <AllChats
                                chats={chats} setChats={setChats}
                                current={current} setCurrent={setCurrent}
                                chatLoading={chatLoading}
                            />
                        </Box>
                    </Grid>
                </Hidden>

                <Grid item xs={12} md={9.5}>
                    <Box width={"100%"} height={"100vh"} position={"relative"}>
                        <Navbar
                            chats={chats} setChats={setChats}
                            current={current} setCurrent={setCurrent}
                            chatLoading={chatLoading}
                        />
                        <Messages
                            current={current}
                            chatLoading={chatLoading} setChatLoading={setChatLoading}
                        />
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default Home;
