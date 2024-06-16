import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select, TextField } from '@mui/material';
import moment, { now } from 'moment';
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import axiosInstance from '../../../Api';
import { getUser } from '../../../utils/localStorage';
import "./ConfirmTimesheets.css";

const localizer = momentLocalizer(moment)

const user = getUser()
const defaultRequestForm = {
  dayOff: "",
  reason: "",
  shift: "fullday",
  userId: user?.id,
  status: "pending",
} 

export default function ConfirmTimesheets() {
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [data, setData] = useState([]);
  const [requests, setRequests] = useState([])

  const [requestForm, setRequestForm] = useState(defaultRequestForm);


  useEffect(() => {
    async function handle() {
      try {
        const res = await axiosInstance.get("/api/request-off", {
          params: {
            userId: user?.id
          }
        });

        if (res) { 
          setData(res.data)
          const temp = res.data.map(element => {
            return {
              start: moment(element.dayOff).toDate(),
              end: moment(element.dayOff).toDate(),
              title: element.shift + " - " + element.status,
            }
          });
          setRequests(temp)
        }
      } catch(error) {
        throw(error)
      }
    }
    handle()
  }, [openForm])

  const getRequestOff = (time) => {
    return data.find(e => moment(e.dayOff).format("YYYY-MM-DD") === moment(time).format("YYYY-MM-DD"))
  }

  const handleClickADay = (e) => {
    if (!e || !e?.start) return

    const requestOff = getRequestOff(e?.start)
    if (requestOff) {
      setRequestForm(requestOff)
    }

    if (e?.start && moment(e.start) <= now() && !requestOff) {
      return;
    }

    let newForm = {
      ...requestForm,
      dayOff: moment(e.start).format("YYYY-MM-DD")
    }

    if (requestOff) {
      newForm = {
        ...newForm,
        ...requestOff
      }
    }

    setRequestForm(newForm)
    setOpenForm(true)
  }

  const handleCreateRequestOff = async () => {
    try {
      await axiosInstance.post("/api/request-off", requestForm);

      setOpenForm(false)
      setRequestForm(defaultRequestForm)
    } catch(error) {
      throw(error)
    }
  }

  return (
    <div id='my-request-off'>
      <div className='header'>
        <h1>Confirm timesheet</h1>
        <MoreVertIcon />
      </div>
      <div className='my-request-off-container'>
        <Calendar
          localizer={localizer}
          events={requests}
          startAccessor="start"
          views={['month']}
          endAccessor="end"
          style={{ height: 500 }}
          selectable
          onSelectSlot={handleClickADay}
        />
      </div>
      <Dialog
        open={openForm}
        onClose={() => setOpenForm(false)}
      >
        <DialogTitle 
          sx={{
            minWidth: '500px'
          }}
        >
          Cerate new request
        </DialogTitle>
        <DialogContent>
          <DialogContentText>You are creating a request off on {requestForm.dayOff}</DialogContentText>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={requestForm.status}
            label="Shift"
            onChange={(e) => setRequestForm({
              ...requestForm,
              status: e.target.value
            })}
            fullWidth
            sx={{
              marginTop: "16px"
            }}
          >
            <MenuItem value={"pending"}>pending</MenuItem>
            <MenuItem value={"reject"}>reject</MenuItem>
          </Select>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={requestForm.shift}
            label="Shift"
            onChange={(e) => setRequestForm({
              ...requestForm,
              shift: e.target.value
            })}
            fullWidth
            sx={{
              marginTop: "16px"
            }}
          >
            <MenuItem value={"fullday"}>fullday</MenuItem>
            <MenuItem value={"afternoon"}>afternoon</MenuItem>
            <MenuItem value={"morning"}>morning</MenuItem>
          </Select>
          <TextField
            margin="dense"
            id="name"
            label="Reason"
            type="text"
            fullWidth
            value={requestForm.reason}
            onChange={(e) => setRequestForm({
              ...requestForm,
              reason: e.target.value
            })}
            sx={{
              marginTop: "16px"
            }}
          />
        </DialogContent>
        <DialogActions
          sx={{
            padding: '0 24px 24px 24px'
          }}
        >
          <Button 
            onClick={() => {
              setOpenForm(false)
              setRequestForm(defaultRequestForm)
            }} 
            variant="outlined"
          >
            Cancel
          </Button>
          <Button onClick={handleCreateRequestOff} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
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
