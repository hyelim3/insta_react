import React from "react";
import LoginedHead from "./LoginedHead";
import "../styles/Head.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBars } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FaWindowClose } from "react-icons/fa";
const Main = ({
  onLoginToggle,
  setLoginToggle,
  logined,
  setLogined,
  user,
  onAddToggle,
}) => {
  const userinfo = JSON.parse(sessionStorage.getItem("user")) || "";
  const [users, setusers] = useState([]);
  const [articles, setAritcles] = useState([]);
  const [detailToggle, setDetailToggle] = useState(false);
  const windowY = window.scrollY;

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: `http://localhost:3002/getfollowMem/${userinfo.userid}`,
          method: "GET",
        });
        if (data.data == false) {
          console.log("false");
        } else {
          setusers(data.data);
          console.log(data.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: `http://localhost:3002/getArticle/${userinfo.userid}`,
          method: "GET",
        });
        if (data.data == false) {
          console.log("fa");
        } else {
          setAritcles(data.data);
          console.log(data.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);
  const onDetailToggle = () => {
    setDetailToggle(!detailToggle);
  };
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
      <div className="pt-3">
        <div
          className="rounded-lg"
          style={{
            width: "900px",
            height: "90px",
            border: "1px rgb(209, 209, 209) solid",
            margin: "0 auto",
          }}
        >
          <ul
            className="flex items-center justify-center gap-7 "
            style={{
              width: "100%",
              height: "95px",
            }}
          >
            {users.map((user, index) => (
              <li key={index} className="pb-5">
                <div
                  className=" relative w-12 rounded-full ring ring-offset-base-100 ring-offset-2"
                  style={{
                    height: "50px",
                  }}
                >
                  <a href={`/${user.userid}`}>
                    <img
                      src={user.userimgSrc}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "fill",
                        display: "block",
                        borderRadius: "50%",
                      }}
                    />
                    <div className="flex justify-center text-sm pt-1">
                      {user.userid}
                    </div>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul>
            {articles.map((article, index) => (
              <li
                key={index}
                className="rounded-lg"
                style={{
                  width: "650px",
                  height: "600px",
                  border: "1px rgb(209, 209, 209) solid",
                  margin: "20px auto",
                }}
              >
                <div
                  className="p-2"
                  style={{
                    border: "1px red solid",
                  }}
                >
                  <div
                    className="relative w-12 rounded-full ring ring-offset-base-100 ring-offset-2"
                    style={{
                      height: "50px",
                    }}
                  >
                    <a href={`/${article.userid}`}>
                      <img
                        src={article.userimgSrc}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "fill",
                          display: "block",
                          borderRadius: "50%",
                        }}
                      />
                      <div
                        className="flex justify-center text-sm pt-1 absolute"
                        style={{
                          top: "20%",
                          left: "125%",
                        }}
                      >
                        {article.userid}
                      </div>
                    </a>
                  </div>
                </div>
                <div
                  style={{
                    border: "1px red solid",
                  }}
                >
                  <div
                    style={{
                      height: "380px",
                    }}
                  >
                    <a href={`/${article.userid}/${article.id}`}>
                      <img
                        src={article.imgSrc}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </a>
                  </div>

                  <div>
                    <div
                      style={{
                        height: "30px",
                      }}
                    >
                      <div className="flex flex-row mt-2">
                        <button style={{ marginLeft: "10px" }}>
                          <FontAwesomeIcon icon={faHeart} className="icon" />
                          <span> 좋아요 {article.imgLike}</span>
                        </button>
                        <button className="ml-4">
                          <FontAwesomeIcon
                            icon={faCommentDots}
                            className="icon"
                          />
                          <span> 댓글 {article.imgReply}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Main;
