import React from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/Join.css";
import { useState } from "react";

const Join = ({ joinmember }) => {
  const [phonenumber, setPhonenumber] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [completeToggle, setCompleteToggle] = useState(false);

  const onChangePhonenumber = (e) => {
    setPhonenumber(e.target.value);
  };
  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeId = (e) => {
    setId(e.target.value);
  };

  const onChangePass = (e) => {
    setPass(e.target.value);
  };

  return (
    <div>
      <div className="joinBar ">
        <img
          className="Logo"
          src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
        />
        <div className="joinBar_Return">
          <a href="/">
            <span>돌아가기</span>
          </a>
        </div>
        <div className="joinBar_span">
          <span>친구들의 사진과 동영상을 보려면 가입하세요.</span>
        </div>
        <div className="joinMemberBtn">
          <input
            onChange={onChangePhonenumber}
            value={phonenumber}
            type="text"
            placeholder="휴대폰 번호 또는 이메일 주소"
          />
          <input
            onChange={onChangeName}
            value={name}
            type="text"
            placeholder="성명"
          />
          <input
            onChange={onChangeId}
            value={id}
            type="text"
            placeholder="아이디"
          />
          <input
            onChange={onChangePass}
            value={pass}
            type="Password"
            placeholder="비밀번호"
          />
        </div>
        <div className="joinButton">
          <button
            onClick={() => {
              joinmember(phonenumber, name, id, pass);
              setCompleteToggle(!completeToggle);
            }}
          >
            가입하기
          </button>
        </div>{" "}
        {completeToggle && (
          <div className="joinComplete">
            {" "}
            <a href="/#">
              가입이 완료되었습니다.
              <br />
              "이 곳"을 누른 후
              <br />
              홈페이지에서 로그인 해주세요
            </a>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default Join;
