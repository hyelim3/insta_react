import React from "react";
import Header from "../layouts/Header";
import { useRecoilValue } from "recoil";
import { authenticatedState } from "../recoil/auth";
import Grid from "../components/Grid";
import Image from "../components/Image";
import axios from "axios";
import Login from "../components/Login";
import UnLoginedHead from "../components/UnLoginedHead";
import LoginedProfile from "../components/LoginedProfile";
import UnLoginedProfile from "../components/UnLoginedProfile";
import Layout from "../layouts/Layout";

const UnLoginedHome = ({
  onLoginToggle,
  setLoginToggle,
  loginToggle,
  onLogin,
  logined,
  setLogined,
}) => {
  return (
    <div>
      <UnLoginedHead //로그인이 안됐음
        onLoginToggle={onLoginToggle}
        setLoginToggle={setLoginToggle}
        logined={logined}
        setLogined={setLogined}
      />
      <Layout>
        <UnLoginedProfile
         />
      </Layout>
      {loginToggle && (
        <Login
          onLoginToggle={onLoginToggle}
          setLoginToggle={setLoginToggle}
          onLogin={onLogin}
          logined={logined}
          setLogined={setLogined}
        />
      )}
      <Image />
      <Grid />
    </div>
  );
};

export default UnLoginedHome;
