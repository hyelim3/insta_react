import React, { useState, useEffect } from "react";
import "../styles/Grid.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { AiOutlineMinusCircle } from "react-icons/ai";

const Grid = ({ user, onRemove }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

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

  return (
    <div>
      <section className="mx-auto con section-2 relative">
        <ul className="list-box grid grid-cols-3 gap-2 sm:gap-2 md:gap-3 lg:gap-4">
          {images.map((image, index) => (
            <li
              key={index}
              onClick={() => {
                onDeleteToggle();
                setSelectedImage(image.id);
              }}
            >
              <div>
                <img src={image.imgSrc} />
              </div>
            </li>
          ))}
        </ul>
      </section>
      {deleteToggle && (
        <div className="bg-base-100 shadow-xl deleteBox">
          <div className="card-body">
            <h2 className="card-title">해당 게시물을 정말 삭제하시겠습니까?</h2>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={async () => {
                  onRemove(selectedImage);
                  onDeleteToggle();
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
  //   <div>
  //     <section className="mx-auto con section-2">
  //       <ul className="list-box grid grid-cols-3 gap-2 sm:gap-2 md:gap-3 lg:gap-4">
  //         <li>
  //           <a href="#">
  //             <img src={images[0].imgSrc} alt="" />
  //             <div>
  //               <FontAwesomeIcon icon={faHeart} className="icon" />
  //               <span>{images[0].imgLike}</span>
  //             </div>
  //             <div>
  //               <FontAwesomeIcon icon={faCommentDots} className="icon" />
  //               <span>{images[0].imgReply}</span>
  //             </div>
  //           </a>
  //         </li>
  //         <li>
  //           <a href="#">
  //             <img
  //               src="https://images.pexels.com/photos/4085643/pexels-photo-4085643.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
  //               alt=""
  //             />
  //             <div>
  //               <FontAwesomeIcon icon={faHeart} className="icon" />
  //               <span>22.5K</span>
  //             </div>
  //             <div>
  //               <FontAwesomeIcon icon={faCommentDots} className="icon" />
  //               <span>2.7K</span>
  //             </div>
  //           </a>
  //         </li>
  //         <li>
  //           <a href="#">
  //             <img
  //               src="https://images.pexels.com/photos/4085643/pexels-photo-4085643.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
  //               alt=""
  //             />
  //             <div>
  //               <FontAwesomeIcon icon={faHeart} className="icon" />
  //               <span>22.5K</span>
  //             </div>
  //             <div>
  //               <FontAwesomeIcon icon={faCommentDots} className="icon" />
  //               <span>2.7K</span>
  //             </div>
  //           </a>
  //         </li>
  //         <li>
  //           <a href="#">
  //             <img
  //               src="https://images.pexels.com/photos/4085643/pexels-photo-4085643.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
  //               alt=""
  //             />
  //             <div>
  //               <FontAwesomeIcon icon={faHeart} className="icon" />
  //               <span>22.5K</span>
  //             </div>
  //             <div>
  //               <FontAwesomeIcon icon={faCommentDots} className="icon" />
  //               <span>2.7K</span>
  //             </div>
  //           </a>
  //         </li>
  //         <li>
  //           <a href="#">
  //             <img
  //               src="https://images.pexels.com/photos/13025002/pexels-photo-13025002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  //               alt=""
  //             />
  //             <div>
  //               <FontAwesomeIcon icon={faHeart} className="icon" />
  //               <span>22.5K</span>
  //             </div>
  //             <div>
  //               <FontAwesomeIcon icon={faCommentDots} className="icon" />
  //               <span>2.7K</span>
  //             </div>
  //           </a>
  //         </li>
  //         <li>
  //           <a href="#">
  //             <img
  //               src="https://images.pexels.com/photos/13025002/pexels-photo-13025002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  //               alt=""
  //             />
  //             <div>
  //               <FontAwesomeIcon icon={faHeart} className="icon" />
  //               <span>22.5K</span>
  //             </div>
  //             <div>
  //               <FontAwesomeIcon icon={faCommentDots} className="icon" />
  //               <span>2.7K</span>
  //             </div>
  //           </a>
  //         </li>
  //         <li>
  //           <a href="#">
  //             <img
  //               src="https://images.pexels.com/photos/13025002/pexels-photo-13025002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  //               alt=""
  //             />
  //             <div>
  //               <FontAwesomeIcon icon={faHeart} className="icon" />
  //               <span>22.5K</span>
  //             </div>
  //             <div>
  //               <FontAwesomeIcon icon={faCommentDots} className="icon" />
  //               <span>2.7K</span>
  //             </div>
  //           </a>
  //         </li>
  //         <li>
  //           <a href="#">
  //             <img
  //               src="https://images.pexels.com/photos/13025002/pexels-photo-13025002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  //               alt=""
  //             />
  //             <div>
  //               <FontAwesomeIcon icon={faHeart} className="icon" />
  //               <span>22.5K</span>
  //             </div>
  //             <div>
  //               <FontAwesomeIcon icon={faCommentDots} className="icon" />
  //               <span>2.7K</span>
  //             </div>
  //           </a>
  //         </li>
  //         <li>
  //           <a href="#">
  //             <img
  //               src="https://images.pexels.com/photos/13248509/pexels-photo-13248509.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
  //               alt=""
  //             />
  //             <div>
  //               <FontAwesomeIcon icon={faHeart} className="icon" />
  //               <span>22.5K</span>
  //             </div>
  //             <div>
  //               <FontAwesomeIcon icon={faCommentDots} className="icon" />
  //               <span>2.7K</span>
  //             </div>
  //           </a>
  //         </li>{" "}
  //         <li>
  //           <a href="#">
  //             <img
  //               src="https://images.pexels.com/photos/13248509/pexels-photo-13248509.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
  //               alt=""
  //             />
  //             <div>
  //               <FontAwesomeIcon icon={faHeart} className="icon" />
  //               <span>22.5K</span>
  //             </div>
  //             <div>
  //               <FontAwesomeIcon icon={faCommentDots} className="icon" />
  //               <span>2.7K</span>
  //             </div>
  //           </a>
  //         </li>{" "}
  //         <li>
  //           <a href="#">
  //             <img
  //               src="https://images.pexels.com/photos/13248509/pexels-photo-13248509.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
  //               alt=""
  //             />
  //             <div>
  //               <FontAwesomeIcon icon={faHeart} className="icon" />
  //               <span>22.5K</span>
  //             </div>
  //             <div>
  //               <FontAwesomeIcon icon={faCommentDots} className="icon" />
  //               <span>2.7K</span>
  //             </div>
  //           </a>
  //         </li>{" "}
  //         <li>
  //           <a href="#">
  //             <img
  //               src="https://images.pexels.com/photos/13248509/pexels-photo-13248509.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
  //               alt=""
  //             />
  //             <div>
  //               <FontAwesomeIcon icon={faHeart} className="icon" />
  //               <span>22.5K</span>
  //             </div>
  //             <div>
  //               <FontAwesomeIcon icon={faCommentDots} className="icon" />
  //               <span>2.7K</span>
  //             </div>
  //           </a>
  //         </li>
  //       </ul>
  //     </section>
  //   </div>
  // );
};

export default Grid;
