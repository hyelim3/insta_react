import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../styles/Head.css";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { GrAdd } from "react-icons/gr";
import { FiSend } from "react-icons/fi";
import { BiHomeAlt } from "react-icons/bi";

const LoginedHead = ({
  setLoginToggle,
  onLoginToggle,
  logined,
  setLogined,
  user, //현재 라우터
}) => {
  const userinfo = JSON.parse(sessionStorage.getItem("user")) || ""; //현재로그인한 아이
  const navigate = useNavigate();
  const onMoveHomepage = () => {
    navigate("/welcome");
  };

  return userinfo.userid === user.userid ? (
    //로그인한 사람과 현재 브라우저에 보이는 유저랑 같을 때
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
          <a href="#">
            {/* home */}
            <BiHomeAlt />
          </a>
          <a href="#">
            {/* DM */}
            <FiSend />
          </a>
          <a href="#">
            <GrAdd />
          </a>
          {/* <button>
            <a href="#">SEARCH</a>
          </button> */}
          {/* onClick={()=>{serch()}} */}
          <button
            onClick={() => {
              setLogined(!logined);
              onLoginToggle();
              sessionStorage.clear();
              onMoveHomepage();
            }}
          >
            <a href="#">
              <FiLogOut />
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
  ) : (
    //로그인한 사람과 현재 브라우저에 보이는 유저랑 다를 때
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
          <a href="#">
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
            onClick={() => {
              setLogined(!logined);
              onLoginToggle();
              sessionStorage.clear();
              onMoveHomepage();
            }}
          >
            <a href="#">
              <FiLogOut />
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

export default LoginedHead;
