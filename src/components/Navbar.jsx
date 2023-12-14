import {AppBar, Box, Avatar, Hidden, Menu, MenuItem} from "@mui/material";
import {Link, useLocation, useNavigate} from "react-router-dom";

import Logo from '../assets/atlan-logo.svg'
import Profile from '../assets/profile.jpg'
import { navbarLinks } from '../constants/navbarLinks'
import {useRef, useState} from "react";

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
            <AppBar
                color={"transparent"}
                elevation={0}
                // position="fixed"
                sx={{
                    background: location.pathname === '/' ? 'transparent' : '#e5e5e5',
                }}
            >
                <Box py={1.3} px={2} display={'flex'} alignItems={'center'} justifyContent={'space-between'} >
                    <Link to={'/'}>
                        <img src={Logo} alt={'Atlan logo'} height={'35px'} width={'auto'} />
                    </Link>

                    <Box display={'flex'} alignItems={'center'}>
                        <Hidden mdDown>
                            {
                                navbarLinks.map((each, index) => (
                                    <Link to={each.link} key={index} target={each?.target} style={{textDecoration: "none"}}>
                                        <Box
                                            ml={3} color={location.pathname === each.link ? "#f05" : "#2026d2"}
                                            fontSize={'16px'} fontWeight={600}
                                            sx={{
                                                "&:hover": {
                                                    color: "#f05",
                                                },
                                            }}
                                        >
                                            {each.title}
                                        </Box>
                                    </Link>
                                ))
                            }
                        </Hidden>
                        <Box ref={anchorRef} onClick={handleToggle}>
                            <Avatar src={Profile} alt={'Profile'} sx={{background: '#2026d2', marginLeft: "80px"}} />
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
                                    backgroundColor: "#000"
                                },
                            }}
                        >
                            <MenuItem sx={{ py: 1, color: "#FFF", fontSize: "14px", "&:hover": {
                                    backgroundColor: "hsla(0,0%,100%,.1)",
                                }, }}>FAQ</MenuItem>
                            {/*<MenuItem sx={{ py: 1, color: "#FFF", fontSize: "14px" }}>Support</MenuItem>*/}
                            <MenuItem sx={{ py: 1, color: "#FFF", fontSize: "14px" }}>About Us</MenuItem>
                            <MenuItem sx={{ py: 1, color: "#FFF", fontSize: "14px" }}>Privacy Policy</MenuItem>
                            <MenuItem sx={{ py: 1, color: "#FFF", fontSize: "14px" }}>Term & Conditions</MenuItem>
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
            </AppBar>
        </>
    );
}

export default Navbar;
