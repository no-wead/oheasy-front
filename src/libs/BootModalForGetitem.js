import ButtonBoot from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useEffect, useRef, useState } from "react";
// 레이아웃
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material";

// 업로드
import * as React from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// 라디오 버튼
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

// 달력 위치
import DatePickerOpenTo, { SelectSizesExample } from "../libs/Open";
import DateRangePickerValue from "./DateRangePickerValue";

// 이미지
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
// 쓰레기 통 이미지
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

// api
import {
  onGetAuthorItemInfoHandler,
  onDeleteSingleProjectItemHandler,
  onUpdateAuthorItemInfoHandler,
  onDeleteAuthorPhotoHandler,
  onGetAuthorPhotoHandler,
  onUpdateAuthorPhotoHandler,
} from "../apis/servicehandeler/AuthorApiHandler";
import {
  onGetSpaceItemInfoHandler,
  onUpdateSpaceItemInfoHandler,
  onDeleteSpaceItemHandler,
  onDeleteSpacePhotoHandler,
  onGetSpacePhotoHandler,
  onUpdateSpacePhotoHandler,
} from "../apis/servicehandeler/SpaceApiHandler";
import MuiDialog from "./MuiDialog";
import dayjs from "dayjs";

//!------------ 작가랑 공간대여자 마이페이지에서 아이템 수정, 조회
export default function MyVerticallyCenteredModal({
  show,
  onHide,
  type,
  id,
  setUpdateCount,
}) {
  // 저장 버튼 활성화
  const [enableNextBtn, setEnableNextBtn] = useState(false);
  const [enableDialog, setEnableDialog] = useState(false); // 입력값비었을 때
  const [enableInfoDialog, setEnableInfoDialog] = useState(false); // 입력값비었을 때

  const initialAuthorState = {
    name: "",
    phoneNumber: "",
    explanation: "",
    title: "",
    address: "서울",
  };
  const initialSpaceState = {
    title: "",
    hostName: "",
    intro: "",
    address: "서울",
    size: "",
    phoneNumber: "",
    parking: true, // parking의 기본값이 true라고 가정
    fee: 0, // fee의 초기값을 0으로 설정
    startDate: "",
    endDate: "",
  };

  // 사진리스트
  const [imgList, setImgList] = useState([]);

  // 작가용
  const [authorInfoState, setauthorInfoState] = useState({
    name: " ",
    phoneNumber: " ",
    explanation: " ",
    address: "서울",
    startDate: dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().add(1, "month").format("YYYY-MM-DD"),
    title: "",
  });

  // 공간대여자용
  const [businessInfoState, setBusinessInfoState] = useState({
    title: " ",
    hostName: "",
    intro: " ",
    address: "서울",
    size: " ",
    phoneNumber: " ",
    parking: true,
    fee: "",
    startDate: dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().add(1, "month").format("YYYY-MM-DD"),
  });

  const onImgSelected = (e) => {
    //이미 이미지가 업로드 되었던것을 다시 선택해서 실행될때는
    //기존의 배열에서 기존의 선택된 이미지를 지우고

    //새로운 선택한 이미지를 배열에 추가해준다.
    let now = new Date();
    let id = now.toString(); // -> '2021-09-09T10:00:00'

    // FileReader(); // 내가 선택한 파일을 읽어주는 객체
    let reader = new FileReader(); //객체생성함
    reader.readAsDataURL(e.target.files[0]); //내가 선택한 파일을 읽어주는 함수
    // readAsDataURL -> 비동기함수임
    //readAsDataURL()함수는 내가 선택한 파일을 읽어서 url로 만들어준다.
    //이미지가 url로 만들어진 후에 실행되는 함수

    reader.onload = () => {
      //이미지가 url로 만들어진 후에 실행되는 함수
      console.log(reader.result); //이미지가 url로 만들어진다.
      setImgList([
        ...imgList,
        { id, previewUrl: reader.result, originFile: e.target.files[0] },
      ]);
    };
  };

  // 사진 삭제하기
  const onImgDelete = (id) => {
    setImgList(imgList.filter((e) => e.id !== id));
  };

  // 공간 입력상태 감지
  const handleSpaceChangeState = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);

    setBusinessInfoState({
      ...businessInfoState,
      [e.target.name]: e.target.value,
    });
  };
  // 작가 입력상태 감지
  const handleAuthorChangeState = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);

    setauthorInfoState({
      ...authorInfoState,
      [e.target.name]: e.target.value,
    });
  };
  // 공간  날짜 변경 핸들러
  const handleDateChange = (newStartDate, newEndDate) => {
    console.log("부모날짜 : " + newStartDate + newEndDate);
    setBusinessInfoState({
      ...businessInfoState,
      startDate: newStartDate,
      endDate: newEndDate,
    });
  };
  // 작가 날짜 변경 핸들러
  const handleDateForAuthorChange = (newStartDate, newEndDate) => {
    console.log("부모날짜 : " + newStartDate + newEndDate);
    setauthorInfoState({
      ...authorInfoState,
      startDate: newStartDate,
      endDate: newEndDate,
    });
  };

  // 입력이 달라지면 상태 감지
  const handleChangeState = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setauthorInfoState({
      ...authorInfoState,
      [e.target.name]: e.target.value,
    });
  };

  // 처음에 아이템 정보 불러오기
  useEffect(() => {
    console.log("아이템정보 불러오기 useEffect");
    console.log("type " + type);
    if (type === "author") {
      console.log("아이템 정보 id " + id);
      onGetAuthorItemInfoHandler({ posterId: id }, (response) => {
        console.log("작가아이템 정보 응답값 받음");
        console.log(response);
        setauthorInfoState((prevState) => ({
          title: response.data.title,
          name: response.data.artistName, // 전시명
          phoneNumber: response.data.phone, // 전화번호
          explanation: response.data.intro, // 전시 소개
          // intro: response.data.intro, // 전시소개
          startDate: dayjs(response.data.startDate).format("YYYY-MM-DD"), // 시작날짜
          endDate: dayjs(response.data.endDate).format("YYYY-MM-DD"), // 끝날짜
          // artistName: response.data.artistName, // 직가명
          // hostName: response.data.hostName, // 주최자명
          // price: response.data.price, // 가격
          address: response.data.city, // 주소
        }));
      });
      // 사진 정보
      // onGetAuthorPhotoHandler({ id }, (response) => {
      //   if (Array.isArray(response.data)) {
      //     alert("배열안");
      //     let now = new Date();
      //     const newImgList = response.data.map((item) => ({
      //       id: now.toString, // 각 이미지에 대한 고유 ID
      //       previewUrl: item.url, // 미리보기 URL
      //       originFile: item.url, // 원본 파일 정보는 서버에서 받아올 수 없으므로 null 처리
      //     }));
      //     setImgList(newImgList);
      //   }
      // });
    } else if (type === "space") {
      console.log("아이템 정보 id " + id);
      onGetSpaceItemInfoHandler({ posterId: id }, (response) => {
        console.log("공간대여자 아이템 정보 응답값 받음");
        console.log("공간 조회 응답" + response.fee + typeof response.fee);
        console.log(response);
        setBusinessInfoState((prevState) => ({
          title: response.data.title,
          intro: response.data.intro, // 전시소개
          hostName: response.data.hostName, // 주최자명
          address: response.data.city,
          size: response.data.size,
          phoneNumber: response.data.phone,
          parking: response.data.parking,
          startDate: response.data.startDate, // 시작날짜
          endDate: response.data.endDate, // 끝날짜
          fee: response.data.fee,
        }));
      });

      // onGetSpacePhotoHandler({ id }, (response) => {
      //   if (Array.isArray(response.data)) {
      //     alert("배열안");
      //     let now = new Date();
      //     const newImgList = response.data.map((item) => ({
      //       id: now.toString, // 각 이미지에 대한 고유 ID
      //       previewUrl: item.url, // 미리보기 URL
      //       originFile: item.url,
      //     }));
      //     setImgList(newImgList);
      //   }
      // });
    }
  }, []);

  // 수정하기 버튼용
  useEffect(() => {
    console.log("저장 버튼 useEffect");
    if (type === "author") {
      if (authorInfoState) {
        console.log("빈값없음");
        setEnableNextBtn(true); // 다음 버튼
      } else {
        console.log("필수 입력 필드가 비어있습니다.");
        setEnableNextBtn(false); // 다음 버튼 비활성화
      }
    } else if (type === "space") {
      if (
        businessInfoState
        // businessInfoState.fee.length > 1 //&&
        // businessInfoState.hostName.length > 1 &&
        // businessInfoState.intro.length > 5 &&
        // businessInfoState.phoneNumber.length > 5 &&
        // businessInfoState.size.length > 1
      ) {
        setEnableNextBtn(true);
      } else {
        setEnableNextBtn(false);
      }
    }
  }, [authorInfoState, businessInfoState]);
  //사진 첨부
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  //? 수정 하기 api
  const submitAuthorItem = () => {
    console.log("제출 호출");
    if (type === "author" && imgList.length > 0) {
      let authorId = localStorage.getItem("userId");
      // todo 시작날짜 끝날짜 넣기 + 지역은 서버에 작가만 넣어둠
      console.log("작가아이템 수정");
      onUpdateAuthorItemInfoHandler(
        {
          title: authorInfoState.title,
          posterId: id,
          artistName: authorInfoState.name,
          intro: authorInfoState.explanation,
          phone: authorInfoState.phoneNumber,
          startDate: authorInfoState.startDate,
          endDate: authorInfoState.endDate,
          city: authorInfoState.address,
        },
        (responseStatus) => {
          console.log(" 작가아이템 정보다보기" + authorInfoState);
          if (responseStatus) {
            console.log("작가 아이템 수정 성공");
            const formData = new FormData();
            for (let i = 0; i < imgList.length; i++) {
              formData.append("file", imgList[i].originFile); //반복문을 활용하여 파일들을 formData객체에 추가
            }

            onUpdateAuthorPhotoHandler({ id, formData }, (responseStatus) => {
              if (responseStatus) {
                setauthorInfoState(initialAuthorState);
                setUpdateCount((prev) => prev + 1);
                onHide(); // 부모컴포넌트 프롭
              } else {
                console.log("이미지 수정 실패");
              }
            });
          } else {
            // 빈값있을 때
            setEnableInfoDialog(true);
          }
        }
      );
      // todo 날짜 업데이트 하기
    } else if (type === "space" && imgList.length > 0) {
      console.log("bootmodalfoegetitem의 id" + id + type);
      let newParking = businessInfoState.parking === "true" ? true : false;
      onUpdateSpaceItemInfoHandler(
        {
          title: businessInfoState.title,
          spaceId: id,
          intro: businessInfoState.intro,
          hostname: businessInfoState.hostName,
          city: businessInfoState.address,
          size: businessInfoState.size,
          parking: newParking,
          fee: businessInfoState.fee,
          phone: businessInfoState.phoneNumber,
          startDate: businessInfoState.startDate,
          endDate: businessInfoState.endDate,
        },
        (responseStatus) => {
          if (responseStatus) {
            console.log("스페이스 아이템 수정 성공");
            const formData = new FormData();
            for (let i = 0; i < imgList.length; i++) {
              formData.append("file", imgList[i].originFile); //반복문을 활용하여 파일들을 formData객체에 추가
            }

            onUpdateSpacePhotoHandler({ id, formData }, (responseStatus) => {
              if (responseStatus) {
                setBusinessInfoState(initialSpaceState);
                setUpdateCount((prev) => prev + 1);
                onHide(); // 부모컴포넌트 프롭
              } else {
                console.log("이미지 수정 실패");
              }
            });
          } else {
            // 빈값있을 때
            setEnableInfoDialog(true);
          }
        }
      );
    } else if (imgList.length < 1) {
      setEnableDialog(true); // 사진 한장도 안부쳤을 땐
    } else {
      console.log("아이템등로 잘못된 접근");
    }
  };

  // 작가, 공간대여자 아이템 삭제 api
  const deleteExhibits = () => {
    if (type === "author") {
      onDeleteSingleProjectItemHandler({ projectItemId: id }, () => {
        console.log("작가아이템 삭제 완료!!!!!!!!!!!");
        onDeleteAuthorPhotoHandler({ id }, () => {
          console.log("전체 공간아이템 삭제 완료!!!!!!!!!!!");

          // 모달 닫기
          setUpdateCount((prev) => prev + 1);
          onHide();
        });
      });
    } else {
      onDeleteSpaceItemHandler({ spaceId: id }, () => {
        console.log("공간아이템 삭제 완료!!!!!!!!!!!");
        onDeleteSpacePhotoHandler({ id }, () => {
          console.log("전체 공간아이템 삭제 완료!!!!!!!!!!!");

          // 모달 닫기
          setUpdateCount((prev) => prev + 1);
          onHide();
        });
      });
    }
  };

  // 입력란 파란색 색 수정 *********************
  const theme = createTheme({
    typography: {
      fontFamily: "Pretendard-Regular",
    },
    components: {
      MuiInput: {
        styleOverrides: {
          underline: {
            "&:before": {
              borderBottom: "1px solid #e0e0e0",
            },
            "&:hover:not(.Mui-disabled):before": {
              borderBottom: "2px solid rgba(0, 0, 0, 0.87)",
            },
            "&:after": {
              borderBottom: "1px solid black",
            },
          },
        },
      },
      // MuiInputLabel 컴포넌트에 대한 스타일 추가
      MuiInputLabel: {
        styleOverrides: {
          // 'standard' variant를 사용하는 경우
          root: {
            "&.Mui-focused": {
              // 포커스 상태일 때
              color: "gray", // 레이블 색상을 검정으로 변경
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            // 포커스 상태일 때 테두리 색상 변경
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "gray", // 여기서 원하는 색상으로 변경
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {type === "author" ? "작품" : "공간"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* // todo 작가 아이템에도 달력, 위치 넣어야함 서버에도 */}
          {type === "author" ? (
            <Box>
              <Stack spacing={2} style={{ marginLeft: 15, marginRight: 15 }}>
                <Stack
                  spacing={20}
                  direction={"row"}
                  style={{ marginTop: 10, marginBottom: 10 }}
                >
                  <TextField
                    name="name"
                    id="standard-basic"
                    label="작가이름"
                    variant="standard"
                    onChange={handleChangeState}
                    value={authorInfoState.name}
                  />

                  <TextField
                    name="phoneNumber"
                    id="standard-number"
                    label="전화번호"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    onChange={handleChangeState}
                    value={authorInfoState.phoneNumber}
                  />
                </Stack>
                <TextField
                  name="title"
                  id="standard-title"
                  label="작품명"
                  type="search"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  onChange={handleChangeState}
                  value={authorInfoState.title} // 상태와 입력 필드 연결
                  style={{ marginBottom: 10 }}
                />
                <TextField
                  name="explanation"
                  id="outlined-multiline-static"
                  label="작품 소개"
                  multiline
                  rows={10}
                  onChange={handleChangeState}
                  value={authorInfoState.explanation}
                  style={{ marginBottom: 10 }}
                />
                <Stack
                  direction={"row"}
                  spacing={21}
                  style={{ alignItems: "center" }} // 가운데 정렬
                >
                  <Stack direction={"row"} spacing={5}>
                    <span
                      style={{
                        color: "gray",
                        fontSize: 15,
                        whiteSpace: "nowrap",
                        paddingTop: 7,
                      }}
                    >
                      전시희망지역
                    </span>

                    {/* 주소 */}
                    <SelectSizesExample
                      name="address"
                      size={"default"}
                      type={"location"}
                      selectedLocation={authorInfoState.address}
                      onLocationChange={handleAuthorChangeState}
                    />
                  </Stack>
                  {/* 달력 */}
                  <DateRangePickerValue
                    startDate={authorInfoState.startDate}
                    endDate={authorInfoState.endDate}
                    onDateChange={handleDateForAuthorChange}
                    isEdit={true}
                  />
                </Stack>
                <Stack
                  direction={"row"}
                  style={{ marginTop: 15, alignItems: "center" }}
                >
                  <span>사진을 첨부해주세요</span>
                  <span style={{ fontSize: "10px", color: "gray" }}>
                    (첫 사진이 대표사진이 되며, 최대 8장까지 업로드 할 수
                    있습니다.)
                  </span>
                </Stack>
                <>
                  <ImageList
                    sx={{ width: "100%", height: "auto" }}
                    cols={3}
                    rowHeight={170}
                  >
                    {imgList.map((item) => (
                      <ImageListItem key={item.id}>
                        <img
                          srcSet={`${item.previewUrl}`}
                          src={`${item.previewUrl}`}
                          alt={item.title}
                          loading="lazy"
                          style={{ maxWidth: 250, maxHeight: 170 }}
                        />
                        <IconButton
                          color="primary"
                          style={{ position: "absolute", top: "0", right: "0" }}
                          aria-label="delete"
                          size="large"
                          onClick={() => {
                            onImgDelete(item.id);
                          }}
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </ImageListItem>
                    ))}

                    <Button
                      disabled={imgList.length >= 8}
                      style={{
                        width: imgList.length > 0 ? "250px" : "auto",
                        height: imgList.length > 0 ? "200px" : "auto",
                      }}
                      variant="outlined"
                      component="label"
                      role={undefined}
                      tabIndex={-1}
                      onChange={onImgSelected}
                      accept="image/*"
                      type="file"
                      startIcon={<CloudUploadIcon />}
                    >
                      사진 올리기
                      <VisuallyHiddenInput type="file" />
                    </Button>
                  </ImageList>
                </>
              </Stack>
            </Box>
          ) : (
            // 건물 아이템 정보
            <Box>
              <Stack spacing={2} style={{ marginLeft: 15, marginRight: 15 }}>
                <Stack spacing={20} direction={"row"} style={{ marginTop: 10 }}>
                  <TextField
                    name="hostName"
                    id="standard-number-busi"
                    label="임대인"
                    type="search"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    onChange={handleSpaceChangeState}
                    value={businessInfoState.hostName} // 상태와 입력 필드 연결
                  />

                  <TextField
                    name="phoneNumber"
                    id="standard-number"
                    label="전화번호"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    onChange={handleSpaceChangeState}
                    value={businessInfoState.phoneNumber}
                  />
                </Stack>
                <TextField
                  name="title"
                  id="standard-number-title"
                  label="건물명"
                  type="search"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  onChange={handleSpaceChangeState}
                  value={businessInfoState.title} // 상태와 입력 필드 연결
                />
                <TextField
                  name="intro"
                  id="outlined-multiline-static"
                  label="건물 소개"
                  multiline
                  rows={10}
                  onChange={handleSpaceChangeState}
                  value={businessInfoState.intro}
                />

                <Stack spacing={20} direction="row">
                  <TextField
                    name="fee"
                    id="fee"
                    label="대여료/1일"
                    type="number"
                    variant="standard"
                    style={{ width: 210 }} // 가로 너비를 자동으로 설정
                    onChange={handleSpaceChangeState}
                    value={businessInfoState.fee}
                  />

                  <TextField
                    name="size"
                    id="standard-search-id"
                    label="면적/평"
                    type="number"
                    variant="standard"
                    onChange={handleSpaceChangeState}
                    value={businessInfoState.size}
                  />
                </Stack>
                {/* // todo 선택 창으로 변경하기 */}
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    주차 여부
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="parking"
                    value={String(businessInfoState.parking)}
                    onChange={handleSpaceChangeState}
                  >
                    <FormControlLabel
                      value={"true"}
                      control={<Radio />}
                      label="가능"
                    />
                    <FormControlLabel
                      value={"false"}
                      control={<Radio />}
                      label="불가능"
                    />
                  </RadioGroup>
                </FormControl>
                {/* 주소 */}

                <Stack
                  direction={"row"}
                  spacing={21}
                  style={{ alignItems: "center" }} // 가운데 정렬
                >
                  <Stack direction={"row"} spacing={5}>
                    <span
                      style={{
                        color: "gray",
                        fontSize: 15,
                        whiteSpace: "nowrap",
                        paddingTop: 7,
                      }}
                    >
                      전시희망지역
                    </span>

                    <SelectSizesExample
                      name="address"
                      size={"default"}
                      type={"location"}
                      selectedLocation={businessInfoState.address}
                      onLocationChange={handleSpaceChangeState}
                    />
                  </Stack>
                  {/* 달력 */}
                  <DateRangePickerValue
                    startDate={businessInfoState.startDate}
                    endDate={businessInfoState.endDate}
                    onDateChange={handleDateChange}
                    isEdit={true}
                  />
                </Stack>
                {/* //! 사진 */}
                <Stack direction={"row"}>
                  <span>사진을 첨부해주세요</span>
                  <span
                    style={{ fontSize: "10px", color: "gray", marginTop: 5 }}
                  >
                    (첫 사진이 대표사진이 되며, 최대 8장까지 업로드 할 수
                    있습니다.)
                  </span>
                </Stack>
                <>
                  <ImageList
                    sx={{ width: "100%", height: "auto" }}
                    cols={3}
                    rowHeight={170}
                  >
                    {imgList.map((item) => (
                      <ImageListItem key={item.id}>
                        <img
                          srcSet={`${item.previewUrl}`}
                          src={`${item.previewUrl}`}
                          alt={item.title}
                          loading="lazy"
                          style={{ maxWidth: 250, maxHeight: 170 }}
                        />
                        <IconButton
                          color="primary"
                          style={{ position: "absolute", top: "0", right: "0" }}
                          aria-label="delete"
                          size="large"
                          onClick={() => {
                            onImgDelete(item.id);
                          }}
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </ImageListItem>
                    ))}

                    <Button
                      disabled={imgList.length >= 8}
                      style={{
                        width: imgList.length > 0 ? "250px" : "auto",
                        height: imgList.length > 0 ? "200px" : "auto",
                      }}
                      variant="outlined"
                      component="label"
                      role={undefined}
                      tabIndex={-1}
                      onChange={onImgSelected}
                      accept="image/*"
                      type="file"
                      startIcon={<CloudUploadIcon />}
                    >
                      사진 올리기
                      <VisuallyHiddenInput type="file" />
                    </Button>
                  </ImageList>
                </>
              </Stack>
            </Box>
          )}

          {enableDialog && (
            <MuiDialog
              title={"알림"}
              content={"사진 한 장이상 첨부해주세요"}
              result={true}
              page={"login"}
              parentClick={setEnableDialog}
            />
          )}

          {enableInfoDialog && (
            <MuiDialog
              title={"알림"}
              content={"정보를 다 입력해주세요."}
              result={true}
              page={"login"}
              parentClick={setEnableInfoDialog}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={onHide}>
            닫기
          </Button>

          <ButtonBoot
            variant="dark"
            onClick={() => {
              submitAuthorItem();
            }}
            disabled={!enableNextBtn}
          >
            수정하기
          </ButtonBoot>

          <ButtonBoot
            variant="outline-dark"
            onClick={() => deleteExhibits()}
            disabled={!enableNextBtn}
          >
            삭제하기
          </ButtonBoot>
        </Modal.Footer>
      </Modal>
    </ThemeProvider>
  );
}
