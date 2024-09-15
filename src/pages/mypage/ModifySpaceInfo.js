import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material";
import BusinessInfo from "../../components/BusinessInfo";

import "../../styles/ModifySpaceInfo.css";

import { onConfirmSpacePwHandler } from "../../apis/servicehandeler/SpaceApiHandler";
import MuiDialog from "../../libs/MuiDialog";
const ModifySpaceInfo = () => {
  // 비밀번호 입력 후 개인정보 수정 들어간건지
  const [authState, setAuthState] = useState(false);
  const [enableDialog, setEnableDialog] = useState(false); //  다이어로그
  // api 비밀번호 확인
  const setAuthStateChange = () => {
    let userId = localStorage.getItem("userId");
    console.log("유저 비번확인" + userId);
    onConfirmSpacePwHandler(
      { userId, password: passwordState },
      (responseStatus) => {
        // 비밀번호 확인 조건식 넣기
        if (responseStatus) {
          setAuthState(true);
        } else {
          setEnableDialog(true);
          setAuthState(false);
        }
      }
    );
  };
  // 비밀번호 입력
  const [passwordState, setPasswordState] = useState("");

  const handlePasswordChangeState = (e) => {
    setPasswordState(e.target.value);
  };

  const [infostate, setInfoState] = useState({
    name: "",
    id: "",
    phoneNumber: "",
    email: "",
    password: "",
    authPassword: "",
  });

  // 비밀번호입력란 설정!!!!! *******************************************
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

  return (
    <div className="spaceInfoContainer">
      {authState === true && (
        <BusinessInfo
          isBusinessInfo={true}
          whatUser={"space"}
          setAuthState={setAuthState}
        />
      )}
      {authState === false && (
        <div>
          <Stack
            spacing={2}
            direction="row"
            style={{
              marginTop: 20,
              marginBottom: 75,
              alignItems: "center", // 요소들의 높이를 각 요소에 맞춤
            }}
          >
            <ThemeProvider theme={theme}>
              <TextField
                name="pw"
                id="standard-password-input"
                label="비밀번호"
                type="password"
                autoComplete="current-password"
                variant="standard"
                onChange={handlePasswordChangeState}
              />
            </ThemeProvider>

            <button
              type="button"
              class="btn btn-dark"
              style={{
                border: "1px solid #000",
                borderRadius: "0",
                width: "100px",
                height: "40px",
              }}
              onClick={setAuthStateChange}
            >
              확인
            </button>
          </Stack>
        </div>
      )}
      {enableDialog && (
        <MuiDialog
          title={"알림"}
          content={"비밀번호가 틀렸습니다. 다시 입력해주세요"}
          result={true}
          page={"login"}
          parentClick={setEnableDialog}
        />
      )}
    </div>
  );
};
export default ModifySpaceInfo;
