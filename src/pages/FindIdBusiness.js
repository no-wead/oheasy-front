import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate, useLocation } from "react-router-dom";
import EditText from "../components/EditText";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert"; // alert

import MuiDialog from "../libs/MuiDialog";

//api
import { onFindAuthorIdHandler } from "../apis/servicehandeler/AuthorApiHandler";
import { onFindSpaceIdHandler } from "../apis/servicehandeler/SpaceApiHandler";

import {
  onConfirmEmailForEveryHandler,
  onConfirmEmailAuthForEveryHandler,
} from "../apis/servicehandeler/MatchingApiHandler";

import { validateEmail } from "../util/GlobalFunc"; // 이메일 형식

const FindIdBusiness = () => {
  const uselocation = useLocation();
  const { userInfo } = uselocation.state;
  const nav = useNavigate();

  const [enableNotUserDialog, setEnableNotUserDialog] = useState(false); //  다이어로그

  // 이메일 전송 버튼 제어 => 이메일 정규식에 따라 활성화
  const [isEmailValid, setIsEmailValid] = useState(false);
  // 이메일 인증번호 버튼 제어
  const [enableAuthBtn, setEnableAuthBtn] = useState(false);
  // 다음 버튼 활성화
  const [enableNextBtn, setEnableNextBtn] = useState(false);

  const [enableDialog, setEnableDialog] = useState(false); //  다이어로그

  const [findedId, setFindedId] = useState("");

  // 인증번호 버튼 눌렀을 때 경고창 => 인증번호 틀리고 안틀리고
  const [enableSuccessAlert, setEnableSuccessAlert] = useState(false);
  const [enableFailAlert, setEnableFailAlert] = useState(false);

  const [state, setState] = useState({
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
  // 인증번호 보내기
  const sendAuthNumber = () => {
    onConfirmEmailForEveryHandler({ email: state.email }, (response) => {
      if (response) {
        setEnableAuthBtn(true);
      } else {
        setEnableAuthBtn(false);
      }
    });
  };
  // 인증번호 인증
  const certifyAuthNumber = () => {
    onConfirmEmailAuthForEveryHandler(
      { email: state.email, authNum: state.authnumber },
      (response) => {
        if (response) {
          setEnableNextBtn(true);
        } else {
          setEnableFailAlert(true);
          setTimeout(() => {
            setEnableFailAlert(false);
          }, 2000);
          setEnableNextBtn(false);
        }
      }
    );
  };
  // 이메일 인증 활성화
  useEffect(() => {
    if (validateEmail(state.email)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  }, [state.email]);

  // 아이디 찾기 api
  const nextPage = () => {
    if (userInfo === "author") {
      onFindAuthorIdHandler({ email: state.email }, (response) => {
        setFindedId(response.message);
        setEnableDialog(true);
        if (response === false) {
          setEnableNotUserDialog(true);
        }
      });
    } else if (userInfo === "space") {
      onFindSpaceIdHandler({ email: state.email }, (response) => {
        setFindedId(response.id);
        setEnableDialog(true);
        if (response === false) {
          setEnableNotUserDialog(true);
        }
      });
    }
  };

  return (
    <>
      {enableFailAlert && (
        <Alert severity="error"> 인증번호가 틀렸습니다.</Alert>
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
          style={{ marginTop: 50, marginBottom: 78 }}
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
export default FindIdBusiness;
