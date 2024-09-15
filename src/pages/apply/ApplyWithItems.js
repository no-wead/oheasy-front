import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import space from "../../assets/space.png";
import * as React from "react";
// 라디오 버튼용
import Radio from "@mui/material/Radio";
import { pink } from "@mui/material/colors";
import PosterItem from "../../components/PosterItem";

// alert용
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

// css
import "../../styles/apply/ApplyWithItems.css";
import BusinessItem from "../../components/business/BusinessItem";

// items
import noItems from "../../assets/noItems.png";

import Button from "@mui/material/Button";

// api
import {
  onGetOneAuthorProjectsHandler,
  onApplyToSpaceItemHandler,
} from "../../apis/servicehandeler/AuthorApiHandler";
import {
  onGetOneSpaceProjectsHandler,
  onApplyToAuthorItemHandler,
} from "../../apis/servicehandeler/SpaceApiHandler";
import { useEffect } from "react";

import ImageList from "@mui/material/ImageList";

import MuiDialog from "../../libs/MuiDialog";
import { Mp } from "@mui/icons-material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CropDinIcon from "@mui/icons-material/CropDin";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
  integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
  crossorigin="anonymous"
></link>;

const ApplyWithItems = () => {
  const uselocation = useLocation();
  const nav = useNavigate();

  const [enableDialog, setEnableDialog] = useState(false); // 검색결과가 없을때 띄울이미자

  const { userType, posterId } = uselocation.state; // 작가인지 공간대여자인지 신청하기 눌렀을 때 정보 가져올 api 다름

  const [applyBtnState, setApplyBtnState] = useState(false); // 어떤 작품을 제출할건지 선책됐는지 여부

  const [showAlert, setShowAlert] = useState(false); // 신청sucessAlert 보이기 상태
  const [showErrorAlert, setErrorShowAlert] = useState(false); // errprAlert 보이기 상태
  const [showErrorReAlert, setErrorReShowAlert] = useState(false); // 이미 신청한거 재신청시 보이기 상태
  const [abledBtn, setAbledBtn] = useState(true); // 취소하기, 신청하기 버튼 신청 후 안보이게 처리

  const [mockData, setMockData] = useState([{}]); // 받는 형식이 배열 안 객체라
  const [updateCount, setUpdateCount] = useState(0); // 매칭 상태 변화에 따라 리랜더링

  // 라디오 그룹 라이브러리 가져옴
  const [selectedValue, setSelectedValue] = React.useState("a");

  // 신청할 아이템 선택
  const [selectedItem, setSelectedItem] = useState(-1);
  const handleSelectedItem = (itemId) => {
    setSelectedItem(itemId);

    console.log(
      "ApplyWithItem_라디오버튼으로 선택된 id : 타입 + 번호 출력" +
        typeof itemId +
        itemId
    );
  };

  // 비즈니스 아이템 data 가져오기
  useEffect(() => {
    let userId = localStorage.getItem("userId");
    if (userType == "author") {
      onGetOneAuthorProjectsHandler({ authorId: userId }, (response) => {
        if (Array.isArray(response.data)) {
          setMockData(response.data);
        } else {
          const emptyList = [];
          setMockData(emptyList);
          console.error("응답 데이터가 배열이 아닙니다.");
        }
      });
    } else if (userType == "space") {
      onGetOneSpaceProjectsHandler({ spaceId: userId }, (response) => {
        if (Array.isArray(response.data)) {
          setMockData(response.data);
        } else {
          const emptyList = [];
          setMockData(emptyList);
          console.error("응답 데이터가 배열이 아닙니다.");
        }
      });
    } else {
      console.log("비즈니스 아이템 조회 잘못된 접근");
    }
  }, [updateCount, selectedItem]); // businessInfoState 객체의 모든 변경에 반응

  useEffect(() => {
    if (mockData.length > 0) {
      setEnableDialog(false);
    } else {
      setEnableDialog(true);
    }
  }, [mockData]);

  // 취소하기, 신청하기 버튼 신청 후 안보이게 처리
  const handleAbleBtn = () => {
    setAbledBtn(false);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });
  // 신청하기
  const goApply = () => {
    console.log("신청하기눌림");

    // todo 신청할 것이 선택 됐다면 => 신청 api 보내기
    // todo 신청할게 선택x라면
    if (selectedItem == -1) {
      setErrorShowAlert(true);
      setTimeout(() => {
        setErrorShowAlert(false);
      }, 2000);
    } else {
      setErrorShowAlert(false);

      if (userType === "author") {
        onApplyToSpaceItemHandler(
          { authorItemId: selectedItem, spaceItemId: posterId },
          (responseStatus) => {
            if (responseStatus) {
              setShowAlert(true);
              handleAbleBtn();
            } else {
              setErrorReShowAlert(true);
            }
          }
        );
      } else if (userType === "space") {
        console.log("작가 포스트 " + posterId + "공간 포스트" + selectedItem);
        onApplyToAuthorItemHandler(
          { authorItemId: posterId, spaceItemId: selectedItem },
          (responseStatus) => {
            if (responseStatus) {
              setShowAlert(true);
              handleAbleBtn();
            } else {
              setErrorReShowAlert(true);
            }
          }
        );
      }
    }
  };
  // 신청 취소하기
  const goBack = () => {
    nav(-1, { replace: true });
  };

  // 컴포넌트는 return에서만 가능, 버튼 외 이벤트가 발생해야 함수 트리거 ()=> {} 아니면 리랜더 무한루프 오류남

  console.log();

  return (
    <div style={{ marginTop: 40 }}>
      <span
        style={{
          marginLeft: 280,

          fontSize: "24px",
        }}
      >
        {" "}
        신청할 아이템을 골라주세요.
      </span>
      <Stack
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          marginLeft: 23,
          display: "flex",
          
        }}
      >
        <ImageList
          sx={{ width: "70%", height: "auto", overflowY: "hidden" }}
          cols={3}
          gap={20} // 이미지 사이의 간격 설정
        >
          {userType === "author" &&
            !enableDialog &&
            mockData.map((item) => {
              return (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start", // 라디오 버튼을 오른쪽 상단으로 정렬
                    }}
                  >
                    <Radio
                      {...controlProps(String(item.projectItemId))}
                      icon={<CropDinIcon />}
                      checkedIcon={
                        <DoneOutlineIcon style={{ color: "black" }} />
                      }
                      onClick={() => handleSelectedItem(item.projectItemId)}
                    />
                    <BusinessItem
                      key={item.projectItemId}
                      {...item}
                      itemId={item.projectItemId}
                      whatType={"author"}
                      setUpdateCount={setUpdateCount}
                    />
                  </div>
                </>
              );
            })}

          {userType === "space" &&
            !enableDialog &&
            mockData.map((item) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start", // 라디오 버튼을 오른쪽 상단으로 정렬
                  }}
                >
                  <Radio
                    {...controlProps(String(item.spaceItemId))}
                    icon={<CropDinIcon />}
                    checkedIcon={<DoneOutlineIcon />}
                    onClick={() => handleSelectedItem(item.spaceItemId)}
                  />

                  <BusinessItem
                    key={item.spaceItemId}
                    {...item}
                    itemId={item.spaceItemId}
                    whatType={"space"}
                    setUpdateCount={setUpdateCount}
                  />
                </div>
              );
            })}
          {enableDialog && (
            <img src={noItems} style={{ marginLeft: 290, width: 400 }} />
          )}
        </ImageList>
        {enableDialog && (
          <button
            style={{
              marginRight: 10,
              padding: 20,

              marginBottom: 100,
            }}
            className="applyBtn"
            type="button"
            class="btn btn-dark"
            onClick={goBack}
          >
            뒤로가기
          </button>
        )}
        {abledBtn && !enableDialog && (
          <div style={{ marginTop: 40, marginBottom: 100 }}>
            <Button
              color="inherit"
              size="large"
              sx={{
                color: "black", // 활성화 상태에 따라 색상 변경
                fontWeight: "normal", // 활성화 상태에 따라 굵기 변경
                marginRight: 2,
              }}
              onClick={goBack}
            >
              취소하기
            </Button>

            <button
              className="applyBtn"
              type="button"
              class="btn btn-dark"
              onClick={goApply}
              style={{
                border: "1px solid #000",
                borderRadius: "0",
                width: "100px",
                height: "40px",
              }}
            >
              신청하기
            </button>
          </div>
        )}
      </Stack>
      {showAlert && (
        <MuiDialog
          title={"알림"}
          content={"신청 성공. 메인으로 이동합니다."}
          result={true}
          parentClick={setShowAlert}
          page={"goMainbusiness"}
        />
      )}
      {showErrorAlert && (
        <MuiDialog
          title={"알림"}
          content={"신청할 아이템을 선택해주세요"}
          parentClick={setErrorShowAlert}
          result={true}
          page={"login"}
        />
      )}
      {showErrorReAlert && (
        <MuiDialog
          title={"알림"}
          content={"이미 수락 대기중입니다. 마이페이지 매칭현황을 확인해주세요"}
          parentClick={setErrorReShowAlert}
          result={true}
          page={"login"}
        />
      )}

      <div className="applyItemsContainer">
        {/* {mockData.map((item) => {
          return (
            <div>
              <Radio
                {...controlProps(String(item.id))}
                sx={{
                  color: pink[800],
                  "&.Mui-checked": {
                    color: pink[600],
                  },
                }}
                onClick={() => handleSelectedItem(item.id)}
              />
            


              <PosterItem
                key={item.id}
                {...item}
                date={item.createdDate}
                whatType={"author"}
                isVisible={false}
                isDialog={true}
              />
            </div>
          );
        })}  */}
      </div>
      {/* 아이템 목록이 있다면 함수 넣기   */}
    </div>
  );
};
export default ApplyWithItems;
