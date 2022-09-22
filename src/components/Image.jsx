import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3002";

const Image = ({ images, setImages, user }) => {
  const [content, setContent] = useState("");
  const userinfo = JSON.parse(sessionStorage.getItem("user")) || ""; //현재로그인한 아이
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
      .post(`http://localhost:3002/upload/${userinfo.userid}`, formData)
      .then((res) => {
        const { fileName } = res.data;

        setUploadedImg({ fileName });
        alert("업로드완료");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <form
        onSubmit={onSubmit}
        style={{
          display: "inline-block ",

          position: "absolute",
          left: "50%",
          marginTop: "5px",
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
          value="업로드"
          className="btn"
          onClick={() => {}}
        />
      </form>
    </div>
  );
};
export default Image;
// 문제점 1.이미지를 업로드 해도 02.jpg처럼 파일명이 그대로남아있음.
