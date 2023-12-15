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
    const [offset, setOffset] = useState(0);
    const [messageList, setMessageList] = useState([]);
    const [messageListLength, setMessageListLength] = useState(0);
    const [totalMessageLength, setTotalMessageLength] = useState(null);

    const limit = 10;

    const fetchData = async () => {
        if (!current?._id) {
            setHasMore(false);
            return;
        }

        try {
            setChatLoading(true);
            const response = await getAllMessages(current?._id, offset, limit);

            if (response.success) {
                setMessageList((prevList) => [...prevList, ...response?.data?.data]);
                setTotalMessageLength(response.data.total);
                setOffset(offset + response.data.data.length);
                setHasMore(messageListLength + response.data.data.length <= response.data.total);
                setMessageListLength(messageListLength + response.data.data.length)
            } else {
                console.error('Error fetching messages:', response.error);
            }
        } finally {
            setChatLoading(false);
        }
    };

    useEffect(() => {
        setOffset(0);
        setTotalMessageLength(null);
        setMessageListLength(0);
        setMessageList([]);
        setHasMore(true);
        fetchData()
    }, [current]);

    const fetchMoreData = () => {
        if (messageListLength >= totalMessageLength) {
            setHasMore(false);
        } else {
            fetchData();
        }
    };

    return (
        <>
            <Container maxWidth={"md"}>
                <Box
                    pt={8} pb={15} px={4}
                    width={"100%"} height={"100vh"}
                    display={'flex'} flexDirection={'column-reverse'}
                    sx={{
                        scrollBehavior: "smooth",
                        overflowY: "scroll",
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        }
                    }}
                    id="scrollableDiv"
                >
                    <InfiniteScroll
                        dataLength={messageList.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                        style={{ display: 'flex', flexDirection: 'column-reverse' }}
                        inverse={true}
                        scrollableTarget="scrollableDiv"
                    >
                        {messageList.map((message, index) => (
                            <Box mb={5} width={"100%"} display={"flex"}>
                                {
                                    message?.createdBy === botId ? (
                                        <Box pt={1} pb={0.95} pl={1.25} pr={1.3} width={"30px"} height={"30px"} borderRadius={"15px"} display={"flex"} alignItems={"center"} justifyContent={"Center"} bgcolor={"#000"}>
                                            <img src={Bot} width={'17px'} />
                                        </Box>
                                    ) : (
                                        <Avatar src={Profile} alt={'Profile'} sx={{background: '#2026d2', width: 30, height: 30}} />
                                    )
                                }
                                <Box ml={1.5}>
                                    <Box pt={0.3} pb={0.5} fontWeight={700}>
                                        {
                                            message.createdBy === botId ? "Navirego Bot" : "You"
                                        }
                                    </Box>
                                    <Box fontWeight={500}>
                                        {message?.message}
                                    </Box>
                                    {
                                        message?.fileUrl && (
                                            <img src={message.fileUrl} alt={"img"} style={{maxWidth: "100%", marginTop: "10px"}} />
                                        )
                                    }
                                </Box>
                            </Box>
                        ))}

                    </InfiniteScroll>
                </Box>
            </Container>


            <MessageInput
                current={current} messageListLength={messageListLength} setMessageList={setMessageList} setMessageListLength={setMessageListLength} setTotalMessageLength={setTotalMessageLength}
            />
        </>
    );
}

export default Messages;



