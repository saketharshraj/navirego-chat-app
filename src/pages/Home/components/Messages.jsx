import {useState, useEffect} from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import {Avatar, Box, Container} from "@mui/material";
import {getAllMessages} from "../../../api/getMessages";
import Profile from "../../../assets/profile.jpg";
import Bot from "../../../assets/logo-light.png";
import MessageInput from "./MessageInput";

const Messages = ({current, chatLoading, setChatLoading}) =>  {

    const botId = "657b1e8411b71728f5db6769";

    const [hasMore, setHasMore] = useState(true);
    const [chatId, setChatId] = useState("657baa7a3b5b3dbc641e6646");
    const [messageList, setMessageList] = useState([]);
    const [messageListLength, setMessageListLength] = useState(0);
    const [totalMessageLength, setTotalMessageLength] = useState(null);

    const offset = 0;
    const limit = 10;

    const fetchData = async (offset, limit) => {
        try {
            setChatLoading(true);
            const response = await getAllMessages(chatId, offset, limit);
            if (response.success) {
                setMessageList((prevList) => [...prevList, ...response?.data]);
                setMessageListLength(response.data.length);
                setTotalMessageLength(response.total);
            } else {
                console.error('Error fetching messages:', response.error);
            }
        } finally {
            setChatLoading(false);
        }
    };

    useEffect(() => {
        fetchData(offset, limit);
    }, []);

    const fetchMoreData = () => {
        const newOffset = offset + limit;
        if (messageListLength < limit || totalMessageLength === messageList.length) {
            setHasMore(false);
        } else {
            fetchData(newOffset, limit);
        }
    };

    return (
        <>
            <Container maxWidth={"md"}>
                <Box pt={8} pb={15} px={4} width={"100%"} height={"100vh"} display={"flex"} flexDirection={"column"} justifyContent={"flex-end"}>
                    <InfiniteScroll
                        dataLength={messageList.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                    >
                        {/*{messageList.map((message, index) => (*/}
                        {/*    <div key={message.index}>{message.message}</div>*/}
                        {/*))}*/}

                        <Box mb={5} width={"100%"} display={"flex"} justifyContent={"space-between"}>
                            <Avatar src={Profile} alt={'Profile'} sx={{background: '#2026d2', width: 30, height: 30}} />
                            <Box ml={1.5}>
                                <Box pt={0.3} pb={0.5} fontWeight={700}>
                                    You
                                </Box>
                                <Box fontWeight={500}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse est, eum! Consequatur cum numquam, quasi quidem repellat sint? Accusamus corporis ex explicabo minus, neque omnis placeat repudiandae sed veritatis voluptates!
                                </Box>
                            </Box>
                        </Box>

                        <Box mb={5} width={"100%"} display={"flex"} justifyContent={"space-between"}>
                            <Box pt={1} pb={0.95} pl={1.25} pr={1.3} width={"30px"} height={"30px"} borderRadius={"15px"} display={"flex"} alignItems={"center"} justifyContent={"Center"} bgcolor={"#000"}>
                                <img src={Bot} width={'17px'} />
                            </Box>
                            <Box ml={1.5}>
                                <Box pt={0.3} pb={0.5} fontWeight={700}>
                                    Navirego Bot
                                </Box>
                                <Box fontWeight={500}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse est, eum! Consequatur cum numquam, quasi quidem repellat sint? Accusamus corporis ex explicabo minus, neque omnis placeat repudiandae sed veritatis voluptates!
                                </Box>
                            </Box>
                        </Box>
                    </InfiniteScroll>
                </Box>
            </Container>


            <MessageInput

            />
        </>
    );
}

export default Messages;
