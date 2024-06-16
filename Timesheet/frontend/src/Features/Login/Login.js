import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Stack, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Api';
import { setUser } from '../../utils/localStorage';

const containerStyle = { 
  display: "flex", 
  margin: "auto auto", 
  height: "100vh",
  backgroundColor: "#64a1f4"
};
const paperStyle = { padding: '40px 60px', width: 280, margin: "auto auto" };
const avatarStyle = { backgroundColor: '#1bbd7e' };
const btnstyle = { margin: '8px 0' };

export default function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axiosInstance.post("/api/login", {
        email, password
      });
      
      if (res) {
        setUser(res.data);
        toast.success("Login success!")
        navigate("../")
        window.location.reload();
      } else {
        toast.error("Invalid email or password!")
      }
    } catch (error) {
      toast.error("login fail!")
      throw error;
    }
  }

  return (
    <Grid style={containerStyle}>
      <Paper elevation={10} style={paperStyle}>
        <Stack spacing={2}>
          <Grid align='center'>
            <Avatar align='center' style={avatarStyle}><LockOutlinedIcon /></Avatar>
            <Typography mt={2} variant='h5'>Sign In</Typography>
          </Grid>
          <TextField 
            label='Email' 
            placeholder='Enter email' 
            type='email'
            fullWidth 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField 
            label='Password' 
            placeholder='Enter password' 
            type='password' 
            fullWidth 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox name="checkedB" />}
            label="Remember me"
          />
          <Button 
            type='submit'  
            variant="contained" 
            style={btnstyle} 
            fullWidth
            onClick={handleLogin}
            disabled={!email || !password}
          >
            Sign in
          </Button>
          <div>
            <Typography >
              <Link href="#" >
                Forgot password ?
              </Link>
            </Typography>
            <Typography > Do you have an account ?
              <Link href="#" >
                Sign Up
              </Link>
            </Typography>
          </div>
        </Stack>
      </Paper>
    </Grid>
  )
}
