// 이미지 라이브러리
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ImageList from "@mui/material/ImageList";
import author from "../../assets/author.png";

import BootModalForAdmin from "../../libs/BootModalForAdmin";
import { useState } from "react";
import MyVerticallyCenteredModal from "../../libs/BootModal";
import BootModalForGetitem from "../../libs/BootModalForGetitem";

const formatDate = (date) => {
  return String(date).replace(/-/g, ".");
};

const BusinessItem = ({
  whatType,
  itemId,
  artistName,
  intro,
  phone,
  startDate,
  endDate,
  city,
  setUpdateCount,
  url,
  title,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const handleItemInfo = () => {
    setModalShow(true);
  };

  console.log("businessitem.js 유저 타입 " + whatType + itemId);

  return (
    <>
      <ImageListItem key={itemId} onClick={() => handleItemInfo()}>
        <img
          src={url}
          style={{ width: 337, height: 480, objectFit: "cover" }}
        />
        <hr style={{ margin: "5px 0" , width:230}} />{" "}
        <ImageListItemBar
          title={
            <span
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                textAlign: "left", // 왼쪽 정렬
                display: "block", // span을 블록 요소로 만들어 줄 전체를 차지하게 함
                width: "100%", // 너비 100%로 설정
              }}
            >
              {title}
            </span>
          }
          subtitle={
            <div style={{ marginTop: 5 }}>
              <span
                style={{
                  color: "gray",

                  fontSize: "10px",
                  textAlign: "left", // 왼쪽 정렬
                  display: "block", // span을 블록 요소로 만들어 줄 전체를 차지하게 함
                  width: "100%", // 너비 100%로 설정
                }}
              >
                {formatDate(startDate) + "~" + formatDate(endDate)}
              </span>
            </div>
          }
          position="below"
        />
      </ImageListItem>
      {/* 단건조회 */}
      {modalShow && (
        <BootModalForGetitem
          show={modalShow}
          onHide={() => setModalShow(false)}
          id={itemId}
          type={whatType}
          setUpdateCount={setUpdateCount}
        />
      )}
    </>
  );
};

export default BusinessItem;
