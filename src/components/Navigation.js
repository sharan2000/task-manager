import { Link, NavLink } from "react-router-dom";
import { useState } from "react";


const Navigation = () => {
  let [collapse, setCollapse] = useState("collapse")
  
  let toggleNavbar = () => {
    setCollapse((prevValue) => {
      return prevValue.length ? "" : "collapse"
    })
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
      <Link className="navbar-brand" to="/">TaskManager</Link>
      <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={collapse + " navbar-collapse"} id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className={({isActive}) => {  return "nav-item nav-link " + (isActive ? "active" : '') }} to="/tasks">
            All Tasks
          </NavLink>
          <NavLink className={({isActive}) => {  return "nav-item nav-link " + (isActive ? "active" : '') }} to="/add-task">
            Add Task
          </NavLink>
          <NavLink className={({isActive}) => {  return "nav-item nav-link " + (isActive ? "active" : '') }} to="/manage-categories">
            Manage Categories
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navigation;