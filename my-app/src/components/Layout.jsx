import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import cookie from "js-cookie";
import logo from "../logo.jpeg";
function Layout(props) {

  const handleLogout = e => {
    e.preventDefault();
    // cookie.remove("token");
    localStorage.removeItem("token");
    props.logout();
  };
  const [pathname, setPathname] = useState('');
  const checkActive = (match, location) => {
    //some additional logic to verify you are in the home URI
    if (!location) return false;
    setPathname(location.pathname);
    return pathname === "/";
  }
  return (
    <div>
      <div className="navbar  navbar-expand-lg bg-dark navbar-dark">
        <NavLink to="/" className="navbar-brand"><img className="rounded img-fluid" style={{ height: '40px', width: '40px' }} src={logo} /></NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          {props.loggedIn ? (
            <Fragment>
              <ul className="navbar-nav mr-auto">
                <li className={"nav-item " + (pathname === '/task' ? 'active' : '')} >
                  <NavLink isActive={checkActive} to="/task" className="nav-link">Task</NavLink>
                </li>
                <li className={"nav-item " + (pathname === '/taskList' ? 'active' : '')}>
                  <NavLink isActive={checkActive} to="/taskList" className="nav-link">TaskList</NavLink>
                </li>
                {/* <li className={"nav-item " + (pathname === '/reminder' ? 'active' : '')}>
                  <NavLink isActive={checkActive} to="/reminder" className="nav-link">Reminder</NavLink>
                </li> */}
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className={"nav-item " + (pathname === '/logout' ? 'active' : '')}>
                  <NavLink isActive={checkActive}
                    className="nav-link"
                    to="/logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            </Fragment>
          ) : (
              <Fragment>
                <ul className="navbar-nav ml-auto">
                  <li className={"nav-item " + (pathname === '/login' ? 'active' : '')}>
                    <NavLink isActive={checkActive} to="/login" className="nav-link">Login</NavLink>
                  </li>
                  <li className={"nav-item " + (pathname === '/register' ? 'active' : '')}>
                    <NavLink isActive={checkActive} to="/register" className="nav-link">Register</NavLink>
                  </li>
                </ul>
              </Fragment>
            )}


        </div>
      </div>
      {props.children}
    </div >
  );
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({ type: "SET_LOGOUT" })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
