// 이미지 라이브러리
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ImageList from "@mui/material/ImageList";

import Stack from "@mui/material/Stack";

import author from "../../assets/author.png";

import BootModalForAdmin from "../../libs/BootModalForAdmin";
import { useState } from "react";
import { useEffect } from "react";

import Button from "@mui/material/Button";
// 이모지
import AddIcon from "@mui/icons-material/Add";
// api
import { onGetOneAuthorProjectsHandler } from "../../apis/servicehandeler/AuthorApiHandler";
import { onGetOneSpaceProjectsHandler } from "../../apis/servicehandeler/SpaceApiHandler";

import BusinessItem from "./BusinessItem";

// 모달
import MyVerticallyCenteredModal from "../../libs/BootModal";

const BusinessItemList = ({ whatType }) => {
  const [modalShow, setModalShow] = useState(false); // 드랍다운
  const [mockData, setMockData] = useState([{}]); // 받는 형식이 배열 안 객체라
  const [updateCount, setUpdateCount] = useState(0); // 매칭 상태 변화에 따라 리랜더링

  const addPoster = () => {
    setModalShow(true);
  };

  // 비즈니스 아이템 data 가져오기
  useEffect(() => {
    let userId = localStorage.getItem("userId");
    if (whatType == "author") {
      onGetOneAuthorProjectsHandler({ authorId: userId }, (response) => {
        if (Array.isArray(response.data)) {
          setMockData(response.data);
        } else {
          console.error("응답 데이터가 배열이 아닙니다.");
        }
      });
    } else if (whatType == "space") {
      onGetOneSpaceProjectsHandler({ spaceId: userId }, (response) => {
        if (Array.isArray(response.data)) {
          setMockData(response.data);
        } else {
          console.error("응답 데이터가 배열이 아닙니다.");
        }
      });
    } else {
      console.log("비즈니스 아이템 조회 잘못된 접근");
    }
  }, [updateCount]); // businessInfoState 객체의 모든 변경에 반응

  return (
    <>
      <Stack
        justifyContent="center" // 가로 방향으로 중앙 정렬
        alignItems="center" // 세로 방향으로 중앙 정렬
        style={{ marginTop: -23, marginBottom: 75, marginLeft: 5 }}
      >
        <ImageList
          sx={{ width: "100%", height: "auto", overflowY: "hidden" }}
          cols={3}
          gap={8} // 이미지 사이의 간격 설정
        >
          {whatType === "author" &&
            mockData.map((item) => {
              return (
                <BusinessItem
                  key={item.projectItemId}
                  {...item}
                  itemId={item.projectItemId}
                  whatType={whatType}
                  setUpdateCount={setUpdateCount}
                />
              );
            })}
          {whatType === "space" &&
            mockData.map((item) => {
              return (
                <BusinessItem
                  key={item.spaceItemId}
                  {...item}
                  itemId={item.spaceItemId}
                  whatType={whatType}
                  setUpdateCount={setUpdateCount}
                />
              );
            })}
          <Button
            variant="outlined"
            sx={{
              color: "black", // 글자색: 흰색
              borderRadius: 0, //모서리 둥글게 ㄴㄴㄴ
              borderColor: "black", // 테두리색깔
              "&:hover": {
                backgroundColor: "#f0f0f0", // 마우스를 올렸을 때 배경색 변경: 더 진한 초록색
                borderColor: "black",
              },
            }}
            style={{
              height: 480,
              width: 337,
              fontSize: 18,
            }}
            endIcon={<AddIcon />}
            onClick={addPoster}
          >
            추가하기
          </Button>
        </ImageList>
      </Stack>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        type={whatType}
        setUpdateCount={setUpdateCount}
      />
    </>
  );
};

export default BusinessItemList;
