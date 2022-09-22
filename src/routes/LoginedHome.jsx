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
import { useParams } from "react-router-dom";

const LoginedHome = ({
  onLoginToggle,
  setLoginToggle,
  loginToggle,
  onLogin,
  logined,
  setLogined,
  user,
  setUser,
  onRemove,
  onFollow,
  addToggle,
  onAddToggle,
}) => {
  const { userid } = useParams();
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
      {addToggle && <Image />}
      <Layout>
        <LoginedProfile
          user={user}
          setUser={setUser}
          userid={userid}
          onFollow={onFollow}
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

      <Grid user={user} onRemove={onRemove} />
    </div>
  );
};

export default LoginedHome;
