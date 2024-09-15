import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import EditText from "./EditText";
import TextField from "@mui/material/TextField";
import { validateEmail } from "../util/GlobalFunc"; // 이메일 형식
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { useNavigate, useSearchParams } from "react-router-dom";
import MuiDialog from "../libs/MuiDialog";
// api
import {
  onsignupAuthorHandler,
  onGetAuthorInfoHandler,
  onUpdateUserInfoHandler,
} from "../apis/servicehandeler/AuthorApiHandler"; // 작가
import {
  onSignupSpaceHandler,
  onUpdateSpaceInfoHandler,
  onGetSpaceInfoHandler,
} from "../apis/servicehandeler/SpaceApiHandler"; //공간대여자

// 레이아웃
import Box from "@mui/material/Box";

// 클릭시 밑줄색
import { ThemeProvider, createTheme } from "@mui/material";

//회원가입
import { common } from "@mui/material/colors";
import { CompressSharp } from "@mui/icons-material";

//!------1. 사업자 회원가입 2. 정보 수정 시 사용

// isbusinessInfo true => 회원정보 수정에 쓰임 , false =:> 회원가입 때 쓰임
const BusinessInfo = ({
  isBusinessInfo,
  whatUser,
  setDialog,
  setAuthState,
  setEnableSuccessDialog,
}) => {
  const [enableDialog, setEnableDialog] = useState(false); //  다이어로그
  const [falseDialog, setFalseDialog] = useState(false); //  에러 다이어로그 - 정보가 비어있음
  const [falsePassDialog, setFalsePassDialog] = useState(false); //  에러 다이어로그 - 비번
  console.log("회원정보 수정?" + isBusinessInfo);
  console.log("businessInfo 회원가입 누구?" + whatUser);

  const nav = useNavigate();
  // 다음 버튼 활성화
  const [enableNextBtn, setEnableNextBtn] = useState(true);

  const [businessInfoState, setBusinessInfoState] = useState({
    businessNumber: "",
    company: "",
    owner: "",
    id: "",
    phoneNumber: "",
    email: "",
    password: "",
    authPassword: "",
  });

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

  useEffect(() => {
    if (whatUser === "author" && isBusinessInfo) {
      let id = localStorage.getItem("userId");
      console.log(" BusinessInfo작가 id: " + id);

      // 작가 정보 가져오기
      onGetAuthorInfoHandler({ id }, (response) => {
        console.log(" 작가 개인정보 응답값 받음");
        setBusinessInfoState((prevState) => ({
          businessNumber: response.businessNumber,
          company: response.company,
          owner: response.ceo,
          id: response.id,
          phoneNumber: response.phone,
          email: response.email,
          password: " ",
          authPassword: " ",
        }));
      });
    } else if (whatUser === "space" && isBusinessInfo) {
      console.log("공간대여자 정보 조회");
      let id = localStorage.getItem("userId");

      // 공간대여자 정보 가져오기
      onGetSpaceInfoHandler({ id }, (response) => {
        console.log(" 공간대여자 개인정보 응답값 받음");
        setBusinessInfoState((prevState) => ({
          businessNumber: response.data.data.businessNumber,
          company: response.data.data.company,
          owner: response.data.data.ceo,
          id: response.data.data.id,
          phoneNumber: response.data.data.phone,
          email: response.data.data.email,
          password: " ",
          authPassword: " ",
        }));
      });
    } else if (!isBusinessInfo) {
      console.log("회원가입");
    } else {
      alert("BusinessInfo 잘못된 접근입니다. ");
    }
  }, []); //  초기에만 실행

  // 입력이 달라지면 상태 감지
  const handleChangeState = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setBusinessInfoState({
      ...businessInfoState,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    // if (validateEmail(businessInfoState.email)) {
    //   console.log("이메일일치");
    //   setEnableNextBtn(true); // 다음 버튼 활성화
    // } else {
    //   console.log("이메일불일치");
    //   setEnableNextBtn(false); // 다음 버튼 비활성화
    // }
  }, [businessInfoState]); // businessInfoState 객체의 모든 변경에 반응

  const submitsignup = () => {
    if (businessInfoState.password === businessInfoState.authPassword) {
      console.log("회원가입 저장 눌림 ");
      if (Object.values(businessInfoState).every((value) => value !== "")) {
        // 회원가입 통신

        if (whatUser === "author") {
          onsignupAuthorHandler(
            {
              businessNum: parseInt(businessInfoState.businessNumber),
              id: businessInfoState.id,
              pwd: businessInfoState.password,
              company: businessInfoState.company,
              ceo: businessInfoState.owner,
              email: businessInfoState.email,
              phone: businessInfoState.phoneNumber,
            },
            (responseStatus) => {
              if (responseStatus) {
                // 성공시 콜백
                console.log("Signup successful, navigating back");
                setEnableSuccessDialog(true);
              } else {
                console.log("Signup 실패");
                setDialog(true);
              }
            }
          );
        } else if (whatUser === "space") {
          onSignupSpaceHandler(
            {
              businessNum: parseInt(businessInfoState.businessNumber),
              id: businessInfoState.id,
              pwd: businessInfoState.password,
              company: businessInfoState.company,
              ceo: businessInfoState.owner,
              email: businessInfoState.email,
              phone: businessInfoState.phoneNumber,
            },
            (responseStatus) => {
              if (responseStatus) {
                // 성공시 콜백
                console.log("Signup successful, navigating back");
                setEnableSuccessDialog(true);
              } else {
                setDialog(true);
              }
            }
          );
        } else {
          alert("비즈니스 회원가입 유저틀림 잘못된 접근");
        }
      } else {
        console.log("회원가입 걸러짐");
        // 회원정보 다 입력안됨
        setFalseDialog(true);
      }
    } else {
      console.log("비번틀림 ");
      setFalsePassDialog(true);
    }
  };

  // 비즈니스 정보 저장 통신
  const saveInfo = () => {
    if (businessInfoState.id !== "" && businessInfoState.password !== "") {
      let id = localStorage.getItem("userId");
      if (whatUser === "author") {
        onUpdateUserInfoHandler(
          {
            authorId: id,
            businessNumber: parseInt(businessInfoState.businessNumber),
            id: businessInfoState.id,
            pwd: businessInfoState.password,
            company: businessInfoState.company,
            ceo: businessInfoState.owner,
            email: businessInfoState.email,
            phone: businessInfoState.phoneNumber,
          },
          (responseStatus) => {
            // 성공시 콜백
            if (responseStatus) {
              console.log("작가 정보 수정successful");
              setEnableDialog(true);
              setFalseDialog(false);
            } else {
              setFalseDialog(true);
            }
          }
        );
      } else if (whatUser === "space") {
        onUpdateSpaceInfoHandler(
          {
            spaceId: id,
            businessNumber: parseInt(businessInfoState.businessNumber),
            id: businessInfoState.id,
            pwd: businessInfoState.password,
            company: businessInfoState.company,
            ceo: businessInfoState.owner,
            email: businessInfoState.email,
            phone: businessInfoState.phoneNumber,
          },
          (responseStatus) => {
            if (responseStatus) {
              // 성공시 콜백
              console.log("공간대여자 정보 수정 successful");
              setEnableDialog(true);
              setFalseDialog(false);
            } else {
              setFalseDialog(true);
            }
          }
        );
      } else {
        alert("비즈니스 회원가입 유저틀림 잘못된 접근");
      }
    }
  };

  return (
    <div>
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
          {isBusinessInfo && <h2 style={{ marginBottom: 0 }}>myInfo</h2>}

          {/* 회원정보수정 */}
          {isBusinessInfo && (
            <>
              <ThemeProvider theme={theme}>
                <div>
                  <TextField
                    name="businessNumber"
                    id="standard-number-busi"
                    label="사업자번호"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    onChange={handleChangeState}
                    value={businessInfoState.businessNumber} // 상태와 입력 필드 연결
                  />
                </div>
                <div>
                  <TextField
                    name="company"
                    id="standard-search-company"
                    label="회사명"
                    type="search"
                    variant="standard"
                    onChange={handleChangeState}
                    value={businessInfoState.company}
                  />
                </div>
                <div>
                  <TextField
                    name="owner"
                    id="standard-search-name"
                    label="대표자명"
                    type="search"
                    variant="standard"
                    onChange={handleChangeState}
                    value={businessInfoState.owner}
                  />
                </div>
                <div>
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
                    value={businessInfoState.phoneNumber}
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
                    value={businessInfoState.email}
                  />
                </div>
              </ThemeProvider>
              <div />
            </>
          )}
          {/* 회원가입 */}
          {!isBusinessInfo && (
            <>
              <ThemeProvider theme={theme}>
                <div>
                  <TextField
                    name="businessNumber"
                    id="standard-number-busi"
                    label="사업자번호"
                    type="number"
                    variant="standard"
                    onChange={handleChangeState}
                    value={businessInfoState.businessNumber} // 상태와 입력 필드 연결
                  />
                </div>
                <div>
                  <TextField
                    name="company"
                    id="standard-search-company"
                    label="회사명"
                    type="search"
                    variant="standard"
                    onChange={handleChangeState}
                    value={businessInfoState.company}
                  />
                </div>
                <div>
                  <TextField
                    name="owner"
                    id="standard-search-name"
                    label="대표자명"
                    type="search"
                    variant="standard"
                    onChange={handleChangeState}
                    value={businessInfoState.owner}
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
                    value={businessInfoState.id}
                  />
                </div>
                <div>
                  <TextField
                    name="phoneNumber"
                    id="standard-number"
                    label="전화번호"
                    type="number"
                    variant="standard"
                    onChange={handleChangeState}
                    value={businessInfoState.phoneNumber}
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
                    value={businessInfoState.email}
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
                  />
                </div>
                <div />
              </ThemeProvider>
            </>
          )}

          {/* {!isBusinessInfo && <h2>회원 가입</h2>} */}

          {!isBusinessInfo && (
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
          )}
          {isBusinessInfo && (
            <button
              type="button"
              class="btn btn-dark"
              onClick={saveInfo}
              disabled={!enableNextBtn}
              style={{
                border: "1px solid #000",
                borderRadius: "0",
                width: "97%",
                height: "40px",
                marginLeft: 7,
                marginBottom: 30,
                marginTop: 40,
              }}
            >
              저장
            </button>
          )}
          {enableDialog && (
            <MuiDialog
              title={"알림"}
              content={"수정되었습니다!"}
              result={true}
              page={"forBusinessInfo"}
              parentClick={setEnableDialog}
              parentAnotherClick={setAuthState}
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
        </Stack>
      </Box>
    </div>
  );
};
export default BusinessInfo;
