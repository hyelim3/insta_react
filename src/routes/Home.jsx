import React from "react";
import Header from "../layouts/Header";
import { useRecoilValue } from "recoil";
import { authenticatedState } from "../recoil/auth";

const Home = () => {
  const logined = useRecoilValue(authenticatedState);
  return (
    <div>
      <Header />
      <div></div>
    </div>
  );
};

export default Home;
