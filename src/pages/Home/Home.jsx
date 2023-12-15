import {useState, useEffect} from "react";
import {Grid, Hidden, Box, Container, TextField, IconButton} from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AddIcon from '@mui/icons-material/Add';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FileOpenIcon from '@mui/icons-material/FileOpen';

import Navbar from "../../components/Navbar";
import AllChats from "./components/AllChats";
import NewChatButton from "./components/NewChatButton";
import MessageInput from "./components/MessageInput";

const Home = () =>  {

    const [chats, setChats] = useState([])

    const [current, setCurrent] = useState(null)
    const [chatLoading, setChatLoading] = useState(false)

    const [query, setQuery] = useState("")
    const [filePath, setFilePath] = useState(null);


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
                        <Container maxWidth={"md"}>
                            <Box pt={8} width={"100%"} bgcolor={"red"}>
                                hello
                            </Box>
                        </Container>
                        <MessageInput
                            filePath={filePath}
                            setFilePath={setFilePath}
                        />
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default Home;
