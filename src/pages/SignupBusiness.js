import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import BusinessInfo from "../components/BusinessInfo";

// 배지
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";

// 다이어로그
import MuiDialog from "../libs/MuiDialog";
const Signupbusiness = () => {
  // whatuser
  const uselocation = useLocation();
  const { userInfo } = uselocation.state; // LoginEditor에서 옴
  const [enableDialog, setEnableDialog] = useState(false);
  const [enableSuccessDialog, setEnableSuccessDialog] = useState(false);

  const nav = useNavigate();

  const [isActive, setIsActive] = useState(true); // 사업자 버튼의 활성화 상태

  const goUserSignup = () => {
    setIsActive(false); //사업자 버튼 비활성화
    nav(`/signupuser`, { replace: true });
  };
  const goBusinessSignup = () => {
    // whatUser에 따라 회원가입 다르게 해야함

    console.log("회원가입 누구? " + userInfo);
    setIsActive(true);
  };

  return (
    <div>
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
          marginTop: 4,
          marginBottom: -2,
          width: "100%", // 박스 너비 설정
          display: "flex", // flexbox 디스플레이 설정
          justifyContent: "center", // 가로 중앙 정렬
        }}
      >
        <div>
          <Stack spacing={3} direction="row">
            <Button color="inherit" size="large" onClick={goUserSignup}>
              개인
            </Button>
            <Button
              color="inherit"
              size="large"
              onClick={goBusinessSignup}
              sx={{
                color: isActive ? "black" : "grey", // 활성화 상태에 따라 색상 변경
                fontWeight: isActive ? "bold" : "normal", // 활성화 상태에 따라 굵기 변경
              }}
            >
              사업자
            </Button>
          </Stack>
        </div>
      </Box>
      <Box
        sx={{
          width: "100%", // 박스 너비 설정
          display: "flex", // flexbox 디스플레이 설정
          justifyContent: "center", // 가로 중앙 정렬
        }}
      >
        {/* 회원가입양식 */}
        <BusinessInfo
          isBusinessInfo={false}
          whatUser={userInfo}
          setDialog={setEnableDialog}
          setEnableSuccessDialog={setEnableSuccessDialog}
        />

        {enableDialog && (
          <MuiDialog
            title={"알림"}
            content={"이미 가입 된 회원입니다!"}
            result={true}
            page={userInfo === "author" ? "authorLogin" : "spaceLogin"}
          />
        )}
        {enableSuccessDialog && (
          <MuiDialog
            title={"알림"}
            content={"가입되었습니다! 로그인화면으로 이동합니다"}
            result={true}
            page={userInfo === "author" ? "authorLogin" : "spaceLogin"}
          />
        )}
      </Box>
    </div>
  );
};
export default Signupbusiness;
