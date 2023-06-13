import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import userLogin from "../../slice/loginSlice";
import { clearState } from "../../slice/loginSlice";

function NavBar() {
  //state
  let { userObj, loginStatus, errorMessage } = useSelector(
    (state) => state.login
  );
  //navigate
  let navigate = useNavigate();
  //dispatach
  let dispatach = useDispatch();
  //logout
  const onLogout = () => {
    //call clearState reducer
    dispatach(clearState());
  };

  return (
    <div className="mb-3 navigation-bar">
      <div className="container">
        {loginStatus === "success" ? (
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active nav-link nav-bar" : "inactive nav-link"
                }
                onClick={onLogout}
              >
                Logout
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active nav-link nav-bar" : "inactive nav-link"
                }
                to="/sign-up"
              >
                Sign Up
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active nav-link nav-bar" : "inactive nav-link"
                }
                to="/login"
              >
                Login
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default NavBar;
