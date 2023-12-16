import {useState, useRef, useEffect} from "react";
import {Box, Container, TextField, IconButton, CircularProgress, Chip} from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {useSnackbar} from "notistack";
import {uploadFile} from "../../../api/uploadFile";
import {sendMessage} from "../../../api/sendMessage";
const MessageInput = ({current, setIsSending, messageListLength, setMessageList, setMessageListLength, setTotalMessageLength}) =>  {

    const { enqueueSnackbar } = useSnackbar();

    const [query, setQuery] = useState("")
    const [filePath, setFilePath] = useState(null);
    const [chatId, setChatId] = useState(current?._id || "");

    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState('');
    const [loading, setLoading] = useState(false)

    const handleDelete = () => {
        setFileName('');
        setFilePath(null)
    };

    useEffect(() => {
        setChatId(current?._id || "");
        setQuery("");
        handleDelete()
    }, [current]);

    const handleFileChange = () => {
        fileInputRef.current.click();
    };

    const handleFileInputChange = async  (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFileName(selectedFile.name);
            try {
                setLoading(true);
                const uploadResult = await uploadFile(selectedFile);

                setFilePath(uploadResult.data.path[0])

                if (!uploadResult.success) {
                    enqueueSnackbar("Something went wrong.", {
                        variant: "error",
                    });
                }
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSendMessage = async () => {

        const userInput = {
            message: query,
            messageType: filePath === null ? 120 : (query === "") ? 121 : 122,
            fileUrl: filePath,
        }

        setQuery("");

        setMessageList((prevList) =>
            [userInput, ...prevList]
        );

        try {
            setLoading(true);
            setIsSending(true)
            const messageResult = await sendMessage(
                query,
                filePath === null ? 120 : (query === "") ? 121 : 122,
                chatId,
                filePath
            );

            if((!chatId.length > 0)) setChatId(messageResult.data.chatId)

            setTotalMessageLength(messageResult.data.messagesCount);
            setMessageListLength(messageListLength + 2);

            const { botResponse, ...userMessage } = messageResult.data;
            setMessageList((prevList) =>
                [botResponse, ...prevList]
            );

            if (!messageResult.success) {
                enqueueSnackbar('Failed to send message.', {
                    variant: 'error',
                });
            }
        } finally {
            setLoading(false);
            setIsSending(false);
        }
        handleDelete();
    };

    return (
        <>
            <Box width={"100%"} position={"absolute"} bottom={0} left={0} sx={{backgroundColor: "#FFF"}}>
                <Container maxWidth={"md"}>
                    <Box width={"100%"} textAlign={"center"}>
                        <input
                            type="file"
                            ref={fileInputRef}
                            // accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileInputChange}
                        />
                        <TextField
                            value={query}
                            onChange={(event) => {
                                setQuery(event.target.value);
                            }}
                            onKeyDown={(event) => {
                                if((query.length === 0 && filePath === null) || loading) return;
                                if (event.key === 'Enter') handleSendMessage()
                            }}
                            color={"secondary"}
                            multiline
                            variant="outlined"
                            placeholder={"Message Navirego Chat "}
                            InputProps={{
                                endAdornment: (
                                    <Box display={"flex"} alignItems={"flex-end"}>
                                        {
                                            (filePath !== null && fileName.length > 0) ? (
                                                <Chip label={fileName} variant={"outlined"} onDelete={handleDelete} />
                                            ) : (
                                                <IconButton onClick={handleFileChange} disabled={loading}>
                                                    {
                                                        (loading && fileName) ? <CircularProgress color={'secondary'} size={23.2}/> : <AttachFileIcon color={"secondary"} />
                                                    }
                                                </IconButton>
                                            )
                                        }

                                        <IconButton onClick={handleSendMessage} disabled={(query.length === 0 && filePath === null) || loading}>
                                            <ArrowUpwardIcon color={"secondary"} />
                                        </IconButton>
                                    </Box>
                                ),
                                style: {
                                    fontSize: "15px",
                                    borderRadius: "16px",
                                    paddingTop: "8px",
                                    paddingBottom: "7px",
                                },
                            }}
                            fullWidth
                        />
                        <Box color={"rgb(86,88,105)"} fontSize={"12px"} my={{xs: 1, md: 2}}>
                            Chatbot responses are generated by AI and may not always be accurate.
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default MessageInput;
