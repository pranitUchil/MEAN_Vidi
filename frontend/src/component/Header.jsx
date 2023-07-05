import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigave = useNavigate()
  const [userInfo,setUserInfo] = useState({});
  useEffect(()=>{
    let arr = window.location.href.split('/')
    console.log( arr)
    axios.get('/api/checksignin').then(async (res)=>{
        setUserInfo(res.data.userInfo)
        // console.
        console.log(res.data)
      })
      .catch(async(res)=>{
        if(arr[3] == "upload-video" || arr[3] == "your-video"){
          navigave('/signin');
        }
      })
  },[])
    const toggleSideNavber = () => {
        var sidebar = document.querySelector('.sidebar');
        var content = document.querySelector('.content');
        sidebar.classList.toggle('open');
        content.classList.toggle('open');
        return false;
      }
  return (
    <>
       <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
          <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
            <h2 className="text-primary mb-0">
              <i className="fa fa-user-edit" />
            </h2>
          </a>
          <a href="#" className="sidebar-toggler flex-shrink-0" onClick={toggleSideNavber}>
            <i className="fa fa-bars" />
          </a>
          <form action='/results' className="d-md-flex ms-4" style={{width:"100%"}}>
            <input
              className="form-control bg-dark border-0"
              type="search"
              placeholder="Search"
              name='search_query'
            />
          </form>
          <div className="navbar-nav align-items-center ms-auto">
            <div className="nav-item dropdown">{
              userInfo.fullname==undefined?<Link to="/signin">Signin</Link>:
              <>
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                  <span className="d-none d-lg-inline-flex">{userInfo.fullname}</span>
                </a>
                <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                  <Link to="/signin" className="dropdown-item">
                    Sign Out
                  </Link>
                </div>
              </>
            }
              
            </div>
          </div>
        </nav>
    </>
  )
}

export default Header
