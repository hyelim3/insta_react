import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../styles/Head.css";
import { FiLogIn } from "react-icons/fi";
import { GrAdd } from "react-icons/gr";
import { FiSend } from "react-icons/fi";
import { BiHomeAlt } from "react-icons/bi";

const UnLoginedHead = ({
  setLoginToggle,
  onLoginToggle,
  logined,
  setLogined,
}) => {
  const userinfo = JSON.parse(sessionStorage.getItem("user")) || ""; //현재로그인한 아이
  return (
    <div className="Topbar">
      <div className="navbar bg-base-100 Topbar_logo">
        <div className="flex-1">
          <a
            href="http://localhost:3000/"
            className="btn btn-ghost normal-case text-xl"
          >
            instargram
          </a>
        </div>
        <div className="flex-none gap-2 text-xl">
          <a href={userinfo.userid}>
            {/* home */}
            <BiHomeAlt />
          </a>
          <a href="#">
            {/* DM */}
            <FiSend />
          </a>
          {/* <a href="#">
            <GrAdd />
          </a> */}
          {/* <button>
            <a href="#">SEARCH</a>
          </button> */}
          {/* onClick={()=>{serch()}} */}
          <button
          // onClick={() => {
          //   setLogined(!logined);
          //   onLoginToggle();
          //   sessionStorage.clear();
          //   onMoveHomepage();
          // }}
          >
            <a href="/">
              <FiLogIn />
            </a>
          </button>
          <div className="form-control">
            <input
              type="text"
              placeholder="검색"
              className="input input-bordered"
            />
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={userinfo.imgSrc} />
              </div>
            </label>
            <ul
              tabIndex="0"
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a
                  href="https://www.instagram.com/anjjaaang/"
                  className="justify-between"
                >
                  프로필
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>저장됨</a>
              </li>
              <li>
                <a>설정</a>
              </li>
              <li>
                <a>계정변환</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnLoginedHead;
