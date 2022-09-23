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

const Grid = ({ user, onRemove }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  const [detailToggle, setDetailToggle] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const windowY = window.scrollY;

  const userinfo = JSON.parse(sessionStorage.getItem("user")) || ""; //현재로그인한 아이
  useEffect(() => {
    AOS.init();
  });
  useEffect(() => {
    const getImage = async () => {
      try {
        const image = await axios({
          url: "http://localhost:3002/getFiles",
          method: "GET",
        });
        setIsLoading(false);
        setImages(image.data); // -> 객체배열.
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
    getImage();
  }, []);

  useEffect(() => {
    const getImage = async () => {
      try {
        const image = await axios({
          url: `http://localhost:3002/getFiles/${user.userid}`,
          method: "POST",
        });
        setIsLoading(false);
        setImages(image.data); // -> 객체배열.
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
    getImage();
  }, [images]);

  if (error) {
    return <>에러: {error.message}</>;
  }
  if (isLoading) {
    return <>Loading...</>;
  }

  const onDeleteToggle = () => {
    setDeleteToggle(!deleteToggle);
  };

  const onMenuToggle = () => {
    setMenuToggle(!menuToggle);
  };
  const onDetailToggle = () => {
    setDetailToggle(!detailToggle);
  };

  return userinfo.userid === user.userid ? (
    <section className="mx-auto con section-2 relative">
      {detailToggle && (
        <div className="">
          <div
            className="articleDetail"
            style={{ marginTop: `${windowY - 450}px` }}
          >
            <button onClick={() => {}}></button>

            <div className="imgBox">
              <img src={selectedImage.imgSrc} alt="" />
            </div>
            <div className="flex flex-raw mt-3">
              <div style={{ marginLeft: "10px" }}>
                <FontAwesomeIcon icon={faHeart} className="icon" />
                <span> 좋아요 {selectedImage.imgLike}</span>
              </div>
              <div className="ml-4">
                <FontAwesomeIcon icon={faCommentDots} className="icon" />
                <span> 댓글 {selectedImage.imgReply}</span>
              </div>
            </div>
            <div className="replyBox flex">
              <button
                onClick={() => {
                  setDetailToggle(false);
                  setMenuToggle(false);
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
                      right: "15%",
                      top: "5%",
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "rgba(0,0,0, 0.05)",
                      width: "100px",
                      gap: "10px",
                    }}
                    // data-aos="fade-left"
                    // //움직임, 애니메이션 효과
                  >
                    <button>수정</button>
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
              <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 img-Box ml-2 mt-2">
                <a href={user.userid}>
                  <img src={user.imgSrc} alt="" />
                </a>
              </div>
              <div className="replyUserBox mt-4">
                <div>
                  <a href={user.userid}>
                    <span>{user.userid}</span>
                  </a>
                </div>
                <div
                  style={{
                    borderBottom: "2px gray solid",
                    marginTop: "35px",
                    marginLeft: "-65px",
                    width: "483px",
                  }}
                ></div>
                <div
                  style={{
                    // border: "1px red solid",
                    width: "400px",
                    height: "400px",
                    marginLeft: "-30px",
                    marginTop: "10px",
                  }}
                >
                  <span>{selectedImage.body}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {deleteToggle && (
        <div
          className="bg-base-100 shadow-xl deleteBox"
          style={{ marginTop: `${windowY - 250}px`, zIndex: "998" }}
        >
          <div className="card-body">
            <h2 className="card-title">해당 게시물을 정말 삭제하시겠습니까?</h2>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={async () => {
                  onRemove(selectedImage.id);
                  onDeleteToggle();
                  setDetailToggle(false);
                  setMenuToggle(false);
                }}
              >
                네
              </button>
            </div>
          </div>
        </div>
      )}
      <ul className="list-box grid grid-cols-3 gap-2 sm:gap-2 md:gap-3 lg:gap-4">
        {images.map((image, index) => (
          <li
            key={index}
            onClick={() => {
              setSelectedImage(image);

              onDetailToggle();
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
    <div>
      <section className="mx-auto con section-2 relative">
        <ul className="list-box grid grid-cols-3 gap-2 sm:gap-2 md:gap-3 lg:gap-4">
          {images.map((image, index) => (
            <li
              key={index}
              onClick={() => {
                setSelectedImage(image);

                onDetailToggle();
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
