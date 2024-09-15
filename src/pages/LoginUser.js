// import LoginEditor from "../components/LoginEditor";
// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { loginContext } from "../App";
// import LoginSpan from "../components/LoginSpan";

// import * as React from "react";
// import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";

// // 배지
// import Badge from "@mui/material/Badge";

// const LoginUser = () => {
//   const nav = useNavigate();

//   return (
//     <>
//       <div>
//         <Box
//           sx={{
//             marginTop: 5,
//             marginBottom: 5,
//             width: "100%", // 박스 너비 설정
//             display: "flex", // flexbox 디스플레이 설정
//             justifyContent: "center", // 가로 중앙 정렬
//           }}
//         >
//           <LoginSpan />
//         </Box>
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
//               <Button color="info" size="large">
//                 개인
//               </Button>
//             <Button
//               color="inherit"
//               size="large"
//               onClick={() => {
//                 console.log("비즈니스 로그인으로이동");
//                 nav(`/loginbusiness`);
//               }}
//             >
//               사업자
//             </Button>
//           </Stack>
//         </Box>
//       </div>
//       {/* 로그인 폼 */}
//       <LoginEditor whatUser={"user"} />
//     </>
//   );
// };
// export default LoginUser;


import React, { useState } from 'react';
import LoginEditor from "../components/LoginEditor";
import { useNavigate } from "react-router-dom";
import LoginSpan from "../components/LoginSpan";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const LoginUser = () => {
  const nav = useNavigate();
  const [isActive, setIsActive] = useState(true); // 초기 상태는 '개인'이 활성화

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
            marginTop: 4,
            marginBottom: 2,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack spacing={3} direction="row">
            <Button
              color="inherit"
              size="large"
              onClick={handlePersonalClick}
              sx={{
                color: isActive ? 'black' : 'grey', // 활성화 상태에 따라 색상 변경
                fontWeight: isActive ? 'bold' : 'normal', // 활성화 상태에 따라 굵기 변경
              }}
            >
              개인
            </Button>
            <Button
              color="inherit"
              size="large"
              onClick={handleBusinessClick}
              sx={{
                color: "gray", // 텍스트 색상을 회색으로 지정
              }}
            >
              사업자
            </Button>
          </Stack>
        </Box>
      </div>
      <LoginEditor whatUser={"user"} />
    </>
  );
};

export default LoginUser;
