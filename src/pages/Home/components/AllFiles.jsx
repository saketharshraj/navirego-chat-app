import {Avatar, Box, CircularProgress, Dialog, Grid, useMediaQuery} from "@mui/material";
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import {useEffect, useState} from "react";

import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import {getAllFiles} from "../../../api/getAllFiles";
import {useSnackbar} from "notistack";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Bot from "../../../assets/logo-light.png";
import Profile from "../../../assets/profile.jpg";


const AllFiles = ({current}) =>  {

    const { enqueueSnackbar } = useSnackbar();

    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const handleClickOpen = () => {
        fetchData();
    };
    const handleClose = () => {
        setModal(false);
    };

    useEffect(() => {
        setFiles([])
    }, [current]);

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await getAllFiles(current?._id);

            if (response.success && response.data.length > 0) {
                setModal(true)
                setFiles(response.data);
            } else {
                enqueueSnackbar("No files found in this chat", {
                    variant: "info",
                });
            }
        } catch (error) {
            console.error('Error fetching files:', error);
        } finally {
            setLoading(false);
        }
    };

    // const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));


    return (
        <>
            <IconButton onClick={handleClickOpen} disabled={!current?._id}>
                {
                    loading ? <CircularProgress color={'secondary'} size={23.2}/> : <FileOpenOutlinedIcon color={"secondary"} />
                }
            </IconButton>

            <Dialog
                // fullScreen
                maxWidth={"md"}
                open={modal}
                onClose={handleClose}
            >
                <Box
                    px={3}
                    py={3}
                    bgcolor={"#FFF"}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    width={"700px"}
                >
                    <Box
                        width={"100%"}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box fontWeight={600} fontSize={'24px'}>
                            Files
                        </Box>
                        <IconButton onClick={handleClose}>
                            <CloseIcon sx={{color: 'red'}} />
                        </IconButton>
                    </Box>
                    <Box width={"100%"} mt={4}>
                        <Grid container spacing={4}>
                            {files.filter(file => file.fileUrl)?.map((each, index) => (
                                <Grid key={index} item xs={6} md={4} height={"100%"}>
                                    <a target={"_blank"} href={each.fileUrl}>
                                        <img src={each.fileUrl} alt={"img"} style={{width: "100%"}} />
                                    </a>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>

            </Dialog>
        </>
    );
}

export default AllFiles;
