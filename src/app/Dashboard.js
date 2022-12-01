import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Home from './dashboard-components/Home';
import Createuser from './dashboard-components/Createuser';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { MainListItems } from './dashboard-components/listItems';
import Uploadusers from './dashboard-components/Uploadusers';
import Activeusers from './dashboard-components/Activeusers'
import Users from './dashboard-components/Users'
import Preactiveusers from './dashboard-components/Preactiveusers';
import Inactiveusers from './dashboard-components/Inactiveusers';
import { io } from 'socket.io-client';

const socket = io();
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      backgroundColor: 'rgb(17, 24, 39)',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();
const queryClient = new QueryClient()
function DashboardContent() {
      const [open, setOpen] = React.useState(false);
      const toggleDrawer = () => {
        setOpen(!open);
      };
      return (
        <ThemeProvider theme={mdTheme}>
          <Box sx={{ display: 'flex', backgroundColor: 'rgb(17, 24, 39)'}}>
            <CssBaseline />
            <AppBar position="absolute" open={open}>
              <Toolbar
                sx={{
                  pr: '24px',
                  backgroundColor: 'rgb(17, 24, 39)'
                }}
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{
                    marginRight: '36px',
                    ...(open && { display: 'none' }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  
                </Typography>
                <IconButton color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
              <Toolbar
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  px: [1],
                  backgroundColor: 'rgb(17, 24, 39)',
                  color: '#fff',
                }}
              >
                Administración
                <IconButton onClick={toggleDrawer} sx={{color: '#fff'}}>
                  <ChevronLeftIcon />
                </IconButton>
              </Toolbar>
              <Divider sx={{borderTop: '0.5px solid rgba(178, 186, 194, 0.5)'}}/>
              <List component="nav" sx={{color: '#fff', justifyContent: 'center'}}>
                {<MainListItems/>}
              </List>
            </Drawer>
            <Box
                  component="main"
                  sx={{
                  backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                      ? theme.palette.grey[100]
                      : theme.palette.grey[900],
                  flexGrow: 1,
                  height: '100vh',
                  overflow: 'auto',
                  backgroundColor: 'rgb(11, 15, 25)'
                  }}
              >
                <Routes>
                    <Route path='/dashboard' element={<Home />}/>
                    <Route path='/dashboard/create-user' element={<Createuser />}/>
                    <Route path='/dashboard/upload-users' element={<Uploadusers socket={socket}/>}/>
                    <Route path='/dashboard/users' element={<Users />}/>
                    <Route path='/dashboard/active-users' element={<Activeusers />}/>
                    <Route path='/dashboard/preactive-users' element={<Preactiveusers />}/>
                    <Route path='/dashboard/inactive-users' element={<Inactiveusers />}/>
                </Routes>
            </Box>
          </Box>
        </ThemeProvider>
      );
}

export default function Dashboard() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <DashboardContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Dashboard />);
