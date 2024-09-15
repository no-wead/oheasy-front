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

// api 통신
import {
  onAddAuthorProjectHandler,
  onUploadAuthorPhotoHandler,
} from "../apis/servicehandeler/AuthorApiHandler";
import {
  onAddSpaceItemHandler,
  onUploadSpacePhotoHandler,
} from "../apis/servicehandeler/SpaceApiHandler";
// 라디오 버튼
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

// 이미지
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
// 쓰레기 통 이미지
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
// 달력 위치
import DatePickerOpenTo, { SelectSizesExample } from "../libs/Open";
import DateRangePickerValue from "./DateRangePickerValue";
import MuiDialog from "./MuiDialog";
import { dark } from "@mui/material/styles/createPalette";
import { Padding } from "@mui/icons-material";

//!------------ 작가랑 공간대여자 아이템 추가 모달
export default function MyVerticallyCenteredModal(props) {
  // 저장 버튼 활성화
  const [enableNextBtn, setEnableNextBtn] = useState(false);
  const [enableDialog, setEnableDialog] = useState(false);

  const [enableInfoDialog, setEnableInfoDialog] = useState(false); // 입력값비었을 때
  // 사진리스트
  const [imgList, setImgList] = useState([]);

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

  const onImgChanged = (id, e) => {
    //이미 이미지가 업로드 되었던것을 다시 선택해서 실행될때는
    //기존의 배열에서 기존의 선택된 이미지를 지우고
    //기존의 배열에서 id 가  동일한 요소 찾기
    //기존 imgList 라는 state변수(배열)은 변하면 안되기 때문에 똑같은 요소를 갖고있는 복제본 생성
    // let cpy = [...imgList];  //배열 복제 //새로운배열 생성. 객체가 들어있다.
    //여기는 문제가 생긴다. int, string 타입이 아닌 객체가 들어있기 때문에 사용할수없음. 하지만 int, string 타입이라면 사용가능.
    let cpy = JSON.parse(JSON.stringify(imgList)); //문자열로 바꾸고 다시 객체로 바꾸면 복제본이 생성된다.

    let target = cpy.find((e) => {
      //복제본을 넣어준다.
      return e.id === id;
    }); //복제본을 넣고, find 함수로 id가 같은것을 찾으면 taget이라는 이름으로 .

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]); //미리보기 url. 어떤url을 미리보기할건지()안에 넣어줘야한다. 그래서, e.target.files[0] --> 사용자가 업로드한 이미지 파일
    reader.onload = () => {
      //다 읽어지면(완료가되면) 실행되는 함수
      target.previewUrl = reader.result; //previewUrl -> 미리보기 바꾸고,
      target.originFile = e.target.files[0]; //origin -> 원본파일도 바꾸고
      setImgList(cpy); //setImgList에서, cpy원본으로 바꿔줘
    };
  };
  // 사진 삭제하기
  const onImgDelete = (id) => {
    setImgList(imgList.filter((e) => e.id !== id));
  };

  const initialAuthorState = {
    name: "",
    phoneNumber: "",
    explanation: "",
    address: "서울",
    title: "",
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

  // 작가용 // todo
  const [authorInfoState, setauthorInfoState] = useState({
    name: "",
    phoneNumber: "",
    explanation: "",
    address: "서울",
    title: "",
    startDate: "",
    endDate: "",
  });

  // 공간대여자용
  const [businessInfoState, setBusinessInfoState] = useState({
    title: "",
    hostName: "",
    intro: "",
    address: "서울",
    size: "",
    phoneNumber: "",
    parking: true,
    fee: 0,
    startDate: "",
    endDate: "",
  });

  // 공간 입력상태 감지
  const handleSpaceChangeState = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);

    setBusinessInfoState({
      ...businessInfoState,
      [e.target.name]: e.target.value,
    });
  };

  // 공간  날짜 변경 핸들러
  const handleDateChange = (newStartDate, newEndDate) => {
    setBusinessInfoState({
      ...businessInfoState,
      startDate: newStartDate,
      endDate: newEndDate,
    });
  };
  // 작가  날짜 변경 핸들러
  const handleDateForAuthorChange = (newStartDate, newEndDate) => {
    setauthorInfoState({
      ...authorInfoState,
      startDate: newStartDate,
      endDate: newEndDate,
    });
  };

  // 작가 입력이 달라지면 상태 감지
  const handleChangeState = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setauthorInfoState({
      ...authorInfoState,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    console.log("저장 버튼 useEffect");
    if (props.type === "author") {
      if (authorInfoState) {
        console.log("빈값없음");
        setEnableNextBtn(true); // 다음 버튼 비활성화
      } else {
        console.log("필수 입력 필드가 비어있습니다.");
        setEnableNextBtn(false); // 다음 버튼 비활성화
      }
    } else {
      console.log(
        "시작 날짜: " +
          businessInfoState.startDate +
          "끝날짜" +
          businessInfoState.endDate +
          "호스트이름" +
          businessInfoState.hostName
      );
      if (businessInfoState) {
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

  //? 등록 생성 하기 api
  const submitAuthorItem = () => {
    console.log(authorInfoState);
    if (props.type === "author" && imgList.length > 0) {
      let authorId = localStorage.getItem("userId");

      onAddAuthorProjectHandler(
        {
          authorId,
          artistName: authorInfoState.name,
          intro: authorInfoState.explanation,
          phone: authorInfoState.phoneNumber,
          startDate: authorInfoState.startDate,
          endDate: authorInfoState.endDate,
          city: authorInfoState.address,
          title: authorInfoState.title,
        },
        (response) => {
          if (response) {
            console.log("작가 아이템 추가 성공");

            const formData = new FormData();
            for (let i = 0; i < imgList.length; i++) {
              formData.append("file", imgList[i].originFile);
            }

            onUploadAuthorPhotoHandler(
              { id: response.projectItemId, formData },
              (responseStatus) => {
                if (responseStatus) {
                  setauthorInfoState(initialAuthorState);

                  setImgList([]);

                  props.setUpdateCount((prev) => prev + 1);
                  props.onHide(); // 부모컴포넌트 프롭
                } else {
                  console.log("이미지 업로드 실패");
                }
              }
            );
          } else {
            setEnableInfoDialog(true);
          }
        }
      );
    } else if (props.type === "space" && imgList.length > 0) {
      let spaceRentalId = localStorage.getItem("userId");
      let newParking = businessInfoState.parking === "true" ? true : false;
      onAddSpaceItemHandler(
        {
          title: businessInfoState.title,
          spaceRentalId: spaceRentalId,
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
        (response) => {
          if (response) {
            const formData = new FormData();
            for (let i = 0; i < imgList.length; i++) {
              formData.append("file", imgList[i].originFile); //반복문을 활용하여 파일들을 formData객체에 추가
            }

            onUploadSpacePhotoHandler(
              { id: response.spaceItemId, formData },
              (responseStatus) => {
                if (responseStatus) {
                  setBusinessInfoState(initialSpaceState);
                  setImgList([]);
                  props.setUpdateCount((prev) => prev + 1);
                  props.onHide(); // 부모컴포넌트 프롭
                } else {
                  alert("이미지 업로드 실패");
                }
              }
            );
          } else {
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
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.type === "author" ? "작품 추가하기" : "공간 추가하기"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* // todo 작가 아이템에도 달력, 위치 넣어야함 서버에도 */}
          {props.type === "author" ? (
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
                    label="작가 이름"
                    variant="standard"
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                  id="standard-author-title"
                  label="작품명"
                  type="search"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  onChange={handleChangeState}
                  value={authorInfoState.title}
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
                    <SelectSizesExample
                      name="address"
                      size={"default"}
                      type={"location"}
                      selectedLocation={authorInfoState.address}
                      onLocationChange={handleChangeState}
                    />
                  </Stack>

                  {/* 달력 */}
                  <DateRangePickerValue
                    format="YYYY-MM-DD"
                    startDate={authorInfoState.startDate}
                    endDate={authorInfoState.endDate}
                    onDateChange={handleDateForAuthorChange}
                    isEdit={false}
                  />
                </Stack>

                {/* //! 사진 */}
                <Stack
                  direction={"row"}
                  style={{ marginTop: 15, alignItems: "center" }}
                >
                  <span>사진을 첨부해주세요</span>
                  <span style={{ fontSize: "10px", color: "gray" }}>
                    (첫 사진이 대표사진이 되며, 8장까지 업로드 할 수 있습니다.)
                  </span>
                </Stack>
                <>
                  <ImageList
                    sx={{ width: "100%", height: "auto" }}
                    cols={3}
                    rowHeight={170}
                    style={{ marginBottom: 5 }}
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
                  value={businessInfoState.title}
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

                {/* 위치 */}
                <Stack spacing={20} direction="row">
                  <TextField
                    name="fee"
                    id="standard-search-authPassword"
                    label="대여료/1일"
                    type="number"
                    variant="standard"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ width: 210 }} // 가로 너비를 자동으로 설정
                    onChange={handleSpaceChangeState}
                  />

                  <TextField
                    name="size"
                    id="standard-search-id"
                    label="면적/평"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    onChange={handleSpaceChangeState}
                    value={businessInfoState.size}
                  />
                </Stack>

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
                      control={
                        <Radio
                          sx={{
                            color: "black", // 기본 색상을 검정색으로 설정
                            "&.Mui-checked": {
                              color: "black", // 선택된 상태의 색상을 검정색으로 설정
                            },
                          }}
                        />
                      }
                      label="가능"
                    />
                    <FormControlLabel
                      value={"false"}
                      control={
                        <Radio
                          sx={{
                            color: "black", // 기본 색상을 검정색으로 설정
                            "&.Mui-checked": {
                              color: "black", // 선택된 상태의 색상을 검정색으로 설정
                            },
                          }}
                        />
                      }
                      label="불가능"
                    />
                  </RadioGroup>
                </FormControl>
                {/* 지역 */}
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
                    isEdit={false}
                  />
                </Stack>
                {/* //! 사진 올리기  */}
                {/* <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                사진 올리기
                <VisuallyHiddenInput type="file" />
              </Button> */}
                {/* //! 사진 */}
                <Stack direction={"row"}>
                  <span>사진을 첨부해주세요</span>
                  <span
                    style={{ fontSize: "10px", color: "gray", marginTop: 5 }}
                  >
                    (첫 사진이 대표사진이 되며, 8장까지 업로드 할 수 있습니다.)
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
          <Button variant="dark" onClick={props.onHide}>
            닫기
          </Button>

          <ButtonBoot
            variant="dark"
            onClick={submitAuthorItem}
            disabled={!enableNextBtn}
          >
            등록하기
          </ButtonBoot>
        </Modal.Footer>
      </Modal>
    </ThemeProvider>
  );
}
