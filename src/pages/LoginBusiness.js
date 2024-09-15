import { useNavigate } from "react-router-dom";
import LoginSpan from "../components/LoginSpan";
import * as React from "react";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ButtonBoot from "react-bootstrap/Button";
import Box from "@mui/material/Box";

const LoginBusiness = () => {
  const nav = useNavigate();
  const [isActive, setIsActive] = useState(true); // 사업자 버튼의 활성화 상태

  // 유저 로그인으로 가기
  const goUserLogin = () => {
    setIsActive(false); // 사업자 버튼 비활성화
    nav(`/loginuser`, { replace: true });
  };

  // 사업자 로그인으로 가기 = 작가 로그인으로 가기
  const goBusinessLogin = () => {
    setIsActive(true); // 사업자 버튼 활성화
    nav(`/loginauthor`, { replace: true });
  };

  // 임대 사업자 로그인으로 가기
  const goSpaceLogin = () => {
    nav(`/loginspace`, { replace: true });
  };

  return (
    <>
      <div>
        <Box
          sx={{
            marginTop: 5,
            marginBottom: 5,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LoginSpan />
        </Box>

        <Box
          sx={{
            marginTop: 5,
            marginBottom: 5,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack spacing={2}>
            <Stack spacing={3} direction="row" style={{ marginLeft: 0 }} justifyContent="center" >
              <Button
                color="inherit"
                size="large"
                onClick={goUserLogin}
                style={{ color: isActive ? 'gray' : 'inherit' }} // 비활성화 상태에서 회색으로 설정
              >
                개인
              </Button>
              <Button
                color="info"
                size="large"
                onClick={goBusinessLogin}
                style={{
                  fontWeight: isActive ? 'bold' : 'normal', // 활성화 상태에서 굵은 글씨
                  color: isActive ? 'black' : 'gray', // 비활성화 상태에서 회색으로 설정
                }}
              >
                사업자
              </Button>
            </Stack>

            <div>
              <Stack
                spacing={2}
                style={{ marginTop: 40, marginBottom: 80 }}
                direction={"row"}
              >
                <ButtonBoot variant="outline-dark" onClick={goBusinessLogin} style={{ border: '1px solid #000', borderRadius: '0', width: '100px', height: '40px' }}>
                  작가
                </ButtonBoot>
                <ButtonBoot variant="outline-dark" onClick={goSpaceLogin} style={{ border: '1px solid #000', borderRadius: '0', width: '100px', height: '40px' }}>
                  임대 사업자
                </ButtonBoot>
              </Stack>
            </div>
          </Stack>
        </Box>
      </div>
    </>
  );
};
export default LoginBusiness;
