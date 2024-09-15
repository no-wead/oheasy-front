import { useNavigate } from "react-router-dom";

import * as React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { useState } from "react";

import MuiDialog from "../../libs/MuiDialog";

import { onAdminSignInHandler } from "../../apis/servicehandeler/AdminApiHandler";

import { TextField, createTheme, ThemeProvider } from "@mui/material";

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
  },
});

const LoginAdmin = () => {
  const nav = useNavigate();
  const [enableLoginDialog, setEnableLoginDialog] = useState(false); //  다이어로그
  const handleLoginClick = () => {
    // todo 관리자 api 연결하기

    onAdminSignInHandler({ id: state.id, pw: state.pw }, (result) => {
      if (result) {
        let userType = localStorage.getItem("userId");
        let userId = localStorage.getItem("userType");
        console.log(
          "유저 로그인 유저 번호 : " + userId + "유저타입:" + userType
        );

        nav(`/mainadmin`);
      } else {
        setEnableLoginDialog(true);
      }
    });
  };

  const [state, setState] = useState({
    id: "",
    pw: "",
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

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          width: "100%", // 박스 너비 설정
          display: "flex", // flexbox 디스플레이 설정
          justifyContent: "center", // 가로 중앙 정렬
        }}
        noValidate
        autoComplete="off"
      >
        <Stack
          direction="column"
          spacing={2}
          style={{
            marginTop: 100,
            marginBottom: 260,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 30, marginBottom: 10 }}>AdminLogin </span>
          <ThemeProvider theme={theme}>
            <TextField
              name="id"
              id="standard-search"
              label="아이디"
              type="search"
              variant="standard"
              onChange={handleChangeState}
            />

            <TextField
              name="pw"
              id="standard-password-input"
              label="비밀번호"
              type="password"
              autoComplete="current-password"
              variant="standard"
              onChange={handleChangeState}
            />
          </ThemeProvider>
          <button
            type="button"
            class="btn btn-dark"
            onClick={handleLoginClick}
            style={{
              border: "1px solid #000",
              borderRadius: "0",
              width: "100px",
              height: "40px",
            }}
          >
            로그인
          </button>
        </Stack>
      </Box>
      {enableLoginDialog && (
        <MuiDialog
          title={"알림"}
          content={"아이디/비밀번호 재확인해주세요"}
          result={true}
          page={"login"}
          parentClick={setEnableLoginDialog}
        />
      )}
    </>
  );
};

export default LoginAdmin;
