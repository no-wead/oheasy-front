import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { validateEmail } from "../util/GlobalFunc"; // 이메일 형식
import { string } from "prop-types";
import Alert from "@mui/material/Alert"; // alert

// api
import {
  onFindPassForAuthorByEmailHandler,
  onConfirmEmailAuthForAuthorHandler,
} from "../apis/servicehandeler/AuthorApiHandler";
import {
  onFindPassForSpaceByEmailHandler,
  onConfirmEmailAuthForSpaceHandler,
} from "../apis/servicehandeler/SpaceApiHandler";
import { containerClasses } from "@mui/material";

const FindPassBusiness = () => {
  const nav = useNavigate();
  const uselocation = useLocation();
  const { userInfo } = uselocation.state; // 유저 유형

  // todo 이메일찾기 연결하고 false로 원상복귀하기
  // 이메일 유효한지
  const [isEmailValid, setIsEmailValid] = useState(false);
  // 이메일 인증번호 버튼 제어
  const [enableAuthBtn, setEnableAuthBtn] = useState(false);

  // 인증번호확인 눌렀을 때 경고창 => 인증번호 확인이 잘됐고 안됐고
  const [enableSuccessAlert, setEnableSuccessAlert] = useState(false);
  const [enableFailAlert, setEnableFailAlert] = useState(false);

  const [state, setState] = useState({
    id: "",
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
  //
  useEffect(() => {
    if (state.id.length > 3) {
      setIsEmailValid(validateEmail(state.email)); // 이메일보내기 버튼 활성화
    }
    console.log("유저 정보" + userInfo);
  }, [state.email, state.id]);

  const sendAuthNumber = () => {
    console.log("인증번호 보내기");
    if (userInfo === "author") {
      console.log("작가 인증번호보냄");
      onFindPassForAuthorByEmailHandler(
        { id: state.id, email: state.email },
        () => {
          setEnableAuthBtn(true); // 이메일 인증 활성화
          setEnableSuccessAlert(true);
          setTimeout(() => {
            setEnableSuccessAlert(false);
          }, 1000);
        }
      );
    } else {
      console.log("공간 인증번호보냄");
      onFindPassForSpaceByEmailHandler(
        { id: state.id, email: state.email },
        () => {
          setEnableAuthBtn(true); // 이메일 인증 활성화
          setEnableSuccessAlert(true);
          setTimeout(() => {
            setEnableSuccessAlert(false);
          }, 1000);
        }
      );
    }
  };

  const certifyAuthNumber = () => {
    console.log("인증번호 확인 클릭이벤트 안");

    if (userInfo === "author") {
      onConfirmEmailAuthForAuthorHandler(
        { id: state.id, email: state.email, authNum: state.authnumber },
        (responseStatus) => {
          if (responseStatus) {
            nav(`/resetpwbusiness`, {
              replace: true,
              state: {
                userInfo: userInfo, // 작가인지 공간 대여자인지
                id: state.id,
              },
            });
          } else {
            // 인증번호 틀렸을 때
            setEnableFailAlert(true);
            setTimeout(() => {
              setEnableFailAlert(false);
            }, 2000);
          }
        }
      );
    } else {
      onConfirmEmailAuthForSpaceHandler(
        { id: state.id, email: state.email, authNum: state.authnumber },
        (responseStatus) => {
          if (responseStatus) {
            nav(`/resetpwbusiness`, {
              replace: true,
              state: {
                userInfo: userInfo, // 작가인지 공간 대여자인지
                id: state.id,
              },
            });
          } else {
            // 인증번호 틀렸을 때
            setEnableFailAlert(true);
            setTimeout(() => {
              setEnableFailAlert(false);
            }, 2000);
          }
        }
      );
    }
  };

  return (
    <>
      {enableSuccessAlert && (
        <Alert severity="success">메일로 인증번호가 전송되었습니다.</Alert>
      )}
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
          marginBottom: 20,
        }}
        noValidate
        autoComplete="off"
      >
        <h2 style={{ marginBottom: 40, marginTop: 30 }}>비밀번호 찾기</h2>

        <div>
          <TextField
            name="id"
            id="standard-search"
            label="아이디"
            type="search"
            variant="standard"
            onChange={handleChangeState}
            disabled={enableAuthBtn}
          />
        </div>
        <div>
          <Stack
            spacing={2}
            direction="row"
            style={{
              marginLeft: 70,
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
              disabled={enableAuthBtn}
            />

            <button
              type="button"
              class="btn btn-dark"
              onClick={sendAuthNumber}
              disabled={!isEmailValid}
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
              marginLeft: 70,
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
            >
              확인
            </button>
          </Stack>
        </div>
      </Box>
    </>
  );
};
export default FindPassBusiness;
