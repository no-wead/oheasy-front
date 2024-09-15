import image1 from "../../assets/image 1.png";

import author from "../../assets/author.png";

// 이미지 리스트 라이브러리
import * as React from "react";
import { useNavigate } from "react-router-dom";
import ButtonBoot from "react-bootstrap/Button";
import Button from "@mui/material/Button";
// 이미지 라이브러리
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ImageList from "@mui/material/ImageList";

import Stack from "@mui/material/Stack";
// 이모지
import AddIcon from "@mui/icons-material/Add";

// 모달
import MyVerticallyCenteredModal from "../../libs/BootModal";
import { useEffect } from "react";

//!------------------- 작가 공간 마이페이지에 나오는 프로젝트, 공간리스트 아이템=> 유저는 따로 뺌

// type은 공간과 작가에 따라 아이템 양식이 달라서 분리

const MyPosterForBusiness = ({ whatType }) => {
  console.log("MyPosterForBusiness 유저 타입" + whatType);
  const nav = useNavigate();

  const [modalShow, setModalShow] = React.useState(false); // 모달

  const addPoster = () => {
    setModalShow(true);
  };

  const handleItemInfo = (id) => {
    switch (whatType) {
      case "space": {
        nav(`/businessiteminfo/${id}`, {
          state: {
            posterId: id,
            isEdit: true,
          },
        });
        return;
      }
      case "author": {
        nav(`/authoredititem/${id}`, {
          state: {
            posterId: id,
            isEdit: true,
          },
        });
        return;
      }

      default: {
        console.log("MyPosterForBusiness 잘못된 접근");
        return;
      }
    }
  };
  return (
    <div>
      <div>
        <Stack
          justifyContent="center" // 가로 방향으로 중앙 정렬
          alignItems="center" // 세로 방향으로 중앙 정렬
          style={{ marginTop: 50 }}
        >
          <ImageList
            sx={{ maxWidth: 1000, height: "auto", overflowY: "hidden" }}
            cols={3}
            gap={8} // 이미지 사이의 간격 설정
          >
            {/* {mockData.map((item) => (
              <ImageListItem
                key={item.id}
                onClick={() => handleItemInfo(item.id)}
              >
                <img src={item.imageurl} />
                <hr style={{ margin: "5px 0" }} />{" "}
                <ImageListItemBar
                  title={item.postName + " " + item.location}
                  subtitle={<span>{item.createdDate}</span>}
                  position="below"
                />
              </ImageListItem>
            ))} */}

            <Button
              variant="outlined"
              style={{
                paddingRight: 80,
                paddingLeft: 80,
                paddingBottom: 120,
                paddingTop: 120,
              }}
              endIcon={<AddIcon />}
              onClick={addPoster}
            >
              추가하기
            </Button>
          </ImageList>
        </Stack>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        type={whatType}
      />
    </div>
  );
};

export default MyPosterForBusiness;
