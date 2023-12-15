import {Box, Avatar, Menu, MenuItem} from "@mui/material";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import {useLocation, useNavigate} from "react-router-dom";

import Logo from '../assets/logo-dark.png'
import Profile from '../assets/profile.jpg'
import {useRef, useState} from "react";
import {navbarMenu} from "../constants/navbarMenu";

const Navbar = () =>  {

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

    return (
        <>
            <Box bgcolor={"hsla(0,0%,100%,.95)"} p={2} pb={1} display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={"100%"} position={"absolute"} top={0} left={0}>
                <Box display={'flex'} alignItems={'center'}>
                    <img src={Logo} width={'30px'} />
                    <Box fontWeight={550} fontSize={'18px'} ml={1}>
                        Navirego Chat
                    </Box>
                </Box>

                <Box display={"flex"} alignItems={"center"}>
                    <FileOpenIcon color={"secondary"} />
                    <Box ml={4} ref={anchorRef} onClick={handleToggle}>
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
        </>
    );
}

export default Navbar;
