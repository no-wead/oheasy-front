import { useEffect, useState } from "react";

import EditText from "../components/EditText";
import { useNavigate, useSearchParams } from "react-router-dom";
// api
import { onSignupUserHandler } from "../apis/servicehandeler/ApiHandler";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";

import { validateEmail } from "../util/GlobalFunc"; // 이메일 형식
// 배지
import Badge from "@mui/material/Badge";
// 레이아웃
import Box from "@mui/material/Box";

// 다이어로그
import MuiDialog from "../libs/MuiDialog";
// 클릭시 밑줄색
import { ThemeProvider, createTheme } from "@mui/material";
import { Business } from "@mui/icons-material";

// 회원가입 완료
// todo("회원가입 통신 연결해야함 ")
// todo("개인 사업자 버튼 이벤트 넣기 ")

const SignupUser = () => {
  const nav = useNavigate();
  const [isActive, setIsActive] = useState(true); // 초기 상태는 '개인'이 활성화
  const [enableSuccessDialog, setEnableSuccessDialog] = useState(false);
  // '개인' 버튼 클릭 핸들러
  const handlePersonalClick = () => {
    setIsActive(true);
  };

  // '사업자' 버튼 클릭 핸들러
  const handleBusinessClick = () => {
    setIsActive(false);
    console.log("비즈니스 로그인으로 이동");
    nav(`/loginbusiness`);
  };
  // 다음 버튼 활성화
  const [enableNextBtn, setEnableNextBtn] = useState(true);
  const [enableDialog, setEnableDialog] = useState(false);
  const [falseDialog, setFalseDialog] = useState(false); //  에러 다이어로그 - 정보가 비어있음
  const [falsePassDialog, setFalsePassDialog] = useState(false); //  에러 다이어로그 - 비번
  // 밑줄 색 바꾸기
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

  const submitsignup = () => {
    if (state.password === state.authPassword) {
      // 회원가입 통신
      if (Object.values(state).every((value) => value !== "")) {
        onSignupUserHandler(
          {
            userName: state.name,
            id: state.id,
            phoneNum: state.phoneNumber,
            email: state.email,
            pass: state.password,
            authPass: state.authPassword,
          },
          (success) => {
            console.log("callback 안 ");
            if (!success) {
              console.log("callback 실패 안 ");
              setEnableDialog(true);
            } else {
              setEnableSuccessDialog(true);
              console.log("callback 성공 안 ");
              // 성공시 콜백
              console.log("Signup successful, navigating back");
            }
          }
        );
      } else {
        setFalseDialog(true);
      }
    } else {
      console.log("비번틀림 ");
      setFalsePassDialog(true);
    }
  };

  const [state, setState] = useState({
    name: "",
    id: "",
    phoneNumber: "",
    email: "",
    password: "",
    authPassword: "",
  });

  useEffect(() => {
    // if (validateEmail(state.email)) {
    //   console.log("이메일일치");
    //   setEnableNextBtn(true); // 다음 버튼 활성화
    // } else {
    //   console.log("이메일불일치");
    //   setEnableNextBtn(false); // 다음 버튼 비활성화
    // }
  }, [state]); // state 객체의 모든 변경에 반응

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
        sx={{
          marginTop: 5,
          marginBottom: 5,
          width: "100%", // 박스 너비 설정
          display: "flex", // flexbox 디스플레이 설정
          justifyContent: "center", // 가로 중앙 정렬
        }}
      >
        <h1>Signup</h1>
      </Box>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          marginTop: 4,
          marginBottom: 2,
          width: "100%", // 박스 너비 설정
          display: "flex", // flexbox 디스플레이 설정
          justifyContent: "center", // 가로 중앙 정렬
        }}
      >
        <Stack spacing={2}>
          <div>
            <Stack spacing={3} direction="row" marginLeft={7.5}>
              <Button
                color="inherit"
                size="large"
                onClick={handlePersonalClick}
                sx={{
                  color: isActive ? "black" : "grey", // 활성화 상태에 따라 색상 변경
                  fontWeight: isActive ? "bold" : "normal", // 활성화 상태에 따라 굵기 변경
                }}
              >
                개인
              </Button>
              {/* <Stack spacing={2} direction="row" style={{ marginLeft: 35 }}>
              <Badge color="info" badgeContent=" ">
                <Button color="info" size="large">
                  개인
                </Button>
              </Badge> */}
              {/* <Button
                color="inherit"
                size="large"
                onClick={() => {
                  console.log("비즈니스 로그인으로이동");
                  nav(`/loginbusiness`);
                }}
              >
                사업자
              </Button> */}
              <Button
                color="inherit"
                size="large"
                onClick={handleBusinessClick}
              >
                사업자
              </Button>
            </Stack>
          </div>
          <ThemeProvider theme={theme}>
            <div>
              <TextField
                name="name"
                id="standard-search-name"
                label="이름"
                type="search"
                variant="standard"
                onChange={handleChangeState}
                style={{ marginLeft: 10 }}
              />
            </div>
            <div>
              <TextField
                name="id"
                id="standard-search-id"
                label="아이디"
                type="search"
                variant="standard"
                onChange={handleChangeState}
                style={{ marginLeft: 10 }}
              />
            </div>
            <div>
              <TextField
                name="phoneNumber"
                id="standard-number"
                label="전화번호"
                type="number"
                // InputLabelProps={{
                //   shrink: true,
                // }}
                variant="standard"
                onChange={handleChangeState}
                style={{ marginLeft: 10 }}
              />
            </div>
            <div>
              <TextField
                name="email"
                id="standard-search-email"
                label="이메일"
                type="search"
                variant="standard"
                onChange={handleChangeState}
                style={{ marginLeft: 10 }}
              />
            </div>
            <div>
              <TextField
                name="password"
                id="standard-search-Password"
                label="비밀번호"
                type="password"
                variant="standard"
                onChange={handleChangeState}
                style={{ marginLeft: 10 }}
              />
            </div>
            <div>
              <TextField
                name="authPassword"
                id="standard-search-authPassword"
                label="비밀번호확인"
                type="password"
                variant="standard"
                onChange={handleChangeState}
                style={{ marginLeft: 10 }}
              />
            </div>
          </ThemeProvider>
          <button
            type="button"
            class="btn btn-dark"
            onClick={submitsignup}
            disabled={!enableNextBtn}
            style={{
              border: "1px solid #000",
              borderRadius: "0",
              height: "40px",
            }}
          >
            회원가입
          </button>
        </Stack>
        {enableDialog && (
          <MuiDialog
            title={"알림"}
            content={"이미 가입 된 회원입니다!"}
            result={true}
            page={"userSignUp"}
          />
        )}
        {falseDialog && (
          <MuiDialog
            title={"알림"}
            content={"정보를 다 작성해주세요"}
            result={true}
            page={"login"}
            parentClick={setFalseDialog}
          />
        )}
        {falsePassDialog && (
          <MuiDialog
            title={"알림"}
            content={"비밀번호가 일치하지 않습니다."}
            result={true}
            page={"login"}
            parentClick={setFalsePassDialog}
          />
        )}
        {enableSuccessDialog && (
          <MuiDialog
            title={"알림"}
            content={"가입되었습니다! 로그인화면으로 이동합니다"}
            result={true}
            page={"goLogin"}
            parentClick={setEnableSuccessDialog}
          />
        )}
      </Box>
    </>
  );
};

export default SignupUser;
