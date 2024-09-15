//? 작가, 공간대여자 둘의 매칭 신청/ 거절 api

import axios from "axios";
import { jsx } from "react/jsx-runtime";
// 변수명 임시 지정
const DOMAIN = "https://www.wooriarte.store/api"; // TODO: 도메인 주소 확인 필요!!!!

//?------------------------------ 작가/ 스페이스 매칭 수락/거절
const MatchingAccDeny_URL = ({ matchingId }) =>
  `${DOMAIN}/matchings/${matchingId}`;
//?------------------------------ ? 이메일 인증
const FindIdSendEmail_URL = () => `${DOMAIN}/email/email-send`;
const AuthSendEmail_URL = () => `${DOMAIN}/email/email-auth-check`;

//!----------------------------- 작가/ 스페이스 매칭 수락/거절
export const matchingAccDenyRequest = async ({ matchingId, boolResult }) => {
  console.log("작가/ 스페이스 매칭 수락/거절 실행");
  console.log(
    "작가/ 스페이스 매칭 수락/거절" + matchingId + "bool:" + boolResult
  );
  const url = MatchingAccDeny_URL({ matchingId });

  const result = await axios
    .post(url, { accept: boolResult })
    .then((response) => {
      console.log(response.status);
      return response; // 응답 데이터를 그대로 반환
    })
    .catch((error) => {
      console.log("실패" + error);
      if (!error.response || !error.response.data) return null; // 에러 응답이 없거나 데이터가 없는 경우 null 반환
      return error.response; // 에러 응답의 데이터 반환
      // 에러 DTO api 반환시
    });
  // console.log("result" + result.data);
  return result;
};
//!----------------------------- 아이디찾기 이메일 전송
export const findIdSendEmailRequest = async ({ email }) => {
  console.log("아이디찾기 이메일 전송 url" + FindIdSendEmail_URL);
  console.log("아이디찾기 이메일 전송 " + email);

  const result = await axios
    .post(FindIdSendEmail_URL(), {
      id: "testid",
      email,
    })
    .then((response) => {
      console.log(response.status);
      return response; // 응답 데이터를 그대로 반환
    })
    .catch((error) => {
      console.log("실패" + error);
      if (!error.response || !error.response.data) return null; // 에러 응답이 없거나 데이터가 없는 경우 null 반환
      return error.response; // 에러 응답의 데이터 반환
      // 에러 DTO api 반환시
    });
  // console.log("result" + result.data);
  return result;
};
//!----------------------------- 이메일 확인번호 인증
export const confirmEmailAuthRequest = async ({ email, authNum }) => {
  console.log("인증번호 인증" + email + authNum);
  const result = await axios

    .post(AuthSendEmail_URL(), {
      email,
      authNum,
    })
    .then((response) => {
      console.log(response.status);
      return response; // 응답 데이터를 그대로 반환
    })
    .catch((error) => {
      console.log("실패" + error);
      if (!error.response || !error.response.data) return null; // 에러 응답이 없거나 데이터가 없는 경우 null 반환
      return error.response; // 에러 응답의 데이터 반환
      // 에러 DTO api 반환시
    });
  // console.log("result" + result.data);
  return result;
};
//!----------------------------- 아이디찾기- 작가, 유저, 공간대여자 이메일 전송
export const confirmEmailForEveryRequest = async ({ email }) => {
  console.log("아이디찾기 이메일 전송 url" + FindIdSendEmail_URL);
  console.log("아이디찾기 이메일 전송 " + email);

  const result = await axios
    .post(FindIdSendEmail_URL(), {
      email,
    })
    .then((response) => {
      console.log(response.status);
      return response; // 응답 데이터를 그대로 반환
    })
    .catch((error) => {
      console.log("실패" + error);
      if (!error.response || !error.response.data) return null; // 에러 응답이 없거나 데이터가 없는 경우 null 반환
      return error.response; // 에러 응답의 데이터 반환
      // 에러 DTO api 반환시
    });
  // console.log("result" + result.data);
  return result;
};
//!----------------------------- 아이디찾기 인증번호 확인 - 작가, 유저, 공간대여자 이메일 확인번호 인증
export const confirmEmailAuthForEveryRequest = async ({ email, authNum }) => {
  console.log("인증번호 인증" + email + authNum);
  const result = await axios

    .post(AuthSendEmail_URL(), {
      email,
      authNum,
    })
    .then((response) => {
      console.log(response.status);
      return response; // 응답 데이터를 그대로 반환
    })
    .catch((error) => {
      console.log("실패" + error);
      if (!error.response || !error.response.data) return null; // 에러 응답이 없거나 데이터가 없는 경우 null 반환
      return error.response; // 에러 응답의 데이터 반환
      // 에러 DTO api 반환시
    });
  // console.log("result" + result.data);
  return result;
};
