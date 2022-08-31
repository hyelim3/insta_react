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
