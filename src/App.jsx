import React, { useState, useEffect } from "react";
import About from "./routes/About";
import Home from "./routes/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Grid from "./components/Grid";
import Image from "./components/Image";
import axios from "axios";
import Login from "./components/Login";
import Head from "./components/Head";
import "./App.css";
import Profile from "./components/Profile";
import Layout from "./layouts/Layout";
function App() {
  const [loginToggle, setLoginToggle] = useState(false);
  const onLoginToggle = () => {
    setLoginToggle(!loginToggle);
  };
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
      renders the first one that matches the current URL. */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Head onLoginToggle={onLoginToggle} setLoginToggle={setLoginToggle} />
      <Layout>
        <Profile />
      </Layout>
      {loginToggle && (
        <Login onLoginToggle={onLoginToggle} setLoginToggle={setLoginToggle} />
      )}
      <Image />
      <Grid />
    </Router>
  );
}

export default App;
// $ npm i @fortawesome/fontawesome-svg-core
// $ npm i @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons
// $ npm i @fortawesome/react-fontawesome
// $ npm i express-fileupload
// $ npm i axios
// $ npm i Recoil
// $ npm i recoil-persist
// -------> SQL IMG 전용 테이블 생성
// CREATE TABLE img_table(
//   id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
//   imgSrc VARCHAR(255),
//   imgLike INT,
//   imgReply VARCHAR(255)
//   );
//  -----> 여기까지 SQL 쿼리 실행 후 ,
//   ALTER TABLE img_table MODIFY imgReply INT DEFAULT 0;
//   ALTER TABLE img_table MODIFY imgLike INT DEFAULT 0;
// ------>> 이 구문 추가 실행. ( 이미지 댓글 수,좋아요 수 초기값 0 설정.)

//   SELECT * FROM img_table
//   DESC img_table
//   INSERT INTO img_table SET imgSrc = 'a';
//   DROP TABLE img_table
//   TRUNCATE img_table
//  ---------> 조회, 구조확인, 생성, 테이블삭제 등 쿼리

// -------------> insta 회원가입 or 로그인 등 유저정보 테이블
// CREATE TABLE insta (
// userid VARCHAR(100) UNIQUE NOT NULL PRIMARY KEY,
// `password` VARCHAR(100) NOT NULL,
// username VARCHAR(20) NOT NULL,
// phone VARCHAR(30) UNIQUE NOT NULL,
// address VARCHAR(100) NOT NULL);
// ----------> insta에 유저 추가하고 싶을때 쿼리 예시
// INSERT INTO insta SET userid = 'user', `password` = '1234', username = "홍길동",
// phone = '010-1234-5678', address="대전시";

// 주의사항
// css작업할때 .icon 으로 이름 지었다면 .icon {  }이 아니라,
// (부모tag이름 Ex) Profile .icon {  }  (후손선택)으로 작업해주어야함.
// 다른사람들도 .icon  .button 등으로 이름지을때 className이 겹친다면
// 자신의 서식이 다른사람들에게도 영향을 끼치기때문.

// Git 작업순서
// 1.git init (git 폴더생성. 초기화?)
// 2.git remote -v  -> https://github.com/byunghoonyoon/???  아마 다르게 나올거임.
// 3.git remote set-url origin https://github.com/byunghoonyoon/Instagram
// 위 3번으로 인해 원격저장소가 제 git으로 지정됩니다.
// 4.다시 2번 실행후, git remote set-url origin https://github.com/byunghoonyoon/Instagram 잘나오는지 확인
// 5.git config --global user.name"Github ID" -> Github Id에 Github 이름쓰세요
// 6.git config --global user.email "Github Email" -> Github 로그인하는 이메일 쓰세요
// 7-1. Windows라면 git config --global core.autocrlf true
// 7-2. Mac이라면 git config --global core.autocrlf input
// 8. git add .
// 9. git commit -m " 주석내용 "
// 10. git push origin master
// https://wiken.io/b/8222/9066 상세하게 나와있음.
// 네명이서 작업을 같이 하며 병합,다운,업로드 할때 에러가 날수도 있음.
