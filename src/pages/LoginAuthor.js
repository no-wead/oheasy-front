// import Button from "@mui/material/Button";
// import { useNavigate, useLocation } from "react-router-dom";

// import LoginEditor from "../components/LoginEditor";
// import LoginSpan from "../components/LoginSpan";

// import Stack from "@mui/material/Stack";
// import Box from "@mui/material/Box";
// // 배지
// import Badge from "@mui/material/Badge";
// // 작가 로그인 페이지 => 비밀번호 찾기때문에 나눔
// const LoginAuthor = () => {
//   const nav = useNavigate();

//   // 임대사업자 로그인으록 가기
//   const goSpaceLogin = () => {
//     nav(`/loginspace`, { replace: true });
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           marginTop: 5,
//           marginBottom: 5,
//           width: "100%", // 박스 너비 설정
//           display: "flex", // flexbox 디스플레이 설정
//           justifyContent: "center", // 가로 중앙 정렬
//         }}
//       >
//         <LoginSpan />
//       </Box>
//       <Box
//         sx={{
//           marginTop: 4,
//           marginBottom: 2,
//           width: "100%", // 박스 너비 설정
//           display: "flex", // flexbox 디스플레이 설정
//           justifyContent: "center", // 가로 중앙 정렬
//         }}
//       >
//         <Stack spacing={2} direction="row">
//             <Button color="info" size="large">
//               작가
//             </Button>

//           <Button color="inherit" size="large" onClick={goSpaceLogin}>
//             임대사업자
//           </Button>
//         </Stack>
//       </Box>
//       <LoginEditor whatUser={"author"} />
//     </>
//   );
// };
// export default LoginAuthor;


import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import LoginEditor from "../components/LoginEditor";
import LoginSpan from "../components/LoginSpan";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import React, { useState } from "react"; // React와 useState를 가져옵니다.

const LoginAuthor = () => {
  const nav = useNavigate();
  const [isActive, setIsActive] = useState(true); // 작가 버튼의 활성화 상태를 관리하는 state

  // 임대사업자 로그인으로 가기
  const goSpaceLogin = () => {
    setIsActive(false); // 작가 버튼 비활성화
    nav(`/loginspace`, { replace: true });
  };

  // 작가 버튼 활성화 함수
  const activateAuthor = () => {
    setIsActive(true); // 작가 버튼 활성화
  };

  return (
    <>
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
          marginTop: 4,
          marginBottom: 2,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stack spacing={2} direction="row">
          <Button
            color="info"
            size="large"
            onClick={activateAuthor} // 작가 버튼을 클릭하면 활성화 상태로 전환
            style={{
              fontWeight: isActive ? 'bold' : 'normal', // 활성화 상태에서 굵은 글씨
              color: isActive ? 'black' : 'gray', // 비활성화 상태에서 회색으로 설정
            }}
          >
            작가
          </Button>

          <Button color="inherit" size="large" onClick={goSpaceLogin}>
            임대사업자
          </Button>
        </Stack>
      </Box>
      <LoginEditor whatUser={"author"} />
    </>
  );
};
export default LoginAuthor;
