// 사업자 메인
import * as React from "react";

import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Exhibits from "../../components/Exhibits";
import "../../styles/MainBusiness.css";
import DatePickerOpenTo, { SelectSizesExample } from "../../libs/Open";

// img
import noResult from "../../assets/noResult.png";

// 레이아웃
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

// 전시 보이기
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

// 아이콘 클릭
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import ButtonBoot from "react-bootstrap/Button";

// 배지
import Badge from "@mui/material/Badge";
import { useEffect } from "react";

//api
import {
  onGetAllSpaceItemHandler,
  onGetSpaceItemInfoHandler,
  onGetSearchSpaceProjectHandler,
} from "../../apis/servicehandeler/SpaceApiHandler";
import {
  onAllAuthorProjectHandler,
  onGetAuthorItemInfoHandler,
  onGetSearchAuthorProjectHandler,
} from "../../apis/servicehandeler/AuthorApiHandler";
import { useNavigate } from "react-router-dom";
import { DataSaverOnTwoTone } from "@mui/icons-material";

import MuiDialog from "../../libs/MuiDialog";

const MainBusiness = () => {
  const [projectButtonType, setProjectButtonType] = useState("bold");
  const [spaceButtonType, setSpaceButtonType] = useState("thin");
  const [exhibitsType, setExhibitsType] = useState("author");
  const [data, setData] = useState([{}]); // 받는 형식이 배열 안 객체라
  const [enableDialog, setEnableDialog] = useState(false); // 검색결과가 없을때 띄울이미자
  const [isBusinessDialog, setIsBusinessDialog] = useState(false); // 검색결과가 없을때 띄울이미자
  // todo 달력에 디폴트값 널기
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [address, setAddress] = useState("서울");

  //?-------------------------달력
  const handleStartDateChange = (newDate) => {
    setStartDate(newDate);
    // startDate.format("YYYY-MM-DD")
    console.log("시작월" + startDate);
  };

  const handleEndDateChange = (newDate) => {
    setEndDate(newDate);
    console.log("끝월" + endDate);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    console.log("위치" + address);
  };

  //!------------------------검색
  // 검색 버튼 눌러서 조회 api
  const goSearch = (exhibitsType) => {
    if (exhibitsType == "author") {
      // todo s3
      onGetSearchAuthorProjectHandler(
        { startDate, endDate, city: address },
        (response) => {
          if (Array.isArray(response.data)) {
            setData(response.data);
          } else {
            const emptyList = [];

            setData(emptyList);
            console.error("응답 데이터가 배열이 아닙니다.");
          }
        }
      );
    } else if (exhibitsType == "space") {
      // todo s3
      onGetSearchSpaceProjectHandler(
        { startDate, endDate, city: address },
        (response) => {
          if (Array.isArray(response.data)) {
            setData(response.data);
          } else {
            const emptyList = [];

            setData(emptyList);
            console.error("응답 데이터가 배열이 아닙니다.");
          }
        }
      );
    } else {
      console.log("비즈니스 메인 아이템 조회 잘못된 접근");
    }
  };
  // const [month, setMonth] = useState({
  //   startCalendar : false,
  //   endCalendar : false,
  // });
  // // 시작 월 클릭눌렸을때
  // const selectStartMonth = () => {
  //   setCalendarPresence({
  //     ...state,
  //     [e.target.name]: e.target.value,
  //   });

  // };
  // // 끝월 클릭눌렸을때
  // const selectEndMonth = () => {};

  // 프로젝트 눌렸을때
  const getProjectItems = () => {
    setSpaceButtonType("thin");
    setProjectButtonType("bold");
    setExhibitsType("author");
  };

  // 공간 눌렸을 때
  const getSpaceItems = () => {
    setSpaceButtonType("bold");
    setProjectButtonType("thin"); // 프로젝트 버튼을 thin으로 설정, 필요에 따라 조정
    setExhibitsType("space");
  };

  const nav = useNavigate();

  useEffect(() => {
    let userType = localStorage.getItem("userType");
    if (userType !== "author" && userType !== "space") {
      setIsBusinessDialog(true);
    }
  }, []);

  useEffect(() => {
    if (exhibitsType == "author") {
      // todo s3
      onAllAuthorProjectHandler((response) => {
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("응답 데이터가 배열이 아닙니다.");
        }
      });
    } else if (exhibitsType == "space") {
      // todo s3
      onGetAllSpaceItemHandler((response) => {
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("응답 데이터가 배열이 아닙니다.");
        }
      });
    } else {
      console.log("비즈니스 메인 아이템 조회 잘못된 접근");
    }
  }, [exhibitsType]); // businessInfoState 객체의 모든 변경에 반응

  // 조회 결과 없음 표시 => 작가 프로젝트 눌렀을 때
  useEffect(() => {
    if (data.length > 0) {
      setEnableDialog(false);
    } else {
      setEnableDialog(true);
    }
  }, [data]);

  const getItemInfo = ({ id, exhibitsType }) => {
    const whatUser = localStorage.getItem("userType");
    nav(`/businessiteminfo/${id}`, {
      state: { userType: whatUser, posterId: id, exhibitsType },
    });
  };

  const formatDate = (date) => {
    return String(date).replace(/-/g, ".");
  };

  return (
    <div className="MainBusiness">
      <React.Fragment>
        <CssBaseline />
        <Container
          maxWidth="80%"
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" }, // 각 텍스트 필드의 마진과 너비 설정
              width: "80%", // 박스 너비를 50%로 설정하여 더 작게 만듦
              display: "flex", // flexbox 디스플레이 설정
              justifyContent: "center", // 가로 중앙 정렬
              flexDirection: "column", // 요소들을 세로 방향으로 배열
              alignItems: "center", // 요소들을 가로 중앙에 위치시킴
              marginTop: 2,
            }}
            noValidate
            autoComplete="off"
          >
            <Stack spacing={2} direction="row" style={{}}>
              {exhibitsType === "author" ? (
                <Button
                  color="inherit"
                  size="large"
                  sx={{
                    color: "black", // 활성화 상태에 따라 색상 변경
                    fontWeight: "bold", // 활성화 상태에 따라 굵기 변경
                  }}
                  onClick={getProjectItems}
                >
                  프로젝트
                </Button>
              ) : (
                <Button
                  style={{ color: "grey" }}
                  size="large"
                  onClick={getProjectItems}
                >
                  프로젝트
                </Button>
              )}
              {exhibitsType === "space" ? (
                <Button
                  color="inherit"
                  size="large"
                  sx={{
                    color: "black", // 활성화 상태에 따라 색상 변경
                    fontWeight: "bold", // 활성화 상태에 따라 굵기 변경
                  }}
                  onClick={getSpaceItems}
                >
                  공간
                </Button>
              ) : (
                <Button
                  style={{ color: "grey" }}
                  size="large"
                  onClick={getSpaceItems}
                >
                  공간
                </Button>
              )}
            </Stack>

            <Stack spacing={2} direction="row" className="filterContainer">
              <>
                <DatePickerOpenTo
                  calendarType={"startDate"}
                  onDateChange={handleStartDateChange}
                />
                <DatePickerOpenTo
                  calendarType={"endDate"}
                  onDateChange={handleEndDateChange}
                />

                <SelectSizesExample
                  name="address"
                  size={"default"}
                  type={"location"}
                  selectedLocation={address}
                  onLocationChange={handleAddressChange}
                />
                {/* 검색 아이콘 */}
                <Tooltip title="Search">
                  <IconButton
                    aria-label="delete"
                    size="large"
                    style={{
                      backgroundColor: "black", // 배경색을 검정색으로 설정
                      color: "white", // 아이콘 색상을 흰색으로 설정
                      marginLeft: 15,
                    }}
                    onClick={() => goSearch(exhibitsType)}
                  >
                    <SearchIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </>
            </Stack>
          </Box>
        </Container>
        {/* 구분선 */}

        {/* 비어있을때 값  */}
        <Stack
          justifyContent="center" // 가로 방향으로 중앙 정렬
          alignItems="center" // 세로 방향으로 중앙 정렬
          style={{ marginTop: 30 }}
        >
          <div
            style={{
              height: 1,
              backgroundColor: "gray",
              width: "70%",
              marginBottom: 60,
            }}
          ></div>
          {enableDialog && (
            <img src={noResult} style={{ width: 300, marginBottom: 30 }} />
          )}
          {!enableDialog && (
            <ImageList
              sx={{ maxWidth: "70%", height: "auto", overflowY: "hidden" }}
              cols={3}
              gap={110} // 이미지 사이의 간격 설정
            >
              {data.map((item) => (
                <ImageListItem
                  key={
                    exhibitsType === "author"
                      ? item.projectItemId
                      : item.spaceItemId
                  }
                  onClick={() => {
                    exhibitsType === "author"
                      ? getItemInfo({
                          id: item.projectItemId,
                          exhibitsType: "author",
                        })
                      : getItemInfo({
                          id: item.spaceItemId,
                          exhibitsType: "space",
                        });
                  }}
                >
                  <img
                    src={`${item.url}`}
                    alt={item.intro}
                    loading="lazy"
                    style={{
                      width: 281,
                      height: 400,
                      objectFit: "cover",
                    }} // 모든 이미지가 동일한 가로 길이를 가지도록 가로 너비를 100%로 설정
                  />
                  {/* <img
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=248&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }} // 모든 이미지가 동일한 가로 길이를 가지도록 가로 너비를 100%로 설정
                /> */}
                  <ImageListItemBar
                    title={
                      { item } && exhibitsType === "author"
                        ? item.artistName
                        : item.title
                    }
                    subtitle={
                      <div>
                        <span>전시 희망기간 :</span>
                        <span>
                          {formatDate(item.startDate)}~
                          {formatDate(item.endDate)}
                        </span>
                      </div>
                    }
                    position="below"
                    sx={{
                      ".MuiImageListItemBar-titleWrap": {
                        fontWeight: "bold !important", // Force the title to be bold
                        fontSize: "24px !important", // Force the title font size to 24px
                        lineHeight: "48px !important", // Force the line height to enhance title visibility
                      },
                      ".MuiImageListItemBar-subtitle": {
                        color: "gray !important", // Force the subtitle color to gray
                        fontSize: "1px !important", // Force the subtitle font size to 1px for ultra-small appearance
                        fontWeight: "lighter !important", // Force the subtitle font lighter
                      },
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </Stack>
      </React.Fragment>
      {isBusinessDialog && (
        <MuiDialog
          title={"알림"}
          content={"접근 불가능한 페이지입니다."}
          result={true}
          page={"goUserMain"}
          parentClick={setEnableDialog}
        />
      )}
    </div>
  );
};

export default MainBusiness;
