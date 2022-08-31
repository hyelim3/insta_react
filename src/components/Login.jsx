import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Logo from "../public/Logo.PNG";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

// $ npm i @fortawesome/fontawesome-svg-core
// $ npm i @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons
// $ npm i @fortawesome/react-fontawesome 폰트어썸사용법
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars } from "@fortawesome/free-solid-svg-icons"; ->카멜표기법
{
  /* <FontAwesomeIcon icon={faTrashCan} /> 본문호출법*/
}

const Login = ({ onLoginToggle, setLoginToggle }) => {
  return (
    <div className="Login">
      <img className="Logo" src="https://i.postimg.cc/sD6LQB7F/Logo.png" />
      <button
        className="loginCloseBtn"
        onClick={() => {
          onLoginToggle();
        }}
      >
        <FontAwesomeIcon icon={faCircleXmark} />
      </button>
      <div className="input1">
        <input
          type="text"
          placeholder="아이디"
          style={{ marginBottom: "5px" }}
        />
        <input type="Password" placeholder="비밀번호" />
      </div>
      <div className="Button">
        <button className="LoginButton">로그인</button>
        <button className="UserButton">가입하기</button>
      </div>
    </div>
  );
};

export default Login;
