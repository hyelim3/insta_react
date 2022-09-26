import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Loginedprofile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import userEvent from "@testing-library/user-event";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GrFormClose } from "react-icons/gr";

function LoginedProfile({ user, setUser, userid, onFollow, onProfileToggle }) {
  const [error, setError] = useState(null);
  const userinfo = JSON.parse(sessionStorage.getItem("user")) || ""; //현재로그인한 아이
  const navigate = useNavigate();
  const onMoveHomepage = () => {
    navigate(-1);
  };

  const [usename, setUseName] = useState("");
  const [introduce, setIntroduce] = useState("");
  const onChangeUsename = (e) => {
    setUseName(e.target.value);
  };

  const onChangeIntroduce = (e) => {
    setIntroduce(e.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: `http://localhost:3002/getMember/${userid}`,
          method: "POST",
        });
        setUser(data.data); // -> 객체배열.

        // console.log(image.data);
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 3000);
        });
      } catch (e) {
        setError(e);
      }
    };
    getData();
  }, [user]);

  useEffect(() => {
    setUseName(userinfo.usename);
  }, []);

  useEffect(() => {
    setIntroduce(userinfo.introduce);
  }, []);

  const [content, setContent] = useState("");

  const [uploadedImg, setUploadedImg] = useState({
    fileName: "",
    fillPath: "",
  });

  const fileAdd = () => {
    let file = document.getElementById("fileAdd");
    file.click();
  };

  const onChange = (e) => {
    setContent(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (content == "" || content == undefined || content == null) {
      window.alert("사진 파일을 선택 후 변경 버튼을 눌러주세요");
      return;
    }
    const formData = new FormData();
    formData.append("img", content);
    axios
      .post(`http://localhost:3002/upload/${user.userid}`, formData)
      .then((res) => {
        const { fileName } = res.data;

        setUploadedImg({ fileName });
        alert("업로드완료");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return userinfo.userid === user.userid ? (
    <div className="flex-col flex  h-128 Profiles">
      <div>
        <form
          onSubmit={onSubmit}
          style={{
            display: "inline-block ",
          }}
        >
          <div id="uploadDiv ">
            <input
              id="fileAdd"
              type="file"
              onChange={onChange}
              style={{
                cursor: "pointer",
              }}
            />
          </div>
          <input
            type="submit"
            value="Upload"
            className="btn"
            onClick={() => {}}
          />
        </form>
      </div>
      <div className="flex h-3/5 ">
        <div className="flex justify-center items-center w-1/3 ">
          <div className="avatar">
            <div className="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user.imgSrc} alt="" />
            </div>
          </div>
        </div>
        <div className="w-2/3 ">
          <div className="flex justify-end items-center h-2/5">
            <div className="text-2xl font-light mr-auto mt-2">
              {user.username}님
            </div>
            <button className="rounded-md border-gray-400 bg-white text-black hover:bg-white text-black hover:rounded-md hover:border-gray-400 btn btn-sm mt-2 mr-4">
              메시지 보내기
            </button>
            <button className="rounded-md border-gray-400 bg-white text-black hover:bg-white text-black hover:rounded-md hover:border-gray-400 btn btn-sm mt-2 mr-4">
              팔로우
            </button>
            {/* <button
              onClick={() => {
                onProfileToggle();
              }}
            ></button>
            {onProfileToggle && ( */}
            <div>
              <a href="#update">
                <FiMoreHorizontal />
              </a>
              <div className="modal" id="update">
                <div className="hero flex items-center justify-center min-h-screen absolute top-0">
                  <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                      <div className="card-body">
                        <div className="form-control mt-5">
                          <button
                            type="submit"
                            onClick={onSubmit}
                            className="btn btn-ghost"
                          >
                            프로필 사진 바꾸기
                          </button>
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">이름</span>
                          </label>
                          <input
                            placeholder="이름을 입력해주세요."
                            className="input input-bordered"
                            onChange={onChangeUsename}
                            value={usename}
                          />
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">소개</span>
                          </label>
                          <input
                            type="text"
                            placeholder="소개글"
                            className="input input-bordered"
                            onChange={onChangeIntroduce}
                            value={introduce}
                          />
                        </div>
                        <div className="form-control mt-5">
                          <button
                            // type="submit"
                            // onClick={onSubmit}
                            className="btn btn-primary bg-indigo-600"
                          >
                            프로필 수정
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            onMoveHomepage();
                          }}
                        >
                          <GrFormClose
                            style={{
                              position: "absolute",
                              right: "0",
                              top: "-1",
                              fontSize: "1.5rem",
                              color: "black",
                              cursor: "pointer",
                            }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-1/5">
            <div className=" h-16 ">
              <a href="" className="mr-20">
                게시물
                <span
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  {user.article}
                </span>
              </a>

              <a href="" className="mr-20">
                팔로워
                <span
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  {user.follower}
                </span>
              </a>
              <a href="" className="mr-20">
                팔로우
                <span
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  {user.follow}
                </span>
              </a>
            </div>
          </div>
          <div className="h-2/5">
            <div className="font-bold text-blue-900 mt-3">
              {/* <a href="https://github.com/hyelim3">github.com/hyelim3</a> */}
            </div>
            <div className=" font-bold m-0 py-1">{userinfo.usename}</div>
            <div className=" py-1">{userinfo.introduce}</div>
          </div>
        </div>
      </div>
      <div className="flex justify-around items-center h-1/5 stories">
        <div className="avatar ">
          <div className=" relative w-20 rounded-full ring ring-offset-base-100 ring-offset-2">
            <a href="">
              <div className="addHilight">
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </a>
          </div>
        </div>
        <span className="addHilightSpan"> 하이라이트 추가</span>
        <div className="avatar">
          <div className="w-20 rounded-full ring  ring-offset-base-100 ring-offset-2">
            <a href="">
              <img src="https://i.picsum.photos/id/1043/5184/3456.jpg?hmac=wsz2e0aFKEI0ij7mauIr2nFz2pzC8xNlgDHWHYi9qbc" />
            </a>
          </div>
        </div>
        <div className="avatar">
          <div className=" w-20 rounded-full ring ring-offset-base-100 ring-offset-2">
            <a href="">
              <img src="https://i.picsum.photos/id/1060/5598/3732.jpg?hmac=31kU0jp5ejnPTdEt-8tAXU5sE-buU-y1W1qk_BsiUC8" />
            </a>
          </div>
        </div>
        <div className="avatar">
          <div className=" w-20 rounded-full ring ring-offset-base-100 ring-offset-2">
            <a href="">
              <img src="https://i.picsum.photos/id/164/1200/800.jpg?hmac=wkqGUkaeW3kiAsHq_VwxSWWossIMAwFV4eUfFzuDkew" />
            </a>
          </div>
        </div>
        <div className="avatar">
          <div className="  mr-16 w-20 rounded-full ring  ring-offset-base-100 ring-offset-2">
            <a href="">
              <img src="https://i.picsum.photos/id/120/4928/3264.jpg?hmac=i-8mkfKj_gRyQt9ZJVhbIBXbtIBNcsbI_gwNe_39vus" />
            </a>
          </div>
        </div>
      </div>
      <div className="tabs flex justify-center mt-9">
        <a className="tab tab-bordered tab-active">게시글</a>
        <a className="tab tab-bordered ">태그 됨</a>
      </div>
    </div>
  ) : (
    <div className="flex-col flex  h-128 Profiles">
      <div className="flex h-3/5 ">
        <div className="flex justify-center items-center w-1/3 ">
          <div className="avatar">
            <div className="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user.imgSrc} alt="" />
            </div>
          </div>
        </div>
        <div className="w-2/3 ">
          <div className="flex justify-end items-center h-2/5">
            <div className="text-2xl font-light mr-auto mt-2">
              {user.username}님
            </div>
            <button className="rounded-md border-gray-400 bg-white text-black hover:bg-white text-black hover:rounded-md hover:border-gray-400 btn btn-sm mt-2 mr-4">
              메시지 보내기
            </button>
            <button
              className="rounded-md border-gray-400 bg-white text-black hover:bg-white text-black hover:rounded-md hover:border-gray-400 btn btn-sm mt-2 mr-4"
              onClick={() => {
                alert("팔로우를 하시겠습니까?");
                onFollow(userinfo.userid, user.userid);
              }}
            >
              팔로우
            </button>
            <button className="mr-auto flex justify mt-4">
              <i className="fi fi-bs-menu-dots"></i>
            </button>
          </div>

          <div className="h-1/5">
            <div className=" h-16 ">
              <a href="" className="mr-20">
                게시물
                <span
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  {user.article}
                </span>
              </a>

              <a href="" className="mr-20">
                팔로워
                <span
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  {user.follower}
                </span>
              </a>
              <a href="" className="mr-20">
                팔로우
                <span
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  {user.follow}
                </span>
              </a>
            </div>
          </div>
          <div className="h-2/5">
            <div className=" font-bold m-0 py-1">풀스택 A조</div>
            <div className=" py-1">instagram</div>
            <div className="font-bold text-blue-900 mt-1">
              <a href="https://github.com/hyelim3">github.com/hyelim3</a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-around items-center h-1/5 stories">
        <div className="avatar ">
          <div className=" relative w-20 rounded-full ring ring-offset-base-100 ring-offset-2">
            <a href="">
              <div className="addHilight">
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </a>
          </div>
        </div>
        <span className="addHilightSpan"> 하이라이트 추가</span>
        <div className="avatar">
          <div className="w-20 rounded-full ring  ring-offset-base-100 ring-offset-2">
            <a href="">
              <img src="https://i.picsum.photos/id/1043/5184/3456.jpg?hmac=wsz2e0aFKEI0ij7mauIr2nFz2pzC8xNlgDHWHYi9qbc" />
            </a>
          </div>
        </div>
        <div className="avatar">
          <div className=" w-20 rounded-full ring ring-offset-base-100 ring-offset-2">
            <a href="">
              <img src="https://i.picsum.photos/id/1060/5598/3732.jpg?hmac=31kU0jp5ejnPTdEt-8tAXU5sE-buU-y1W1qk_BsiUC8" />
            </a>
          </div>
        </div>
        <div className="avatar">
          <div className=" w-20 rounded-full ring ring-offset-base-100 ring-offset-2">
            <a href="">
              <img src="https://i.picsum.photos/id/164/1200/800.jpg?hmac=wkqGUkaeW3kiAsHq_VwxSWWossIMAwFV4eUfFzuDkew" />
            </a>
          </div>
        </div>
        <div className="avatar">
          <div className="  mr-16 w-20 rounded-full ring  ring-offset-base-100 ring-offset-2">
            <a href="">
              <img src="https://i.picsum.photos/id/120/4928/3264.jpg?hmac=i-8mkfKj_gRyQt9ZJVhbIBXbtIBNcsbI_gwNe_39vus" />
            </a>
          </div>
        </div>
      </div>
      <div className="tabs flex justify-center mt-9">
        <a className="tab tab-bordered tab-active">게시글</a>
        <a className="tab tab-bordered ">태그 됨</a>
      </div>
    </div>
  );
}

export default LoginedProfile;
