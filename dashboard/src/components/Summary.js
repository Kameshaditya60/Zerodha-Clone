import React, {useEffect, useState} from "react";
// import {GetUserService} from "../services/GetUserService";
import { getUserProfile } from "../services/UserService";

const Summary = () => {
  const [user, setUser] = useState(null);

  useEffect(()=> {
    const userData = localStorage.getItem('user');
    console.log('user ka data from localStorage',userData);
    if (userData)
    {
      const parsedUser = JSON.parse(userData);
      console.log('Parsed user:', parsedUser); // 👈 Ye bhi check karo
    console.log('User name:', parsedUser.name); // 👈 Name mil raha?
      setUser(parsedUser);
    }
    // getUserProfile()
    // .then(data => setUser(data))
    // .catch(err => console.error("Error fetching user:", err));
  }, []);

  return (
    <>
      <div className="username">
        <h6>Hi,{user?.name || "Loading..."}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>{" "}
            </p>
            <p>
              Opening balance <span>3.74k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings (13)</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className="profit">
              1.55k <small>+5.20%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>31.43k</span>{" "}
            </p>
            <p>
              Investment <span>29.88k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
