import React from "react";
import { Link } from "react-router-dom";

import "./UserNavbar.css";

const UserNavbar = (props) => {
  const { user, handleLogout } = props;
  const userProfilePath = "/profile";
  // const userProfileProps = user ; // Replace with your actual prop and value

  return (
    <div className="userNav">
      {/* Pass custom props using the "to" prop and the "state" object */}

      <ul>
        <li>
          <Link
            to={{ pathname: userProfilePath, state: { user } }}
            className="site-title"
          >
            Profile {}
          </Link>
        </li>
        <li>
          {/* You can also pass props in a similar way for other Links */}
          <Link to="#" className={"link"} onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserNavbar;
