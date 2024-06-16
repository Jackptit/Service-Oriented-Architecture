import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../../Shared/Components/Header/Header'
import Sidebar from '../../Shared/Components/Sidebar/Sidebar'
import './Dashboard.css'
import { getUser } from '../../utils/localStorage'

export default function Dashboard() {
  let navigate = useNavigate();

  useEffect(() => {
    const user = getUser();
    if (!user) {
      navigate("../login")
    }
  }, [navigate])

  return (
    <div className='dashboard'>
      <div className='dashboard-header'>
        <Header />
      </div>
      <div className='dashboard-container'>
        <div className='dashboard-sidebar'>
          <div className='dashboard-sidebar-fix'>
            <Sidebar />
          </div>
        </div>
        <div className='dashboard-content'>
          <div className='dashboard-content-cover'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
