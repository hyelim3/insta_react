import React, { useState, useEffect } from "react";
import "../styles/Grid.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBars } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FaWindowClose } from "react-icons/fa";
import axios from "axios";
import { AiOutlineMinusCircle } from "react-icons/ai";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

const Grid = ({ user, onRemove, userid, onLike }) => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const id = selectedImage.id || "";
  const windowY = window.scrollY;

  const userinfo = JSON.parse(sessionStorage.getItem("user")) || ""; //현재로그인한 아이
  useEffect(() => {
    AOS.init();
  });

  const onMoveHompage = () => {
    navigate(`/${user.userid}/${id}`);
  };
  useEffect(() => {
    const getImage = async () => {
      try {
        const image = await axios({
          url: `http://localhost:3002/getFiles/${user.userid}`,
          method: "POST",
        });
        setIsLoading(false);
        setImages(image.data); // -> 객체배열.
      } catch (e) {
        setError(e);
      }
    };
    getImage();
  }, [images]); //[images] 이미지가 바뀌면 리렌더링, 계속 실행이 됨

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: `http://localhost:3002/getFiles/${userid}`,
          method: "POST",
        });

        setImages(data.data);
      } catch (e) {
        setError(e);
      }
    };
    getData();
  }, []);

  if (error) {
    return <>에러: {error.message}</>;
  }
  if (isLoading) {
    return <>Loading...</>;
  }

  return userinfo.userid === user.userid ? (
    <section className="mx-auto con section-2 relative">
      <ul className="list-box grid grid-cols-3 gap-2 sm:gap-2 md:gap-3 lg:gap-4">
        {images.map((image, index) => (
          <li
            key={index}
            onClick={() => {
              setSelectedImage(image);
              onMoveHompage();
            }}
          >
            <div>
              <img src={image.imgSrc} />

              <div>
                <FontAwesomeIcon icon={faHeart} className="icon" />
                <span>{image.imgLike}</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faCommentDots} className="icon" />
                <span>{image.imgReply}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button
        className="fixed bg-blue-200 topbtn"
        style={{
          width: "150px",
          height: "40px",
          left: "2%",
          bottom: "2%",
          borderRadius: "15px",
          padding: "10px",
          color: "gray",
        }}
        onClick={() => {
          if (!window.scrollY) return;
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        {" "}
        위로 가기
      </button>
    </section>
  ) : (
    //로그인한 사람에서 다른 유저 게시글 보기
    <div>
      <section className="mx-auto con section-2 relative">
        <ul className="list-box grid grid-cols-3 gap-2 sm:gap-2 md:gap-3 lg:gap-4">
          {images.map((image, index) => (
            <li
              key={index}
              onClick={() => {
                setSelectedImage(image);
                onMoveHompage();
                // onDeleteToggle();
              }}
            >
              <div>
                <img src={image.imgSrc} />
                <div>
                  <FontAwesomeIcon icon={faHeart} className="icon" />
                  <span>{image.imgLike}</span>
                </div>
                <div>
                  <FontAwesomeIcon icon={faCommentDots} className="icon" />
                  <span>{image.imgReply}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {/* 위로가기 버튼 */}
        <button
          className="fixed bg-blue-200 topbtn"
          style={{
            width: "150px",
            height: "40px",
            left: "2%",
            bottom: "2%",
            borderRadius: "15px",
            padding: "10px",
            color: "gray",
          }}
          onClick={() => {
            if (!window.scrollY) return;
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          {" "}
          위로 가기
        </button>
      </section>
    </div>
  );
};
//     <div>
//       <section className="mx-auto con section-2 relative">
//         <ul className="list-box grid grid-cols-3 gap-2 sm:gap-2 md:gap-3 lg:gap-4">
//           {images.map((image, index) => (
//             <li
//               key={index}
//               onClick={() => {
//                 onDeleteToggle();
//                 setSelectedImage(image.id);
//               }}
//             >
//               <div>
//                 <img src={image.imgSrc} />
//               </div>
//             </li>
//           ))}
//         </ul>
//       </section>
//       {deleteToggle && (
//         <div className="bg-base-100 shadow-xl deleteBox">
//           <div className="card-body">
//             <h2 className="card-title">해당 게시물을 정말 삭제하시겠습니까?</h2>
//             <div className="card-actions justify-end">
//               <button
//                 className="btn btn-primary"
//                 onClick={async () => {
//                   onRemove(selectedImage);
//                   onDeleteToggle();
//                 }}
//               >
//                 네
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   ) : (
//     <div>
//       <section className="mx-auto con section-2 relative">
//         <ul className="list-box grid grid-cols-3 gap-2 sm:gap-2 md:gap-3 lg:gap-4">
//           {images.map((image, index) => (
//             <li
//               key={index}
//               onClick={() => {
//                 onDeleteToggle();
//                 setSelectedImage(image.id);
//               }}
//             >
//               <div>
//                 <img src={image.imgSrc} />
//               </div>
//             </li>
//           ))}
//         </ul>
//       </section>
//     </div>
//   );
// };

export default Grid;
