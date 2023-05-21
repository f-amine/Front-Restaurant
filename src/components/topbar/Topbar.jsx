import { Link } from "react-router-dom";
import "./topbar.css";
import Cookies from "js-cookie";

export default function Topbar() {
  const jwt = Cookies.get("jwt");
  const isLoggedIn = jwt && jwt !== "";

  const handleLogout = () => {
    Cookies.remove("jwt");
    window.location.reload();
  };

  return (
    <div className="top">
      <div className="topLeft">
        <a href="https://www.linkedin.com/in/amine-frira/" target="_blank" rel="noopener noreferrer">
          <i className="topIcon fab fa-linkedin"></i>
        </a>
        <a href="https://github.com/f-amine" target="_blank" rel="noopener noreferrer">
          <i className="topIcon fab fa-github"></i>
        </a>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          {isLoggedIn ? (
            <li className="topListItem" onClick={handleLogout}>
              LOGOUT
            </li>
          ) : (
            <>
              <li className="topListItem">
                <Link className="link" to="/login">
                  LOGIN
                </Link>
              </li>
              <li className="topListItem">
                <Link className="link" to="/register">
                  REGISTER
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    
    </div>
  );
}