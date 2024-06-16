import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, MenuItem, Select, Stack, TextField } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import axiosInstance from '../../../Api';
import { getUser } from '../../../utils/localStorage';
import "../ConfirmTimesheets/ConfirmTimesheets.css";
import { useNavigate } from 'react-router-dom';
import { baseEmployeeUrl, baseSubmissiontUrl } from '../../../Shared/constants/constants';
import CreateTimesheet from './CreateTimesheet/CreateTimesheet';
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3007");

export default function MyTimesheets() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [selectUser, setSelectUser] = useState("0");
  const [timesheets, setTimesheets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [triggerReload, setTriggerReload] = useState(false);

  const fetchUsers = async () => {
    const users = await axiosInstance.get(baseEmployeeUrl + '/employee/get-all');
    setUsers(users.data)
  }

  const fetchTimsheets = async () => {
    setIsLoading(true);
    const timesheets = await axiosInstance.get(baseSubmissiontUrl + '/task-service/submissions/1' + (selectUser === "0" ? '' : ('?employeeId=' +selectUser)));
    setTimesheets(timesheets.data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  useEffect(() => {
    fetchTimsheets();
  }, [triggerReload, selectUser])

  useEffect(() => {
    socket.on("change_status", (data) => {
      setData(data);
    })
    socket.on("reject", (data) => {
      setData(data);
    })
  }, []);

  useEffect(() => {
    if (!data) return;
    let newData;
    switch (data.type) {
      case "change_status":
        newData = timesheets.map((timesheet) => {
          if (timesheet._id === data.submissionId) {
            return {
              ...timesheet,
              status: data.status
            };
          }
          return timesheet;
        })
        setTimesheets(newData);
        break;
      case "reject":
        newData = timesheets.map((timesheet) => {
          if (timesheet._id === data.submissionId) {
            return {
              ...timesheet,
              isReject: true
            };
          }
          return timesheet;
        })
        setTimesheets(newData);
        break;
      default:
        break;
    }
  }, [data])
  
  return (
    <div id='my-request-off'>
      <div className='header'>
        <h1>Submit timesheets</h1>
        <MoreVertIcon />
      </div>
      
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "16px 0",
        gap: "16px"
      }}>
        <Button 
          variant="contained" 
          onClick={() => {navigate("/create-timesheet")}}
        >
          Create timesheet
        </Button>

        <div
          style={{
            display: "flex",
            gap: "32px",
            alignItems: "center"
          }}
        >
          <Select
            sx={{
              width: "200px"
            }}
            value={selectUser}
            onChange={(e) => setSelectUser(e.target.value)}
          >
            <MenuItem value={"0"}>Tất cả</MenuItem>
            {users.map((user) => (
              <MenuItem key={user._id} value={user._id}>{user.name}</MenuItem>
            ))}
          </Select>

          <Select
            sx={{
              width: "200px"
            }}
            value={"0"}
          >
            <MenuItem value={"0"}>Tất cả</MenuItem>
            <MenuItem value={"1"}>Đang chờ xác nhận</MenuItem>
            <MenuItem value={"2"}>Đang trong tiến trình</MenuItem>
            <MenuItem value={"3"}>Đã bị hủy</MenuItem>
            <MenuItem value={"4"}>Đã duyệt</MenuItem>
          </Select>

          <TextField 
            style={{
              width: "400px"
            }} 
            label="Tìm kiếm" 
            variant="outlined" 
            placeholder='Tìm kiếm'
          ></TextField>
        </div>
      </div>

      {
        isLoading ? 
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop> : 
          <Stack spacing={2}>
            {timesheets.map((timesheet) => {
              return <CreateTimesheet 
                key={timesheet._id}
                readOnly={true} 
                timesheetData={timesheet}
                handleDeleteTimesheetSubmit={() => {setTriggerReload(!triggerReload)}}
              />
            })}
          </Stack>
      }
    </div>
  )
}
