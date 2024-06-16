import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import './Sidebar.css'

export default function Sidebar() {
  return (
    <div id='sidebar'>
      <List component="nav" aria-labelledby="nested-list-subheader">
        <Link to="/profile" className='link'>
          <ListItemButton>
            <ListItemIcon className='list-icon'>
              <AccountBoxIcon />
            </ListItemIcon>
            Profile
          </ListItemButton>
        </Link>
        <Link to="/" className='link'>
          <ListItemButton>
            <ListItemIcon className='list-icon'>
              <AccessAlarmIcon />
            </ListItemIcon>
            Submit timesheets
          </ListItemButton>
        </Link>
        {/* <Link to="/my-request-off" className='link'>
          <ListItemButton>
            <ListItemIcon className='list-icon'>
              <CalendarMonthIcon />
            </ListItemIcon>
            Confirm timesheets
          </ListItemButton>
        </Link> */}
      </List>
      <div className='info'>
        <p>© 2023 <strong>Timesheet</strong>.</p>
      </div>
    </div>
  )
}
