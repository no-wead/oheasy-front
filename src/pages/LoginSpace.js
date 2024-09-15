// import Button from "@mui/material/Button";
// import LoginEditor from "../components/LoginEditor";
// import { useNavigate } from "react-router-dom";
// import LoginSpan from "../components/LoginSpan";

// import Stack from "@mui/material/Stack";
// import Box from "@mui/material/Box";

// // 배지
// import Badge from "@mui/material/Badge";
// // 공간대여자 로그인 페이지 => 비밀번호 찾기때문에 나눔

// const LoginSpace = () => {
//   const nav = useNavigate();
//   const goAuthorLogin = () => {
//     nav(`/loginauthor`, { replace: true });
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
//       <div>
//         <Box
//           sx={{
//             marginTop: 4,
//             marginBottom: 2,
//             width: "100%", // 박스 너비 설정
//             display: "flex", // flexbox 디스플레이 설정
//             justifyContent: "center", // 가로 중앙 정렬
//           }}
//         >
//           <Stack spacing={2} direction="row">
//             <Button color="inherit" size="large" onClick={goAuthorLogin}>
//               작가
//             </Button>
//               <Button
//                 color="info"
//                 size="large"
//                 onClick={() => {
//                   console.log("비즈니스 로그인으로이동");
//                   nav(`/loginbusiness`);
//                 }}
//               >
//                 임대사업자
//               </Button>
//           </Stack>
//         </Box>
//       </div>
//       {/* 로그인 폼 */}
//       <LoginEditor whatUser={"space"} />
//     </>
//   );
// };
// export default LoginSpace;

import React, { useState } from 'react';
import Button from "@mui/material/Button";
import LoginEditor from "../components/LoginEditor";
import { useNavigate } from "react-router-dom";
import LoginSpan from "../components/LoginSpan";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const LoginSpace = () => {
  const nav = useNavigate();
  const [isActive, setIsActive] = useState(true); // 임대사업자 버튼의 활성화 상태를 관리하는 state

  // 작가 로그인으로 가기
  const goAuthorLogin = () => {
    setIsActive(false); // 임대사업자 버튼 비활성화
    nav(`/loginauthor`, { replace: true });
  };

   // 임대사업자 버튼 활성화 함수
   const activateRenter = () => {
    setIsActive(true); // 임대사업자 버튼 활성화
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
      <div>
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
            <Button color="inherit" size="large" onClick={goAuthorLogin}>
              작가
            </Button>
            <Button color={!isActive ? "inherit" : "info"} size="large" onClick={activateRenter} 
            style={{
              fontWeight: isActive ? 'bold' : 'normal', // 활성화 상태에서 굵은 글씨
              color: isActive ? 'black' : 'gray', // 비활성화 상태에서 회색으로 설정
            }}>
              임대사업자
            </Button>
          </Stack>
        </Box>
      </div>
      <LoginEditor whatUser={"space"} />
    </>
  );
};
export default LoginSpace;
