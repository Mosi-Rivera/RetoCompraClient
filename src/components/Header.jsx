import React, { useContext, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
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
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Modal from "./Modal/Modal";
import userContext, { newDefaultUserContextState } from "../contexts/userContext";
import MyForm from "./MyForm";
import SignIn from "./SignIn";
import DropdownMenuButton from "./DropdownMenuButton";
import { logout } from "../api/authRoutes";
import { grey } from "@mui/material/colors"
import { useTheme } from "@emotion/react";

const AuthenticatedNav = ({ firstName, lastName, role, handleLogout }) => {
    const buttons = [
        { content: <Typography>Account Details</Typography> },
        { content: <Typography>Order History</Typography> },
        { content: <Typography>Logout</Typography>, onClick: handleLogout },
    ];
    if (role === 'admin') {
        buttons.unshift({
            content: <Typography color={"red"}>Admin Dashboard</Typography>
        });
    }
    return (
        <nav style={{ display: "flex" }}>
            <DropdownMenuButton
                sx={{ color: "white", maxWidth: '150px' }}
                buttons={buttons}
                buttonContent={
                    <><AccountCircle /> <Typography textOverflow={"ellipsis"} overflow={"clip"} style={{ marginLeft: ".25rem", fontSize: "1rem" }}>{firstName}</Typography></>
                } />
        </nav>
    );
}

const NotAuthenticatedNav = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    return (
        <nav>
            <Modal
                open={showRegister}
                handleOpen={() => setShowRegister(true)}
                handleClose={() => setShowRegister(false)}
                buttonText="Register"
                title="Register"
                buttonSx={{ color: "white" }}
            >
                <MyForm />
            </Modal>
            <Modal
                open={showLogin}
                handleOpen={() => setShowLogin(true)}
                handleClose={() => setShowLogin(false)}
                buttonText="Login"
                title="Login"
                buttonSx={{ color: "white" }}
            >
                <SignIn />
            </Modal>
        </nav >
    );

}

const Header = (props) => {
    const theme = useTheme()

    console.log(theme.palette.searchBackground)

    const navigate = useNavigate();
    const { userInfo, setUserInfo } = useContext(userContext);
    const handleLogout = async () => {
        try {
            await logout();
            setUserInfo(newDefaultUserContextState());
        } catch (error) {
            console.log(error);
        }
    }

    const handleSearchSubmit = (e) => {
        
        console.log('im here!', e.target, e.code);
        const value = e.target.value;
        if (e.code != "Enter")
        {
            console.log("Not submit key.");
            return;
        }
        if (!value || value.length <= 2)
        {
            console.log('value is undefined or too short', value);
            return;
        }
        return navigate(`/search/${value}`);
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
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: "100%",
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '270ch',
            },
        },
    }));


    return (
        <header>
            <Box sx={{ flexGrow: 1 }} />
            <AppBar elevation={0} >
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}

                     <Box sx={{ marginLeft: 1 }} >
                        <NavLink to="/" style={{ margin: "0 1rem" }}>Men</NavLink>
                        <NavLink to="/men" style={{ margin: "0 1rem" }}>Men</NavLink>
                        <NavLink to="/women">Women</NavLink>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />


                    <NavLink to="/">
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Graphic Groove

                    </Typography>
                    </NavLink>

                    <Box sx={{ flexGrow: 1 }} />



                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={0} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        {/* <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={0} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton> */}
                    </Box>
                    <div>
                        {userInfo.isAuthenticated ?
                            <AuthenticatedNav handleLogout={handleLogout} role={userInfo.user.role} firstName={userInfo.user.firstName} lastName={userInfo.user.lastName} /> :
                            <NotAuthenticatedNav />
                        }
                        <div>
                            <Outlet />
                        </div>
                    </div>
                </Toolbar>
                <Box sx={{backgroundColor: theme.palette.searchBackground.main}}>
                    <Search sx={{width: "100%"}}>
                        <SearchIconWrapper color="black"  > 
                            <SearchIcon color="primary" />
                        </SearchIconWrapper>
                        <StyledInputBase onKeyDown={handleSearchSubmit} fullWidth sx={{ backgroundColor: "transparent", color: "black", width: "100%"}}
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </Box>
            </AppBar>
        </header >
    )
}

export default Header;
