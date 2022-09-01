import React from "react";
import "../styles/Join.css";
const Join = () => {
  return (
    <div>
      <div className="joinBar ">
        <img className="Logo" src="https://i.postimg.cc/sD6LQB7F/Logo.png" />
        <div className="joinBar_Return">
          <a href="/">
            <span>돌아가기</span>
          </a>
        </div>
        <div className="joinBar_span">
          <span>친구들의 사진과 동영상을 보려면 가입하세요.</span>
        </div>
        <div className="joinInput">
          <input type="text" placeholder="휴대폰 번호 또는 이메일 주소" />
          <input type="Password" placeholder="성명" />
          <input type="text" placeholder="아이디" />
          <input type="Password" placeholder="비밀번호" />
        </div>
        <div className="joinButton">
          <button>가입하기</button>
        </div>
      </div>
    </div>
  );
};

export default Join;
