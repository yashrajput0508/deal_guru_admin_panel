import { AppBar, Avatar, Badge, Box, Grid, IconButton, InputBase, Link, Toolbar, Typography, alpha, styled } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { Link as LinkRouterDom } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import routes from "../../routes";
import DealGuruLogo from "../../assets/logos/dealgurulogo.jpg";
import NotificationsIcon from '@mui/icons-material/Notifications';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '20px',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
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
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function Header({handleSidebar}) {

    return (
        <>
            <AppBar position="fixed" elevation={0} sx={{
                backgroundColor: '#157ed2',
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}>
                <Toolbar sx={{
                    '&.MuiToolbar-root': {
                        minHeight: '60px',
                        flexWrap: 'wrap'
                    }
                }}>

                    <Grid container spacing={2}>
                        {/* Logo */}
                        <Grid item xs={2.5}>
                            <Box component={"div"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                                <Link display={"inline-block"} to={routes.HOME} component={LinkRouterDom} underline="none" color={"inherit"}>
                                    <Box component={"div"} display={"flex"} alignItems={"center"} >
                                        <Avatar alt="Deal Guru" src={DealGuruLogo} />
                                        <Typography
                                            ml={1}
                                            mr={3}
                                            variant="h5"
                                            noWrap
                                            component="div"
                                            fontFamily={"Barlow, sans-serif"}
                                            fontWeight={700}
                                        >
                                            Admin
                                        </Typography>
                                    </Box>
                                </Link>

                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    sx={{ mr: 1 }}
                                    onClick={handleSidebar}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Box>
                        </Grid>

                        {/* Search Bar */}
                        <Grid item xs={4.5} alignSelf={"center"}>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        </Grid>

                        {/* Notification */}
                        <Grid item xs={5} alignSelf={"center"} textAlign={"end"} >
                            <IconButton color="inherit" aria-label="notification">
                                <Badge badgeContent={4} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    )
}