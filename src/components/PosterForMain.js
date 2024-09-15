import image1 from "../assets/image 1.png";
import author from "../assets/author.png";
import space from "../assets/space.png";

// 이미지 리스트 라이브러리
import * as React from "react";
import { useNavigate } from "react-router-dom";
import ButtonBoot from "react-bootstrap/Button";
// 스크롤다이어로그
import ScrollDialog from "../libs/ScrollDialog";
import AuthorEditItem from "../pages/mypage/AuthorEditItem";

// 이미지 라이브러리
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
//!------------------- 메인페이지에 나오는 전시, 프로젝트, 공간리스트 메인 아이템
// type은 누구 메인 페이지인지
const PosterForMain = ({
  whatType,
  id,
  imageurl,
  postName,
  location,
  date,
}) => {
  console.log("Exhibits 유저 타입" + whatType);
  const nav = useNavigate();
  return (
    <div
      onClick={() => {
        switch (whatType) {
          case "space":
          case "author": {
            nav(`/businessiteminfo/${id}`, {
              state: {
                posterId: id,
                userType: whatType,
              },
            });
            return;
          }

          default: {
            // 유저 경우
            nav(`/exhibititeminfo/${id}`);
            return;
          }
        }
      }}
    >
      <div>
        <ImageListItem key={id}>
          <img src={imageurl} />
          <hr style={{ margin: "5px 0" }} />{" "}
          {/* Horizontal line between title and subtitle */}
          <ImageListItemBar
            title={postName + " " + location}
            subtitle={<span>{date}</span>}
            position="below"
          />
          {/* {isDialog && <ScrollDialog />}  */}
        </ImageListItem>
      </div>
    </div>
  );
};

export default PosterForMain;
