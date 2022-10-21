import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaWindowClose } from "react-icons/fa";
import {
  faHeart,
  faBars,
  faArrowRight,
  faArrowLeft,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import {
  FiSmile,
  FiSend,
  FiHeart,
  FiMessageCircle,
  FiBookmark,
  FiMoreHorizontal,
} from "react-icons/fi";
import axios from "axios";
import {
  useNavigate,
  useParams,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import LoginedHead from "./LoginedHead";
import UnLoginedHead from "./UnLoginedHead";

const GridDetail = ({
  user,
  onLike,
  onRemove,
  deleteToggle,
  onDeleteToggle,
  setDeleteToggle,
  menuToggle,
  setMenuToggle,
  onMenuToggle,
  onLoginToggle,
  setLoginToggle,
  logined,
  setLogined,
  setUser,
  onSearch,
  loginToggle,
  setAddImageToggle,
  onAddImageToggle,
  searchedList,
  setSearchedList,
}) => {
  const userinfo = JSON.parse(sessionStorage.getItem("user")) || "";
  const [img, setImg] = useState([]);
  const [like, setLike] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [replyValue, setReplyValue] = useState("");
  const [replies, setReplies] = useState([]);
  const [replyUser, setReplyUser] = useState([]);
  const [editToggle, setEditToggle] = useState(false);
  const onEditChange = (e) => {
    setEditToggle(!editToggle);
  };
  const onReplyChange = (e) => {
    setReplyValue(e.target.value);
  };
  const onNextHomepage = (num) => {
    navigate(`/${user.userid}/${num}`);
  };
  const onPrevHomepage = (num) => {
    navigate(`/${user.userid}/${num}`);
  };
  const onMoveHomepage = () => {
    navigate(-1);
  };

  useEffect(() => {
    AOS.init();
  });
  //   const onPrev = async () => {
  //     try {
  //       const data = await axios.get(
  //         `http://localhost:3002/prevImage?id=${id}&userid=${user.userid}`
  //       );
  //       if (data.data == false) {
  //         window.alert("마지막 게시글입니다.");
  //       } else {
  //         setReplyValue("");
  //         onPrevHomepage(data.data.id);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   const onNext = async () => {
  //     try {
  //       const data = await axios.get(
  //         `http://localhost:3002/nextImage?id=${id}&userid=${user.userid}`
  //       );
  //       if (data.data == false) {
  //         window.alert("마지막 게시글입니다.");
  //       } else {
  //         setReplyValue("");
  //         onNextHomepage(data.data.id);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //디테일 게시글 사진
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: `http://localhost:3002/getImage/${id}`,
          method: "GET",
        });
        setImg(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  //게시글 올린사람 user
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: `http://localhost:3002/getUser/${id}`,
          method: "GET",
        });
        setUser(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);
  //   const onReply = async (articleid, userid, reply) => {
  //     try {
  //       const data = await axios.post(
  //         `http://localhost:3002/instaReply?id=${articleid}&userid=${userid}`,
  //         { reply }
  //       );
  //       setReplies(data.data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const data = await axios({
  //         url: `http://localhost:3002/getReplies/${id}`,
  //         method: "GET",
  //       });
  //       if (data.data == false) {
  //         setReplies([]);
  //       } else {
  //         setReplies(data.data);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   getData();
  // }, []);

  //   useEffect(() => {
  //     const getData = async () => {
  //       try {
  //         const data = await axios({
  //           url: `http://localhost:3002/getReplies/${id}`,
  //           method: "GET",
  //         });
  //         if (data.data == false) {
  //           setReplies([]);
  //         } else {
  //           setReplies(data.data);
  //         }
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     };
  //     getData();
  //   }, [id]);

  //   useEffect(() => {
  //     const getData = async () => {
  //       try {
  //         const data = await axios({
  //           url: `http://localhost:3002/isLiked?userid=${userinfo.userid}&id=${id}`,
  //           method: "GET",
  //         });
  //         setLike(data.data);
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     };
  //     getData();
  //   }, [img.imgLike]);

  //   useEffect(() => {
  //     const getData = async () => {
  //       try {
  //         const data = await axios({
  //           url: `http://localhost:3002/getImage/${id}`,
  //           method: "GET",
  //         });

  //         setImg(data.data);
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     };
  //     getData();
  //   }, [img]);

  return userinfo.userid === user.userid ? (
    <div>
      <LoginedHead
        onLoginToggle={onLoginToggle}
        setLoginToggle={setLoginToggle}
        logined={logined}
        setLogined={setLogined}
        user={user}
        setUser={setUser}
        onSearch={onSearch}
        setAddImageToggle={setAddImageToggle}
        onAddImageToggle={onAddImageToggle}
        searchedList={searchedList}
        setSearchedList={setSearchedList}
        userid={id}
      />
      {/* {editToggle && (
        <GridEdit
          setEditToggle={setEditToggle}
          userid={id}
          user={user}
          img={img}
        />
      )} */}
      <div className="detailBox">
        <div className="articleDetail">
          {/* <div
            style={{
              position: "absolute",
              top: "85%",
              left: "2%",
              zIndex: "999",
              backgroundColor: "black",
              borderRadius: "50%",
              width: "30px",
              textAlign: "center",
            }}
          >
            <button
              onClick={() => {
                // onPrev();
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          </div> */}
          {/* <div
            style={{
              position: "absolute",
              top: "85%",
              right: "2%",
              zIndex: "999",
              backgroundColor: "black",
              borderRadius: "50%",
              width: "30px",
              textAlign: "center",
            }}
          >
            <button
              onClick={() => {
                // onNext();
              }}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div> */}

          <div className="imgBox my-20">
            <img src={img.imgSrc} alt="" />
          </div>

          <div className="replyBox flex">
            <button
              onClick={() => {
                setMenuToggle(false);
                onMoveHomepage();
              }}
            >
              <FaWindowClose
                style={{
                  position: "absolute",
                  right: "2",
                  top: "2",
                  fontSize: "1.5rem",
                  color: "black",
                  cursor: "pointer",
                }}
              />
            </button>

            <div>
              <button
                onClick={() => {
                  onMenuToggle();
                  setDeleteToggle(false);
                }}
              >
                <FontAwesomeIcon
                  icon={faBars}
                  style={{
                    fontSize: "1.2rem",
                    position: "absolute",
                    right: "1%",
                    top: "5%",
                  }}
                />
              </button>

              {menuToggle && (
                <div
                  style={{
                    position: "absolute",
                    right: "5%",
                    top: "5%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                    width: "100px",
                    gap: "10px",
                    zIndex: "999",
                  }}
                  data-aos="fade-left"
                >
                  <button
                    onClick={() => {
                      onEditChange();
                    }}
                  >
                    수정
                  </button>
                  <button
                    onClick={() => {
                      onDeleteToggle();
                    }}
                  >
                    삭제
                  </button>
                  <button
                    onClick={() => {
                      onMenuToggle();
                    }}
                  >
                    취소
                  </button>
                </div>
              )}
            </div>
            <div>
              <a href={`http://localhost:3000/${userinfo.userid}`}>
                <img
                  className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 ml-2 mt-4"
                  style={{
                    height: "50px",
                  }}
                  src={userinfo.userimgSrc}
                  alt=""
                />
              </a>
            </div>
            <div className="replyUserBox mt-7">
              <div>
                <a href={`http://localhost:3000/${userinfo.userid}`}>
                  <span>{userinfo.userid}</span>
                </a>
              </div>
              <div
                style={{
                  borderBottom: "2px gray solid",
                  marginTop: "28px",
                  marginLeft: "-65px",
                  width: "470px",
                }}
              ></div>
              <div
                style={{
                  width: "100px",
                  height: "10px",
                  marginLeft: "-30px",

                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                <span>{img.regDate}</span>
              </div>
              <div
                style={{
                  width: "400px",
                  height: "100px",
                  marginLeft: "-30px",
                  marginTop: "10px",
                }}
              >
                <span>{img.body}</span>
              </div>
              {/* 9.27 댓글테이블 수정 */}
              {/* CREATE TABLE reply_table (
id INT AUTO_INCREMENT PRIMARY KEY,
articleid INT,
replyid VARCHAR(50),
replyusername VARCHAR(30),
replyuserImgSrc VARCHAR(255),
reply VARCHAR(255)
); */}
              <div
                style={{
                  width: "400px",
                  height: "300px",
                  marginLeft: "-50px",
                  marginTop: "10px",
                  overflow: "auto",
                  position: "relative",
                }}
              >
                <ul>
                  {replies.map((reply, id) => (
                    <li key={id}>
                      <div className="flex gap-1">
                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 img-Box ml-2 mt-2">
                          <a href={`http://localhost:3000/${reply.replyid}`}>
                            <img
                              src={
                                reply.replyuserImgSrc != undefined
                                  ? reply.replyuserImgSrc
                                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_8odrQguUEk4y0r47v-EpBtqpn-Iw3WiErA&usqp=CAU"
                              }
                              alt=""
                            />
                          </a>
                        </div>
                        <div>
                          <div className="searchedName">
                            <span>
                              <a
                                href={`http://localhost:3000/${reply.replyid}`}
                              >
                                {reply.replyusername}
                              </a>
                            </span>
                          </div>
                          <div className="searchedId">
                            <a href={`http://localhost:3000/${reply.replyid}`}>
                              <span>{reply.replyid}</span>
                            </a>
                          </div>
                          <div
                            style={{
                              transform: "translate(40%,-120%)",
                              width: "230px",
                            }}
                          >
                            <span>{reply.reply}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                style={{
                  marginTop: "60px",
                  borderBottom: "2px gray solid",
                  marginLeft: "-65px",
                  width: "470px",
                }}
              ></div>
              <div
                className="pt-1"
                style={{
                  marginLeft: "-60%",
                }}
              >
                <button
                  style={{
                    fontSize: "1.6rem",
                  }}
                  onClick={() => {
                    //   onLike(img.id, userinfo.userid, img.imgSrc);
                  }}
                >
                  {like ? (
                    <FiHeart
                      style={{
                        color: "pink",
                      }}
                    />
                  ) : (
                    <FiHeart />
                  )}
                </button>
                <button
                  className="pl-2"
                  style={{
                    fontSize: "1.6rem",
                  }}
                >
                  <FiMessageCircle />
                </button>
                <div
                  className="font-bold"
                  style={{
                    fontSize: "1rem",
                    display: "inline-block",
                    width: "300px",
                  }}
                >
                  {userinfo.imgLike}명이 좋아합니다.
                </div>
              </div>
              <div
                style={{
                  marginLeft: "-60%",
                  marginTop: "40px",
                  position: "relative",
                  width: "450px",
                }}
              >
                <input
                  type="text"
                  placeholder="댓글 달기.."
                  onChange={onReplyChange}
                  value={replyValue}
                  style={{
                    width: "400px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    right: "0%",
                    top: "5%",
                  }}
                >
                  <button
                    onClick={() => {
                      if (replyValue == "") {
                        window.alert("댓글 내용을 입력해 주세요");
                        return;
                      }
                      //   if (onReply(id, userinfo.userid, replyValue)) {
                      //     window.alert("댓글 작성이 완료되었습니다.");
                      //     setReplyValue("");
                      //   }
                    }}
                  >
                    <FontAwesomeIcon icon={faComments} className="icon" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {deleteToggle && (
        <div
          className="bg-base-100 shadow-xl deleteBox"
          style={{ zIndex: "998" }}
        >
          <div className="card-body">
            <h2 className="card-title">해당 게시물을 정말 삭제하시겠습니까?</h2>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={async () => {
                  onRemove(id);
                  onMoveHomepage();
                  onDeleteToggle();
                  setMenuToggle(false);
                }}
              >
                네
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div>
      <LoginedHead
        onLoginToggle={onLoginToggle}
        setLoginToggle={setLoginToggle}
        logined={logined}
        setLogined={setLogined}
        user={user}
        setUser={setUser}
        onSearch={onSearch}
        setAddImageToggle={setAddImageToggle}
        onAddImageToggle={onAddImageToggle}
        searchedList={searchedList}
        setSearchedList={setSearchedList}
        userid={id}
      />
      {/* {editToggle && (
        <GridEdit
          setEditToggle={setEditToggle}
          userid={id}
          user={user}
          img={img}
        />
      )} */}
      <div className="detailBox">
        <div className="articleDetail">
          {/* <div
            style={{
              position: "absolute",
              top: "85%",
              left: "2%",
              zIndex: "999",
              backgroundColor: "black",
              borderRadius: "50%",
              width: "30px",
              textAlign: "center",
            }}
          >
            <button
              onClick={() => {
                // onPrev();
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          </div> */}
          {/* <div
            style={{
              position: "absolute",
              top: "85%",
              right: "2%",
              zIndex: "999",
              backgroundColor: "black",
              borderRadius: "50%",
              width: "30px",
              textAlign: "center",
            }}
          >
            <button
              onClick={() => {
                // onNext();
              }}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div> */}

          <div className="imgBox my-20">
            <img src={img.imgSrc} alt="" />
          </div>

          <div className="replyBox flex">
            <button
              onClick={() => {
                setMenuToggle(false);
                onMoveHomepage();
              }}
            >
              <FaWindowClose
                style={{
                  position: "absolute",
                  right: "2",
                  top: "2",
                  fontSize: "1.5rem",
                  color: "black",
                  cursor: "pointer",
                }}
              />
            </button>

            <div>
              <a href={`http://localhost:3000/${user.userid}`}>
                <img
                  className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 ml-2 mt-4"
                  style={{
                    height: "50px",
                  }}
                  src={user.userimgSrc}
                  alt=""
                />
              </a>
            </div>
            <div className="replyUserBox mt-7">
              <div>
                <a href={`http://localhost:3000/${user.userid}`}>
                  <span>{user.userid}</span>
                </a>
              </div>
              <div
                style={{
                  borderBottom: "2px gray solid",
                  marginTop: "28px",
                  marginLeft: "-65px",
                  width: "470px",
                }}
              ></div>
              <div
                style={{
                  width: "100px",
                  height: "10px",
                  marginLeft: "-30px",

                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                <span>{img.regDate}</span>
              </div>
              <div
                style={{
                  width: "400px",
                  height: "100px",
                  marginLeft: "-30px",
                  marginTop: "10px",
                }}
              >
                <span>{img.body}</span>
              </div>
              {/* 9.27 댓글테이블 수정 */}
              {/* CREATE TABLE reply_table (
id INT AUTO_INCREMENT PRIMARY KEY,
articleid INT,
replyid VARCHAR(50),
replyusername VARCHAR(30),
replyuserImgSrc VARCHAR(255),
reply VARCHAR(255)
); */}
              <div
                style={{
                  width: "400px",
                  height: "300px",
                  marginLeft: "-50px",
                  marginTop: "10px",
                  overflow: "auto",
                  position: "relative",
                }}
              >
                <ul>
                  {replies.map((reply, id) => (
                    <li key={id}>
                      <div className="flex gap-1">
                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 img-Box ml-2 mt-2">
                          <a href={`http://localhost:3000/${reply.replyid}`}>
                            <img
                              src={
                                reply.replyuserImgSrc != undefined
                                  ? reply.replyuserImgSrc
                                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_8odrQguUEk4y0r47v-EpBtqpn-Iw3WiErA&usqp=CAU"
                              }
                              alt=""
                            />
                          </a>
                        </div>
                        <div>
                          <div className="searchedName">
                            <span>
                              <a
                                href={`http://localhost:3000/${reply.replyid}`}
                              >
                                {reply.replyusername}
                              </a>
                            </span>
                          </div>
                          <div className="searchedId">
                            <a href={`http://localhost:3000/${reply.replyid}`}>
                              <span>{reply.replyid}</span>
                            </a>
                          </div>
                          <div
                            style={{
                              transform: "translate(40%,-120%)",
                              width: "230px",
                            }}
                          >
                            <span>{reply.reply}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                style={{
                  marginTop: "60px",
                  borderBottom: "2px gray solid",
                  marginLeft: "-65px",
                  width: "470px",
                }}
              ></div>
              <div
                className="pt-1"
                style={{
                  marginLeft: "-60%",
                }}
              >
                <button
                  style={{
                    fontSize: "1.6rem",
                  }}
                  onClick={() => {
                    //   onLike(img.id, userinfo.userid, img.imgSrc);
                  }}
                >
                  {like ? (
                    <FiHeart
                      style={{
                        color: "pink",
                      }}
                    />
                  ) : (
                    <FiHeart />
                  )}
                </button>
                <button
                  className="pl-2"
                  style={{
                    fontSize: "1.6rem",
                  }}
                >
                  <FiMessageCircle />
                </button>
                <div
                  className="font-bold"
                  style={{
                    fontSize: "1rem",
                    display: "inline-block",
                    width: "300px",
                  }}
                >
                  {userinfo.imgLike}명이 좋아합니다.
                </div>
              </div>
              <div
                style={{
                  marginLeft: "-60%",
                  marginTop: "40px",
                  position: "relative",
                  width: "450px",
                }}
              >
                <input
                  type="text"
                  placeholder="댓글 달기.."
                  onChange={onReplyChange}
                  value={replyValue}
                  style={{
                    width: "400px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    right: "0%",
                    top: "5%",
                  }}
                >
                  <button
                    onClick={() => {
                      if (replyValue == "") {
                        window.alert("댓글 내용을 입력해 주세요");
                        return;
                      }
                      //   if (onReply(id, userinfo.userid, replyValue)) {
                      //     window.alert("댓글 작성이 완료되었습니다.");
                      //     setReplyValue("");
                      //   }
                    }}
                  >
                    <FontAwesomeIcon icon={faComments} className="icon" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {deleteToggle && (
        <div
          className="bg-base-100 shadow-xl deleteBox"
          style={{ zIndex: "998" }}
        >
          <div className="card-body">
            <h2 className="card-title">해당 게시물을 정말 삭제하시겠습니까?</h2>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={async () => {
                  onRemove(id);
                  onMoveHomepage();
                  onDeleteToggle();
                  setMenuToggle(false);
                }}
              >
                네
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GridDetail;
