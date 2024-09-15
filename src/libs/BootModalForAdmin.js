import ButtonBoot from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useEffect, useRef, useState } from "react";
// 레이아웃
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

// 업로드
import * as React from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// api 통신
import { onAddAuthorProjectHandler } from "../apis/servicehandeler/AuthorApiHandler";
import { onAddSpaceItemHandler } from "../apis/servicehandeler/SpaceApiHandler";

import MuiDialog from "./MuiDialog";

import {
  onAddExhibitHandler,
  onGetExhibitInfoHandler,
  onDeleteSingleExhibitHandler,
  onUpdateExhibitHandler,
} from "../apis/servicehandeler/AdminApiHandler";
// 라디오 버튼
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
//!--------------전시 생성/수정용 모달
// 달력 위치
import DatePickerOpenTo, { SelectSizesExample } from "../libs/Open";
import DateRangePickerValue from "./DateRangePickerValue";
import DateRangePickerValueForAdmin from "./DateRangePickerValueForAdmin";
// todo props 에 전시 생성인지 수정인지 구분 필요 create/ update, matchingId/exhibitId 들어감
// 작가랑 공간대여자 아이템 추가하기
export default function BootModalForAdmin({
  show,
  onHide,
  type,
  id,
  setUpdateCount,
  setUpdate,
}) {
  const [enableDialog, setEnableDialog] = useState(false); //  다이어로그
  // 전시생성 버튼 활성화
  const [enableNextBtn, setEnableNextBtn] = useState(false);

  // todo 이넘값 변경됨
  //  전시 내용
  const [exhibitInfoState, setExhibitInfoState] = useState({
    name: "", // 전시명
    intro: "", // 전시소개
    startDate: "", // 시작날짜
    endDate: "", // 끝날짜
    artistName: "", // 직가명
    hostName: "", // 주최자명
    price: "", // 가격
    address: "서울", // 주소
  });

  // 전시 입력상태 감지
  const handleExhibitInfoStateChange = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);

    setExhibitInfoState({
      ...exhibitInfoState,
      [e.target.name]: e.target.value,
    });
  };

  //   날짜 변경 핸들러
  const handleDateChange = (newStartDate, newEndDate) => {
    console.log("부모날짜 : " + newStartDate + newEndDate);
    setExhibitInfoState({
      ...exhibitInfoState,
      startDate: newStartDate,
      endDate: newEndDate,
    });
  };

  // 입력이 달라지면 상태 감지

  useEffect(() => {
    console.log("matchingId" + id);
    console.log(
      "startDay : " +
        exhibitInfoState.startDate +
        "endDate" +
        exhibitInfoState.endDate +
        "location" +
        exhibitInfoState.address
    );

    if (type === "create") {
      if (
        exhibitInfoState.name.length > 1 &&
        exhibitInfoState.intro.length > 1 &&
        exhibitInfoState.artistName.length > 1 &&
        exhibitInfoState.price.length > 1 &&
        exhibitInfoState.hostName.length > 1
      ) {
        console.log("빈값없음");
        setEnableNextBtn(true); // 다음 버튼 비활성화
      } else {
        console.log("필수 입력 필드가 비어있습니다.");
        setEnableNextBtn(false); // 다음 버튼 비활성화
      }
    }
    if (type === "update") {
      if (
        exhibitInfoState.name.length > 1 &&
        exhibitInfoState.intro.length > 1 &&
        exhibitInfoState.artistName.length > 1 &&
        exhibitInfoState.price.length > 1 &&
        exhibitInfoState.hostName.length > 1
      ) {
        console.log("빈값없음");
        setEnableNextBtn(true); // 다음 버튼 비활성화
      } else {
        console.log("필수 입력 필드가 비어있습니다.");
        setEnableNextBtn(false); // 다음 버튼 비활성화
      }
    }
  }, [exhibitInfoState]);

  // 처음에만 전시 정보 불러오기
  useEffect(() => {
    console.log("전시정보 불러오기 useEffect");

    if (type === "update" && id !== undefined) {
      // todo 전시 정보 불러오기
      console.log("전시 modal id " + id);
      onGetExhibitInfoHandler({ exhibitId: id }, (response) => {
        console.log("전시 수정시 전시 정보 응답값 받음");
        console.log(response);
        setExhibitInfoState((prevState) => ({
          name: response.data.name, // 전시명
          intro: response.data.intro, // 전시소개
          startDate: response.data.startDate, // 시작날짜
          endDate: response.data.endDate, // 끝날짜
          artistName: response.data.artistName, // 직가명
          hostName: response.data.hostName, // 주최자명
          price: response.data.price, // 가격
          address: response.data.city, // 주소
        }));
      });
    }
  }, []);
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
  // 전시 삭제 api
  const deleteExhibits = () => {
    onDeleteSingleExhibitHandler({ exhibitId: id }, () => {
      console.log("전시 삭제 완료!!!!!!!!!!!");
      // 모달 닫기
      setUpdateCount((prev) => prev + 1);
      onHide();
    });
  };
  // 전시 정보 수정하기 api
  const updateExhibit = () => {
    // 전시 정보 생성의 경우
    if (type === "create") {
      onAddExhibitHandler(
        {
          matchingId: id,
          name: exhibitInfoState.name,
          intro: exhibitInfoState.intro,
          startDate: exhibitInfoState.startDate,
          endDate: exhibitInfoState.endDate,
          artistName: exhibitInfoState.artistName,
          hostName: exhibitInfoState.hostName,
          price: exhibitInfoState.price,
          city: exhibitInfoState.address,
        },
        (responseStatus) => {
          if (responseStatus) {
            console.log("전시 추가 성공");
            setEnableDialog(true);
            setUpdate(false); // 전시생성, 상태변경 없앰
            setUpdateCount((prev) => prev + 1);
            onHide(); // 부모컴포넌트 프롭
          }
        }
      );
    } else if (type === "update") {
      onUpdateExhibitHandler(
        {
          exhibitId: id,
          name: exhibitInfoState.name,
          intro: exhibitInfoState.intro,
          startDate: exhibitInfoState.startDate,
          endDate: exhibitInfoState.endDate,
          artistName: exhibitInfoState.artistName,
          hostName: exhibitInfoState.hostName,
          price: exhibitInfoState.price,
          city: exhibitInfoState.address,
        },
        () => {
          console.log(" 전시 수정 성공");
          setUpdateCount((prev) => prev + 1);
          onHide(); // 부모컴포넌트 프롭
        }
      );
    } else {
      console.log("아이템등로 잘못된 접근");
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {type === "create" ? "전시생성하기" : "전시 수정하기"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* // todo 작가 아이템에도 달력, 위치 넣어야함 서버에도 */}
          <Box>
            <Stack spacing={2}>
              <TextField
                name="name"
                id="standard-number-busi"
                label="전시명"
                type="search"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                onChange={handleExhibitInfoStateChange}
                value={exhibitInfoState.name} // 상태와 입력 필드 연결
              />
              <TextField
                name="intro"
                id="outlined-multiline-static"
                label="전시 소개"
                multiline
                rows={10}
                onChange={handleExhibitInfoStateChange}
                value={exhibitInfoState.intro}
              />
              <TextField
                name="artistName"
                id="outlined-multiline-static"
                label="아티스트이름"
                type="search"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                onChange={handleExhibitInfoStateChange}
                value={exhibitInfoState.artistName}
              />
              <TextField
                name="hostName"
                id="outlined-multiline-static"
                label="주최자"
                type="search"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                onChange={handleExhibitInfoStateChange}
                value={exhibitInfoState.hostName}
              />

              <Stack spacing={16} direction="row">
                <TextField
                  name="price"
                  id="standard-search-id"
                  label="가격"
                  type="number"
                  variant="standard"
                  onChange={handleExhibitInfoStateChange}
                  value={exhibitInfoState.price}
                />

                {/* 주소 */}
                <SelectSizesExample
                  name="address"
                  size={"default"}
                  type={"location"}
                  selectedLocation={exhibitInfoState.address}
                  onLocationChange={handleExhibitInfoStateChange}
                />
              </Stack>
              {/* 달력 */}
              <DateRangePickerValueForAdmin
                startDate={exhibitInfoState.startDate}
                endDate={exhibitInfoState.endDate}
                onDateChange={handleDateChange}
                isEdit={type === "update" ? true : false}
              />
            </Stack>
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={onHide}>
            닫기
          </Button>
          {type == "create" && (
            <ButtonBoot
              variant="dark"
              onClick={updateExhibit}
              disabled={!enableNextBtn}
            >
              등록하기
            </ButtonBoot>
          )}
          {type == "update" && (
            <ButtonBoot
              variant="dark"
              onClick={updateExhibit}
              disabled={!enableNextBtn}
            >
              수정하기
            </ButtonBoot>
          )}
          {type === "update" && (
            <Button variant="dark" onClick={() => deleteExhibits()}>
              삭제하기
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      {enableDialog && (
        <MuiDialog
          title={"알림"}
          content={"전시 추가되었습니다"}
          result={true}
          page={"login"}
          parentClick={setEnableDialog}
        />
      )}
    </>
  );
}
