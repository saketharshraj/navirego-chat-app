import {Box, Avatar, Menu, MenuItem, Dialog, Hidden} from "@mui/material";
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import {useLocation, useNavigate} from "react-router-dom";

import Logo from '../assets/logo-dark.png'
import Profile from '../assets/profile.jpg'
import {useRef, useState} from "react";
import {navbarMenu} from "../constants/navbarMenu";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import AllFiles from "../pages/Home/components/AllFiles";
import NewChatButton from "../pages/Home/components/NewChatButton";
import AllChats from "../pages/Home/components/AllChats";


const Navbar = ({chats, setChats, current, setCurrent, chatLoading}) =>  {

    const navigate = useNavigate();
    const location = useLocation();

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleCloseMenu = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event?.target)) {
            return;
        }
        setOpen(false);
    };


    const [modal, setModal] = useState(false);
    const handleClickOpen = () => {
        setModal(true);
    };
    const handleClose = () => {
        setModal(false);
    };

    return (
        <>
            <Box zIndex={1000} bgcolor={"hsla(0,0%,100%,.95)"} p={2} pb={1} display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={"100%"} position={"absolute"} top={0} left={0}>
                <Box display={'flex'} alignItems={'center'}>
                    <img src={Logo} width={'30px'} />
                    <Box fontWeight={550} fontSize={'18px'} ml={1}>
                        Navirego Chat
                    </Box>
                </Box>

                <Box display={"flex"} alignItems={"center"}>
                    <Hidden mdUp>
                        <IconButton onClick={handleClickOpen}>
                            <ChatOutlinedIcon color={"secondary"} />
                        </IconButton>
                    </Hidden>
                    <AllFiles current={current} />
                    <Box ml={{xs: 2, md: 4}} ref={anchorRef} onClick={handleToggle}>
                        <Avatar src={Profile} alt={'Profile'} sx={{background: '#2026d2'}} />
                    </Box>
                    <Menu
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        anchorEl={anchorRef.current}
                        open={open}
                        onClose={handleCloseMenu}
                        sx={{
                            "& .MuiPaper-root": {
                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.25)",
                                borderRadius: "15px 0px 15px 15px",
                            },
                        }}
                    >
                        {
                            navbarMenu.map((each) => (
                                <MenuItem
                                    key={each}
                                    sx={{
                                        py: 1,
                                        fontSize: "14px",
                                    }}
                                >
                                    {each}
                                </MenuItem>
                            ))
                        }
                        <MenuItem
                            sx={{ py: 1, color: "red", fontSize: "14px" }}
                            onClick={ () => {
                                localStorage.removeItem("access-token")
                                navigate("/login")
                            }}
                        >
                            Log Out
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>

            <Dialog
                fullScreen
                open={modal}
                onClose={handleClose}
            >
                <Box width={"100%"} position={"relative"}>
                    <Box position={"absolute"} top={"5px"} right={"5px"}>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <NewChatButton setCurrent={setCurrent} setModal={setModal} />
                    <AllChats
                        chats={chats} setChats={setChats}
                        current={current} setCurrent={setCurrent}
                        chatLoading={chatLoading} setModal={setModal}
                    />

                </Box>

            </Dialog>
        </>
    );
}

export default Navbar;
