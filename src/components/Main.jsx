import React from "react";
import LoginedHead from "./LoginedHead";
import "../styles/Head.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaWindowClose } from "react-icons/fa";
import {
  FiSmile,
  FiSend,
  FiHeart,
  FiMessageCircle,
  FiBookmark,
  FiMoreHorizontal,
} from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
const Main = ({
  onLoginToggle,
  setLoginToggle,
  logined,
  setLogined,
  user,
  onAddToggle,
  onLike,
}) => {
  const userinfo = JSON.parse(sessionStorage.getItem("user")) || "";
  const [users, setusers] = useState([]);
  const [articles, setAritcles] = useState([]);
  const [img, setImg] = useState([]);
  const [like, setLike] = useState(false);
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
          console.log("false");
        } else {
          setAritcles(data.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, [articles]);

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
            width: "500px",
            height: "90px",
            border: "1px rgb(209, 209, 209) solid",
            margin: "0 auto",
          }}
        >
          <ul
            className="flex pl-3 items-center gap-7 font-light "
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
                  width: "500px",
                  height: "630px",
                  border: "1px rgb(209, 209, 209) solid",
                  margin: "20px auto",
                }}
              >
                <div className="p-2">
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
                        className=" flex justify-center text-base pt-1 absolute"
                        style={{
                          top: "20%",
                          left: "125%",
                        }}
                      >
                        {article.userid}
                      </div>
                    </a>
                    <button
                      className="text-xl absolute"
                      style={{
                        top: "30%",
                        left: "950%",
                      }}
                    >
                      <FiMoreHorizontal />
                    </button>
                  </div>
                </div>
                <div>
                  {/* ????????? ????????? */}
                  <div
                    style={{
                      height: "380px",
                    }}
                  >
                    <img
                      src={article.imgSrc}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                  {/* ????????? ?????? ?????? */}
                  <div
                    className="p-2 flex items-center"
                    style={{
                      height: "35px",
                    }}
                  >
                    <div className="flex text-2xl gap-3">
                      <button
                        onClick={() => {
                          onLike(article.id, userinfo.userid, article.imgSrc);
                        }}
                      >
                        {article.Liked == "1" ? (
                          <FaHeart
                            style={{
                              color: "pink",
                            }}
                          />
                        ) : (
                          <FiHeart />
                        )}
                      </button>
                      <a href={`/${article.userid}/${article.id}`}>
                        <FiMessageCircle />
                      </a>
                      <button>
                        <FiSend />
                      </button>
                    </div>
                    <button
                      className="flex justify-end text-2xl"
                      style={{
                        width: "100%",
                      }}
                    >
                      <FiBookmark />
                    </button>
                  </div>

                  <div className="pl-2 p-1 font-bold">
                    ????????? {article.imgLike}???
                  </div>
                  <div
                    className="pl-2 flex gap-2"
                    style={{
                      height: "45px",
                    }}
                  >
                    <div className=" font-bold text-ms">{article.userid}</div>
                    <div>????????? ???????????????</div>
                  </div>
                  <div
                    className="pl-2 pb-2"
                    style={{
                      color: "#999999",
                    }}
                  >
                    ?????? {article.imgReply}???
                  </div>
                  <div
                    className=""
                    style={{
                      borderTop: "1px rgb(209, 209, 209) solid",
                    }}
                  >
                    <div
                      className=" flex items-center text-2xl pl-1 gap-2"
                      style={{
                        height: "40px",
                      }}
                    >
                      <FiSmile />
                      <a
                        className="text-sm"
                        style={{
                          color: "#999999",
                        }}
                        href={`/${article.userid}/${article.id}`}
                      >
                        ?????? ??????...
                      </a>
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
