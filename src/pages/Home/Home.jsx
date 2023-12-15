import {useEffect, useState} from "react";
import {Grid, Hidden, Box, Container} from "@mui/material";

import Navbar from "../../components/Navbar";
import AllChats from "./components/AllChats";
import NewChatButton from "./components/NewChatButton";
import MessageInput from "./components/MessageInput";
import Messages from "./components/Messages";

const Home = () =>  {

    const [chats, setChats] = useState([])

    const [current, setCurrent] = useState(null)
    const [chatLoading, setChatLoading] = useState(false)

    useEffect(() => {
        console.log(current)
    }, [current]);

    return (
        <>
            <Grid container spacing={0} height={'auto'}>
                <Hidden mdDown>
                    <Grid item xs={0} md={2.5}>
                        <Box width={"100%"} height={"100vh"} position={"relative"}>
                            <NewChatButton />
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
                        <Navbar />
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
