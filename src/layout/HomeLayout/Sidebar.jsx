import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import sidebarItems from '../../constants/sidebarItems';
import { drawerWidth } from '../../constants/contants';
import MuiDrawer from '@mui/material/Drawer';

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Sidebar({ openSidebar, handleSidebar }) {

    const navigate = useNavigate();

    const navigateToLink = (link) => {
        navigate(link);
    }

    return (
        <>
            <Drawer variant="permanent" open={openSidebar}
                PaperProps={{
                    sx: {
                        backgroundColor: '#157ed2'
                    }
                }}
            >
                <Toolbar />

                <List>
                    {
                        sidebarItems.map((item, index) => (
                            <ListItem key={index} disablePadding sx={{ display: 'block', color: 'white' }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: openSidebar ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                    onClick={()=>navigateToLink(item.url)}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: openSidebar ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: 'white'
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.label} sx={{ opacity: openSidebar ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                </List>
            </Drawer>
        </>
    )
}