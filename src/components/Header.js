import Button from "./Button";
import "../styles/Header.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { onLoginButtonHandler } from "../apis/servicehandeler/ApiHandler";
import { loginContext } from "../App";
import { lightGreen } from "@mui/material/colors";

/*
isLoginState 값이 true => 로그인 ok , mypage만 보여야함
false => 비로그인 , 로그인 버튼만 보여야함 
*/
// todo 컨텍스트 사용해서 로그인 바로 처리하기
const Header = ({ isLoginState, isLoginHandler }) => {
  const nav = useNavigate();

  // 로그인 상태 확인 => header Login logout 표시
  useEffect(() => {
    if (isLoginState) {
      console.log("header useEffect 안 로그인 2 " + isLoginState);
    }
  }, [isLoginState]); // isLogin prop이 변경될 때마다 loggedIn 상태를 업데이트합니다.

  const whatUserMypage = () => {
    const userType = localStorage.getItem("userType");
    if (userType === "user") {
      nav(`/mypageuser`);
    } else if (userType === "author") {
      nav(`/authormypage`);
    } else {
      // 공간대여자 마이페이지
      nav(`/spacemypage`);
    }
  };

  const goMainPage = () => {
    // 유저에 따라 다른 메인 페이지로 이동
    let userType = localStorage.getItem("userType");
    if (userType === "user") {
      nav(`/`);
    } else if (userType === "author" || userType === "space") {
      nav(`/mainbusiness`);
    } else {
      nav(`/`);
    }
  };

  const onClickLogout = () => {
    console.log("로그아웃 눌림");
    nav(`/`); // 예매자 홈으로 가기
    localStorage.removeItem("userId"); // 유저 id 지우기
    localStorage.removeItem("userType"); // 유저 타입 지우기
    localStorage.removeItem("accessToken"); // 유저 타입 지우기
    localStorage.removeItem("refreshToken"); // 유저 타입 지우기
    isLoginHandler(false);
  };

  // 로그인 페이지로 가기
  const onClickLogin = () => {
    console.log("로그인페이지로 가기");
    // 유저에 따라 다른 main 가기
    let userType = localStorage.getItem("userType");
    console.log(" 헤더 _ 유저타입" + userType);
    nav(`/loginuser`);
  };

  // const handleLoginLogout = () => {
  //   if (loggedIn) {
  //     console.log("로그아웃 눌림");
  //     nav(`/`);
  //     localStorage.removeItem("login-result");
  //     setLoggedIn(false); // 로그인 상태를 업데이트합니다.
  //     handleOnChange();
  //   } else {
  //     console.log("로그인 눌림");
  //     nav(`/loginuser`);
  //     setLoggedIn(true); // 로그인 상태를 업데이트합니다.
  //   }
  // };

  return (
    <div style={{ width: "70%", margin: "auto" }}>
      <header className="header">
        <div>
          <text onClick={goMainPage} className="titleContainer">
            WOORI ARTE
          </text>
        </div>
        <div className="header-right-section">
          {/* 버튼 하나로 변경하기  */}

          {!isLoginState && (
            <Button
              text={"Login"}
              isVisible={true}
              onClick={
                onClickLogin
                //   () => {
                //   if (isLogin === true) {
                //     console.log("로그아웃눌림");
                //     nav(`/`);
                //     console.log(isLogin);
                //     localStorage.removeItem("login-result");
                //     handleOnChange();
                //   } else {
                //     console.log("로그인눌림");
                //     nav(`/loginuser`);
                //     console.log(isLogin);
                //   }
                // }
              }
            />
          )}
          {isLoginState && (
            <Button text={"Logout"} isVisible={true} onClick={onClickLogout} />
          )}

          {isLoginState && (
            <>
              <Button
                text={`${
                  localStorage.getItem("userType") === "author"
                    ? "My"
                    : localStorage.getItem("userType") === "user"
                    ? "My"
                    : "My"
                }Page`}
                isVisible={true}
                onClick={whatUserMypage}
              ></Button>
            </>
          )}
        </div>
      </header>
      <div class="line"></div>
    </div>
  );
};
export default Header;
