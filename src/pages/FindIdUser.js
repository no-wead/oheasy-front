import { useState } from "react";

import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
// api
import { onFindUserIdHandler } from "../apis/servicehandeler/ApiHandler";
import {
  onFindIdSendEmailHandler,
  onConfirmEmailAuthHandler,
} from "../apis/servicehandeler/MatchingApiHandler"; // 이메일 보내기
// import {  } from "../apis/servicehandeler/MatchingApiHandler"; // 이메일 번호 인증

// 다이어로그
import MuiDialog from "../libs/MuiDialog";

import { validateEmail } from "../util/GlobalFunc"; // 이메일 형식
import Alert from "@mui/material/Alert"; // alert
import { useEffect } from "react";
const FindIdUser = () => {
  const nav = useNavigate();
  const [enableDialog, setEnableDialog] = useState(false); //  다이어로그
  const [enableNotUserDialog, setEnableNotUserDialog] = useState(false); //  다이어로그
  // todo api 연결하기
  // 이메일 전송 버튼 제어 => 이메일 정규식에 따라 활성화
  const [isEmailValid, setIsEmailValid] = useState(false);
  // 이메일 인증번호 버튼 제어
  const [enableAuthBtn, setEnableAuthBtn] = useState(false);
  // 다음 버튼 활성화
  const [enableNextBtn, setEnableNextBtn] = useState(false);
  const [enableSuccessAlert, setEnableSuccessAlert] = useState(false);
  const [enableFailAlert, setEnableFailAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [findedId, setFindedId] = useState("");
  const [state, setState] = useState({
    name: "",
    email: "",
    authnumber: "",
  });

  // id, pw 입력이 달라지면 상태 감지
  const handleChangeState = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (state.name.length > 2) {
      setIsEmailValid(validateEmail(state.email));
    } else {
      setIsEmailValid(false);
    }
  }, [state.name, state.email]);

  // 이메일에 인증번호 보내기
  const sendAuthNumber = () => {
    console.log("인증번호 보내기");
    onFindIdSendEmailHandler({ email: state.email }, () => {
      setSuccessMessage("메일로 인증번호를 전송했습니다");
      setEnableSuccessAlert(true);
      setTimeout(() => {
        setEnableSuccessAlert(false);
      }, 1000);
      setEnableAuthBtn(true); // 이메일 인증 활성화
    });
  };
  // 인증번호 확인 버튼
  const certifyAuthNumber = () => {
    onConfirmEmailAuthHandler(
      { email: state.email, authNum: state.authnumber },
      (success) => {
        if (success) {
          setSuccessMessage("인증번호가 일치합니다");
          setEnableSuccessAlert(true);
          setTimeout(() => {
            setEnableSuccessAlert(false);
          }, 1000);
          setEnableNextBtn(true);
        } else {
          // 인증번호 활성화 안됐을 때
          setEnableFailAlert(true);
          setTimeout(() => {
            setEnableFailAlert(false);
          }, 2000);
        }
      }
    );
  };
  // 아이디 찾기에서 다음 누를 시
  const nextPage = () => {
    onFindUserIdHandler({ email: state.email }, (entity) => {
      console.log("아이디 찾기 상태값" + entity.status);
      if (entity.status) {
        // 성공시 콜백
        setEnableDialog(true);
        setFindedId(entity.result); // 성공 응답 저장
      } else {
        setEnableNotUserDialog(true);
      }
    });
  };

  return (
    <>
      {enableFailAlert && (
        <Alert severity="error" style={{ zIndex: 2 }}>
          {" "}
          인증번호가 틀렸습니다.
        </Alert>
      )}
      {enableSuccessAlert && (
        <Alert severity="success" style={{ zIndex: 2 }}>
          {" "}
          {successMessage}
        </Alert>
      )}

      <Box
        component="form"
        sx={{
          display: "flex", // 사용 flexbox 레이아웃
          flexDirection: "column", // 요소들을 세로로 정렬
          alignItems: "center", // 가로 방향으로 가운데 정렬
          "& .MuiTextField-root": { m: 1, width: "25ch" }, // 각 텍스트 필드 스타일 지정
        }}
        noValidate
        autoComplete="off"
      >
        <h2 style={{ marginBottom: 20, marginTop: 30 }}>아이디 찾기</h2>
        <div>
          <TextField
            name="name"
            id="standard-search"
            label="이름"
            type="search"
            variant="standard"
            onChange={handleChangeState}
          />
        </div>
        <div>
          <Stack
            spacing={2}
            direction="row"
            style={{
              marginLeft: 63,
              marginTop: 10, // 위 여백 추가
              marginBottom: 10, // 아래 여백 추가
              alignItems: "center", // 요소들의 높이를 각 요소에 맞춤
            }}
          >
            <TextField
              name="email"
              id="standard-search"
              label="이메일"
              type="search"
              variant="standard"
              onChange={handleChangeState}
              disabled={enableNextBtn}
            />

            <button
              type="button"
              class="btn btn-dark"
              onClick={sendAuthNumber}
              disabled={!isEmailValid}
              style={{ padding: 7 }}
            >
              전송
            </button>
          </Stack>
        </div>
        <div>
          <Stack
            spacing={2}
            direction="row"
            style={{
              marginLeft: 63,
              marginTop: 10, // 위 여백 추가
              marginBottom: 10, // 아래 여백 추가
              alignItems: "center", // 요소들의 높이를 각 요소에 맞춤
            }}
          >
            <TextField
              name="authnumber"
              id="standard-number"
              label="인증번호 "
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              onChange={handleChangeState}
            />

            <button
              type="button"
              class="btn btn-dark"
              onClick={certifyAuthNumber}
              disabled={!enableAuthBtn}
              style={{ padding: 7 }}
            >
              확인
            </button>
          </Stack>
        </div>

        <button
          type="button"
          class="btn btn-dark"
          onClick={nextPage}
          disabled={!enableNextBtn}
          style={{ marginTop: 50, marginBottom: 90 }}
        >
          다음
        </button>
        {enableDialog && (
          <MuiDialog
            title={"알림"}
            content={"귀하의 Id는 " + findedId + "입니다!"}
            result={true}
            page={"goLogin"}
            parentClick={setEnableDialog}
          />
        )}
        {enableNotUserDialog && (
          <MuiDialog
            title={"알림"}
            content={"가입되지 않은 회원입니다! 회원가입해주세요"}
            result={true}
            page={"goLogin"}
            parentClick={setEnableNotUserDialog}
          />
        )}
      </Box>
    </>
  );
};
export default FindIdUser;
