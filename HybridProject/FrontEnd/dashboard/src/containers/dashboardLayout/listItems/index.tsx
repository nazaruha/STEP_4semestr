import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';
import LanIcon from "@mui/icons-material/Lan";

// export const mainListItems = (
//   <React.Fragment>
//     <Link to="">
//       <ListItemButton>
//         <ListItemIcon>
//           <DashboardIcon />
//         </ListItemIcon>
//         <ListItemText primary="Dashboard" />
//       </ListItemButton>
//     </Link>
//     <Link to="users">
//       <ListItemButton>
//         <ListItemIcon>
//           <PeopleIcon />
//         </ListItemIcon>
//         <ListItemText primary="Users" />
//       </ListItemButton>
//     </Link>
//   </React.Fragment>
// );

// export const secondaryListItems = (
//   <React.Fragment>
//     <ListSubheader component="div" inset>
//       Saved reports
//     </ListSubheader>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Profile" />
//     </ListItemButton>
//   </React.Fragment>
// );

export const adminMenu = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link to="">
        <ListItemText primary="Dashboard" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Link to="users">
        <ListItemText primary="Users" />
      </Link>
    </ListItemButton>
  </React.Fragment>
);

export const userMenu = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link to="">
        <ListItemText primary="Dashboard" />
      </Link>
    </ListItemButton>
  </React.Fragment>
);