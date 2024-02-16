import React, { useContext, useState } from "react";
// import "../styles/Header.css"
import { Outlet } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Modal from "./Modal/Modal";
import userContext, { newDefaultUserContextState } from "../contexts/userContext";
import MyForm from "./MyForm";
import SignIn from "./SignIn";
import DropdownMenuButton from "./DropdownMenuButton";
import { logout } from "../api/authRoutes";
import { Button, Link } from "@mui/material";

const AuthenticatedNav = ({firstName, lastName, role, handleLogout}) => {
    const buttons = [
        {content: <Typography>Account Details</Typography>},
        {content: <Typography>Order History</Typography>},
        {content: <Typography>Logout</Typography>, onClick: handleLogout},
    ];
    if (role === 'admin') {
        buttons.unshift({
            content: <Typography color={"red"}>Admin Dashboard</Typography>
        });
    }
    return (
        <nav style={{display: "flex"}}>
            <DropdownMenuButton 
                sx={{color: "black", maxWidth: '150px'}}
                buttons={buttons}
                buttonContent={
                    <><AccountCircle /> <Typography textOverflow={"ellipsis"} overflow={"clip"} style={{marginLeft: ".25rem", fontSize: "1rem"}}>{firstName}</Typography></>
            }/>
        </nav>
    );
}

const NotAuthenticatedNav = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const openLogin = () => {
        setShowRegister(false);
        setShowLogin(true);
    }
    const openRegister = () => {
        setShowRegister(true);
        setShowLogin(false);
    }
    return (
        <nav>
            <Box sx={{ display:'flex' }}>
                <Modal
                    titleSx={{paddingBottom: "0px"}}
                    open={showRegister} 
                    handleOpen={openRegister}
                    handleClose={() => setShowRegister(false)}
                    buttonText="Register"
                    title="Register"
                    buttonSx={{color: "black"}}
                >
                    <MyForm/>
                    <div>
                        <Typography marginTop={2}>
                            Already have an account? <Link sx={{cursor: "pointer"}} onClick={openLogin}>Sign In</Link>
                        </Typography>
                    </div>
                </Modal>
                <Modal
                    titleSx={{paddingBottom: "0px"}}
                    open={showLogin}
                    handleOpen={openLogin}
                    handleClose={() => setShowLogin(false)}
                    buttonText="Login"
                    title="Login"
                    buttonSx={{color: "black"}}
                >
                    <SignIn/>
                    <div>
                        <Typography marginTop={2}>
                            Don't have an account? <Link sx={{cursor: "pointer"}} onClick={openRegister}>Register</Link>
                        </Typography>
                    </div>
                </Modal>
            </Box>
        </nav >
    );
    
}

const Header = (props) => {
    const {userInfo, setUserInfo} = useContext(userContext);
    const handleLogout = async () => {
        try {
            await logout();
            setUserInfo(newDefaultUserContextState());
        } catch (error) {
            console.log(error);
        }
    }
    
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(3),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: "pointer"
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '50ch',
            },
        },
    }));


    return (
        <header>
            <Box sx={{ flexGrow: 1 }} />
            <AppBar color="inherit" sx={{boxShadow: "none", borderBottom: "1px solid #e1e1e1"}}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Clothing Store
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: {xs: 'none', sm: 'flex'} }} />
                    <IconButton size="large" color="inherit" sx={{display: {xs: 'flex', sm: 'none'}}}>
                        <SearchIcon />
                    </IconButton>
                    <Search sx={{display: { xs: 'none', sm: 'flex' }, border: "1px solid black"}}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase 
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ display: "flex" }}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge /*badgeContent={4}*/ color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </Box>
                    <div>
                        { userInfo.isAuthenticated ?
                            <AuthenticatedNav handleLogout={handleLogout} role={userInfo.user.role} firstName={userInfo.user.firstName} lastName={userInfo.user.lastName}/> :
                            <NotAuthenticatedNav/>
                        }
                        <div>
                            <Outlet />
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </header >
    )
}

export default Header;
