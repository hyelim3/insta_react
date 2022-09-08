import React from "react";
import Header from "../layouts/Header";
import { useRecoilValue } from "recoil";
import { authenticatedState } from "../recoil/auth";
import Grid from "../components/Grid";
import Image from "../components/Image";
import axios from "axios";
import Login from "../components/Login";
import LoginedHead from "../components/LoginedHead";
import LoginedProfile from "../components/LoginedProfile";
import Layout from "../layouts/Layout";

const LoginedHome = ({
  onLoginToggle,
  setLoginToggle,
  loginToggle,
  onLogin,
  logined,
  setLogined,
  user,
}) => {
  return (
    <div>
      <LoginedHead
        onLoginToggle={onLoginToggle}
        setLoginToggle={setLoginToggle}
        logined={logined}
        setLogined={setLogined}
        user={user}
      />
      <Layout>
        <LoginedProfile user={user} />
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
      <Image user={user} />
      <Grid user={user} />
    </div>
  );
};

export default LoginedHome;
