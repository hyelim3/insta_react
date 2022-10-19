import React from "react";
import LoginedHead from "./LoginedHead";
import "../styles/Head.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Main = ({
  onLoginToggle,
  setLoginToggle,
  logined,
  setLogined,
  user,
  onAddToggle,
}) => {
  const userinfo = JSON.parse(sessionStorage.getItem("user")) || "";
  const [users, setusers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: `http://localhost:3002/getfollowMem/${userinfo.userid}`,
          method: "GET",
        });
        if (data.data == false) {
          console.log("false");
        } else {
          setusers(data.data);
          console.log(data.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <LoginedHead
        onLoginToggle={onLoginToggle}
        setLoginToggle={setLoginToggle}
        logined={logined}
        setLogined={setLogined}
        user={user}
        onAddToggle={onAddToggle}
      />
      <div className="pt-3">
        <div
          className="rounded-lg"
          style={{
            width: "800px",
            height: "95px",
            border: "1px rgb(209, 209, 209) solid",
            margin: "0 auto",
          }}
        >
          <ul
            className="flex items-center justify-center gap-7 "
            style={{
              width: "100%",
              height: "95px",
            }}
          >
            {users.map((user, index) => (
              <li key={index} className="pb-4">
                <div
                  className=" relative w-12 rounded-full ring ring-offset-base-100 ring-offset-2"
                  style={{
                    height: "50px",
                  }}
                >
                  <a href={`/${user.userid}`}>
                    <img
                      src={user.userimgSrc}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "fill",
                        display: "block",
                        borderRadius: "50%",
                      }}
                    />
                    <div className="flex justify-center text-sm pt-1">
                      {user.userid}
                    </div>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="pt-5">
          <div
            className="rounded-lg"
            style={{
              width: "800px",
              height: "720px",
              border: "1px rgb(209, 209, 209) solid",
              margin: "0 auto",
            }}
          >
            {/* {users.map((user, index) => ())} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
