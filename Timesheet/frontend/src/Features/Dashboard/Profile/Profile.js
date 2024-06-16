import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Backdrop, Button, CircularProgress, TextField } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../../Api';
import { defaultUser } from '../../../Shared/constants/constants';
import { getUser, setUser } from '../../../utils/localStorage';
import './Profile.css';

export default function Profile() {
  let user = getUser() || defaultUser 

  const [avatar, setAvatar] = useState(user.avatar)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState(user.password)
  const [editMode, setEditMode] = useState(false) 
  const [open, setOpen] = useState(false);

  const handleEditUser = async () => {
    try {
      setOpen(true);
      const newUser = await axiosInstance.post("/api/users", {
        ...user,
        name,
        avatar,
        email,
        password
      })

      if (newUser) {
        toast.success("Update success!")
        setUser(newUser.data)
        setEditMode(false)
      } else {
        toast.error("Update fail!")
      }
      setOpen(false);
    } catch (error) {
      setOpen(false);
      toast.error("Update fail!")
      throw(error)
    }
  } 

  return (
    <div id='profile'>
      <div className='header'>
        <h1>My profile</h1>
        <MoreVertIcon />
      </div>
      <div className='profile-container'>
        <div className='profile-container__avatar'>
          <img 
            src={avatar}
            alt=''
          />
        </div>
        <div className='profile-container__form'>
          <div className='cover-input'>
            <TextField
              label="My avatar"
              value={avatar}
              InputProps={{
                readOnly: !editMode,
              }}
              variant="standard"
              onChange={(e) => setAvatar(e.target.value)}
              fullWidth
            />
          </div>
          <div className='cover-input'>
            <TextField
              label="My name"
              value={name}
              InputProps={{
                readOnly: !editMode,
              }}
              variant="standard"
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
          </div>
          <div className='cover-input'>
            <TextField
              label="My email"
              value={email}
              InputProps={{
                readOnly: !editMode,
              }}
              variant="standard"
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </div>
          <div className='cover-input'>
            <TextField
              label="My password"
              value={password}
              InputProps={{
                readOnly: !editMode,
              }}
              variant="standard"
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </div>
          <div className='cover-input flex'>
            <TextField
              label="My type"
              value={user.type}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
              fullWidth
            />
            <TextField
              label="My sarary"
              value={user.salary + " (vnd)"}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
              fullWidth
            />
          </div>
          <div className='cover-input flex flex-end'>
            {
              !editMode &&
              <Button variant="contained" onClick={() => setEditMode(true)}>
                Edit profile
              </Button>
            }
            {
              editMode &&
              <>
                <Button variant="outlined" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleEditUser}>
                  Save
                </Button>
              </>
            }
          </div>
        </div>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={() => setOpen(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}
