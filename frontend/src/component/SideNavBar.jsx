import React from 'react'
import { Link ,NavLink } from 'react-router-dom'

const SideNavBar = () => {
  return (
    <>
      <div className="sidebar pe-4 pb-3">
    <nav className="navbar bg-secondary navbar-dark">
      <a href="index.html" className="navbar-brand mx-4 mb-3">
        <h3 className="text-primary">
          <i className="fa fa-user-edit me-2" />
          Vidi
        </h3>
      </a>
      {/* <div className="d-flex align-items-center ms-4 mb-4">
        <div className="position-relative">
          <img
            className="rounded-circle"
            src="img/user.jpg"
            alt=""
            style={{ width: 40, height: 40 }}
          />
          <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1" />
        </div>
        <div className="ms-3">
          <h6 className="mb-0">Jhon Doe</h6>
          <span>Admin</span>
        </div>
      </div> */}
      <div className="navbar-nav w-100">
        <NavLink to="/" className="nav-item nav-link ">
          <i className="fa fa-tachometer-alt me-2" />
          Home
        </NavLink>
        <NavLink to="/upload-video" className="nav-item nav-link">
          <i className="fa fa-th me-2" />
          Uplode Video
        </NavLink>
        <NavLink to="/your-video" className="nav-item nav-link">
          <i className="fa fa-keyboard me-2" />
         Your Video
        </NavLink>
      </div>
    </nav>
  </div>
    </>
  )
}

export default SideNavBar
