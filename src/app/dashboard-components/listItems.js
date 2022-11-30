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
export const mainListItems = (
  <React.Fragment>
    <NavLink to="/dashboard" className={styles["nav-link"]}>
      <ListItemButton onClick={() => {console.log("Tolo")}}>
        <ListItemIcon>
          <DashboardIcon  sx={{color: '#fff'}}/>
        </ListItemIcon>
        <ListItemText primary="Inicio" />
      </ListItemButton>
    </NavLink>
    
    <NavLink to="/create-user" className={styles["nav-link"]}>
      <ListItemButton>
        <ListItemIcon sx={{color: '#fff'}}>
          <PersonAddIcon />
        </ListItemIcon>
        <ListItemText primary="Crear Usuario" />
      </ListItemButton>
    </NavLink>
    
    <NavLink to="/upload-users" className={styles["nav-link"]}>
      <ListItemButton>
        <ListItemIcon sx={{color: '#fff'}}>
          <GroupAddIcon />
        </ListItemIcon>
        <ListItemText primary="Subir Usuarios" />
      </ListItemButton>
    </NavLink>

    <NavLink to="/users" className={styles["nav-link"]}>
      <ListItemButton>
        <ListItemIcon sx={{color: '#fff'}}>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Usuarios" />
      </ListItemButton>
    </NavLink>

    <NavLink to="/active-users" className={styles["nav-link"]}>
      <ListItemButton>
        <ListItemIcon sx={{color: '#fff'}}>
          <VerifiedUserIcon />
        </ListItemIcon>
        <ListItemText primary="Usuarios Activados" />
      </ListItemButton>
    </NavLink>

    <NavLink to="/preactive-users" className={styles["nav-link"]}>
      <ListItemButton>
          <ListItemIcon sx={{color: '#fff'}}>
            <SwitchAccountIcon  />
          </ListItemIcon>
          <ListItemText primary="Usuarios Preactivados" />
      </ListItemButton>
    </NavLink>

    <NavLink to="/inactive-users" className={styles["nav-link"]}>
      <ListItemButton>
        <ListItemIcon sx={{color: '#fff'}}>
          <NoAccountsIcon />
        </ListItemIcon>
        <ListItemText primary="Usuarios Faltantes" />
      </ListItemButton>
    </NavLink>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
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
