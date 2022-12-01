import * as React from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import styles from '../css/listitems.module.css';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
export const MainListItems = () => {
    let location = useLocation();
    return (
      <React.Fragment>
        <NavLink to="/dashboard" className={styles["nav-link"]}>
          <ListItemButton >
            <ListItemIcon>
              <DashboardIcon  sx={{color: location.pathname == '/dashboard' ? '#F7901E' : '#fff'}}/>
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItemButton>
        </NavLink>
        
        <NavLink to="/dashboard/create-user" className={styles["nav-link"]}>
          <ListItemButton>
            <ListItemIcon sx={{color: '#fff'}}>
              <PersonAddIcon sx={{color: location.pathname == '/dashboard/create-user' ? '#F7901E' : '#fff'}}/>
            </ListItemIcon>
            <ListItemText primary="Crear Usuario" />
          </ListItemButton>
        </NavLink>
        
        <NavLink to="/dashboard/upload-users" className={styles["nav-link"]}>
          <ListItemButton>
            <ListItemIcon sx={{color: '#fff'}}>
              <GroupAddIcon sx={{color: location.pathname == '/dashboard/upload-users' ? '#F7901E' : '#fff'}}/>
            </ListItemIcon>
            <ListItemText primary="Subir Usuarios" />
          </ListItemButton>
        </NavLink>
    
        <NavLink to="/dashboard/users" className={styles["nav-link"]}>
          <ListItemButton>
            <ListItemIcon sx={{color: '#fff'}}>
              <PeopleIcon sx={{color: location.pathname == '/dashboard/users' ? '#F7901E' : '#fff'}}/>
            </ListItemIcon>
            <ListItemText primary="Usuarios" />
          </ListItemButton>
        </NavLink>
    
        <NavLink to="/dashboard/active-users" className={styles["nav-link"]}>
          <ListItemButton>
            <ListItemIcon sx={{color: '#fff'}}>
              <VerifiedUserIcon sx={{color: location.pathname == '/dashboard/active-users' ? '#F7901E' : '#fff'}}/>
            </ListItemIcon>
            <ListItemText primary="Usuarios Activados" />
          </ListItemButton>
        </NavLink>
    
        <NavLink to="/dashboard/preactive-users" className={styles["nav-link"]}>
          <ListItemButton>
              <ListItemIcon sx={{color: '#fff'}}>
                <SwitchAccountIcon  sx={{color: location.pathname == '/dashboard/preactive-users' ? '#F7901E' : '#fff'}}/>
              </ListItemIcon>
              <ListItemText primary="Usuarios Preactivados" />
          </ListItemButton>
        </NavLink>
    
        <NavLink to="/dashboard/inactive-users" className={styles["nav-link"]}>
          <ListItemButton>
            <ListItemIcon sx={{color: '#fff'}}>
              <NoAccountsIcon sx={{color: location.pathname == '/dashboard/inactive-users' ? '#F7901E' : '#fff'}}/>
            </ListItemIcon>
            <ListItemText primary="Usuarios Faltantes" />
          </ListItemButton>
        </NavLink>
      </React.Fragment>
    );
  }
  

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
