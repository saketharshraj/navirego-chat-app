import {useState, useEffect} from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import {Avatar, Box, Container, Skeleton} from "@mui/material";
import {getAllMessages} from "../../../api/getMessages";
import Profile from "../../../assets/profile.jpg";
import Bot from "../../../assets/logo-light.png";
import MessageInput from "./MessageInput";
import ChatLoader from "./ChatLoader";
import {botId} from "../../../utils/base";

const Messages = ({current, chatLoading, setChatLoading}) =>  {

    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);
    const [messageList, setMessageList] = useState([]);
    const [messageListLength, setMessageListLength] = useState(0);
    const [totalMessageLength, setTotalMessageLength] = useState(null);


    const [isSending, setIsSending] = useState(false);


    const limit = 10;

    const fetchData = async (initial) => {
        if (!current?._id) {
            setHasMore(false);
            return;
        }

        try {
            setChatLoading(true);
            const response = await getAllMessages(current?._id, initial ? 0 :offset, limit);

            if (response.success) {
                if(initial){
                    setMessageList([...response?.data?.data]);
                    setOffset(0 + response.data.data.length);
                    setTotalMessageLength(response.data.total);
                    setHasMore(0 + response.data.data.length <= response.data.total);
                    setMessageListLength(0 + response.data.data.length)
                } else {
                    setMessageList((prevList) => [...prevList, ...response?.data?.data]);
                    setOffset(offset + response.data.data.length);
                    setTotalMessageLength(response.data.total);
                    setHasMore(messageListLength + response.data.data.length <= response.data.total);
                    setMessageListLength(messageListLength + response.data.data.length)
                }
            } else {
                console.error('Error fetching messages:', response.error);
            }
        } finally {
            setChatLoading(false);
        }
    };

    useEffect(() => {
        setOffset(0);
        setChatLoading(false)
        setTotalMessageLength(null);
        setMessageListLength(0);
        setMessageList([]);
        setHasMore(true);
        fetchData(true)
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
                    pt={{xs: 10, md: 8}} pb={{xs: 10, md: 15}} px={{xs: 2, md: 4}}
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
                    {
                        chatLoading && <ChatLoader />
                    }
                    {
                        messageListLength > 0 ? (
                            <InfiniteScroll
                                dataLength={messageList.length}
                                next={fetchMoreData}
                                hasMore={hasMore}
                                loader={""}
                                style={{ display: 'flex', flexDirection: 'column-reverse' }}
                                inverse={true}
                                scrollableTarget="scrollableDiv"
                            >
                                {
                                    isSending && (
                                        <Box mb={3} pr={2} width={"100%"} display={"flex"} alignItems={"center"}>
                                            <Skeleton animation="wave" variant="circular" width={40} height={40} />
                                            <Box ml={1.5} />
                                            <Skeleton animation="wave" variant="rounded" width={100} height={30} />
                                        </Box>
                                    )
                                }
                                {messageList?.map((message, index) => (
                                    <Box key={`${index}${message?.createdAt}`} mb={5} width={"100%"} display={"flex"}>
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
                        ) : (
                            <>
                                {
                                    !current?._id && (
                                        <Box px={4} width={"100%"} height={"100vh"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                                            <Box p={2} width={"70"} height={"70px"} borderRadius={"35px"} display={"flex"} alignItems={"center"} justifyContent={"Center"} bgcolor={"#000"}>
                                                <img src={Bot} width={'40px'} />
                                            </Box>
                                            <Box fontWeight={700} fontSize={"24px"} mt={2} textAlign={"center"}>
                                                How can I help you today?
                                            </Box>
                                        </Box>
                                    )
                                }

                            </>
                        )
                    }

                </Box>
            </Container>

            <MessageInput
                current={current} setIsSending={setIsSending} messageListLength={messageListLength} setMessageList={setMessageList} setMessageListLength={setMessageListLength} setTotalMessageLength={setTotalMessageLength}
            />
        </>
    );
}

export default Messages;



