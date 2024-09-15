import axios from "axios";
import { jsx } from "react/jsx-runtime";
// 변수명 임시 지정
const DOMAIN = "https://www.wooriarte.store/api"; // TODO: 도메인 주소 확인 필요!!!!

//?----------------------------- 유저 url
const LoginSpace_URL = () => `${DOMAIN}/users/login`; //! 로그인 수정완
const LoginJwtSpace_URL = () => `${DOMAIN}/users/jwtlogin`; //! 로그인 수정완
const SignupUser_URL = () => `${DOMAIN}/users`; //! 회원가입 수정완
const FindUserId_URL = () => `${DOMAIN}/users/find-id`; //! 아이디 찾기 수정완
const FindPassId_URL = () => `${DOMAIN}/user/find-pw`; // 비번 찾기
const DeleteUser_URL = ({ id }) => `${DOMAIN}/users/${id}`; //! 유저 탈퇴 수정완
const confirmUserPw_URL = ({ id }) => `${DOMAIN}/users/${id}/verify-pwd`; // 비번확인
const getUserInfo_URL = ({ id }) => `${DOMAIN}/users/${id}/info`; // 유저 정보 가져오기
const updateUserInfo_URL = ({ id }) => `${DOMAIN}/users/${id}/info`; // 유저 정보 수정
// todo
const ExhibitUser_URL = ({ id, value }) =>
  `${DOMAIN}/tickets/users/${id}/bookings/${value}`;
const FindPassEmail_URL = () => `${DOMAIN}/email/users/email-send`; // 비번 찾기 이메일 전송
const FindPassAuthEmail_URL = () => `${DOMAIN}/email/users/email-auth-check`; // 비번 찾기 이메일 전송
const ResetUserPass_URL = () => `${DOMAIN}/users/set-pw`; // 비번 찾기 이메일 전송

//!----------------------------- 유저 로그인
export const LogInRequest = async ({ id, pw }) => {
  console.log("유저 LoginRequest실행");
  console.log("리퀘안" + id + pw);
  const result = await axios
    .post(LoginSpace_URL(), { id: id, pwd: pw })
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
//!----------------------------- 유저 jwt 로그인
export const LogInJwtRequest = async ({ id, pw }) => {
  console.log("유저 jwt LoginRequest실행");
  console.log("리퀘안" + id + pw);
  const result = await axios
    .post(LoginJwtSpace_URL(), { id: id, pwd: pw })
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

//!----------------------------- 유저 회원가입
export const SignupUser = async ({
  userName,
  id,
  phoneNum,
  email,
  pass,
  authPass,
}) => {
  console.log("유저 회원가입 SignupUser 실행");
  console.log(
    "유저 회원가입 리쿼안 :" +
      userName +
      "/" +
      id +
      "/" +
      phoneNum +
      "/" +
      email +
      "/" +
      pass +
      "/" +
      authPass
  );
  const result = await axios
    .post(SignupUser_URL(), {
      id: id,
      pwd: pass,
      name: userName,
      email: email,
      phone: phoneNum,
      isDeleted: false,
    })
    .then((response) => {
      console.log(response.status);
      return response;
    })
    .catch((error) => {
      console.error("회원가입 실패: " + error);
      if (error.response) {
        // 에러 응답이 있는 경우
        const { msg, errorCode } = error.response.data;
        console.log(`에러 메시지: ${msg}}, 에러 코드: ${errorCode}`);
        // 이곳에서 상태 코드나 에러 메시지에 따른 추가적인 에러 처리를 할 수 있습니다.
      } else {
        // 에러 응답이 없는 경우
        console.log("에러 응답이 없습니다.");
      }
    });
  return result;
};

//!----------------------------- 유저 아이디 찾기
export const findUserId = async ({ email }) => {
  console.log("유저 아이디 찾기 실행");
  console.log("유저 회원가입 리쿼안 :" + "/" + email);
  const result = await axios
    .post(FindUserId_URL(), {
      email: email,
    })
    .then((response) => {
      console.log(response.status);
      return response;
    })
    .catch((error) => {
      console.error("회원가입 실패: " + error);
      if (error.response) {
        // 에러 응답이 있는 경우
        const { data, status } = error.response;
        console.log(`에러 메시지: ${data.msg}, 에러 코드: ${status}`);
        // 이곳에서 상태 코드나 에러 메시지에 따른 추가적인 에러 처리를 할 수 있습니다.
      } else {
        // 에러 응답이 없는 경우
        console.log("에러 응답이 없습니다.");
      }
    });
  return result;
};
//!----------------------------- 유저 비번 찾기
export const findUserPw = async ({ userId, userName, email }) => {
  console.log("유저 비번 찾기 실행");
  console.log("유저 아이디찾기 리쿼안 :" + userName + "/" + email);
  const result = await axios
    .post(FindPassId_URL(), {
      id: userId,
      name: userName,
      email: email,
    })
    .then((response) => {
      console.log(response.status);
      return response;
    })
    .catch((error) => {
      console.error("회원가입 실패: " + error);
      if (error.response) {
        // 에러 응답이 있는 경우
        const { data, status } = error.response;
        console.log(`에러 메시지: ${data.msg}, 에러 코드: ${status}`);
        // 이곳에서 상태 코드나 에러 메시지에 따른 추가적인 에러 처리를 할 수 있습니다.
      } else {
        // 에러 응답이 없는 경우
        console.log("에러 응답이 없습니다.");
      }
    });
  return result;
};
//!-----------------------------유저 삭제

export const deleteUser = async ({ userId }) => {
  console.log("유저 삭제 실행");
  console.log("유저 삭제 id  :" + userId);

  const url = DeleteUser_URL({ id: userId });

  console.log("url" + url);
  const result = await axios.delete(url).catch((error) => {
    console.error("유저 삭제 실패: " + error);
    if (error.response) {
      // 에러 응답이 있는 경우
      const { data, status } = error.response;
      console.log(`에러 메시지: ${data.msg}, 에러 코드: ${status}`);
      // 이곳에서 상태 코드나 에러 메시지에 따른 추가적인 에러 처리를 할 수 있습니다.
    } else {
      // 에러 응답이 없는 경우
      console.log("에러 응답이 없습니다.");
    }
  });
  return result;
};

//!---------------------------- 유저 마이페이지 비번 확인
export const confirmUserPw = async ({ userId, password }) => {
  console.log("유저 비번확인 실행");
  console.log("유저 삭제 id  :" + userId);
  const url = confirmUserPw_URL({ id: userId });
  console.log("url" + url);

  const result = await axios
    .post(url, { pwd: password })
    .then((response) => {
      console.log(response.status);
      return response;
    })
    .catch((error) => {
      console.error("유저 마이페이지 비번조회 실패: " + error);
      if (error.response) {
        // 에러 응답이 있는 경우
        const { data, status } = error.response;
        console.log(`에러 메시지: ${data.msg}, 에러 코드: ${status}`);
        // 이곳에서 상태 코드나 에러 메시지에 따른 추가적인 에러 처리를 할 수 있습니다.
      } else {
        // 에러 응답이 없는 경우
        console.log("에러 응답이 없습니다.");
      }
    });
  return result;
};

//!---------------------------- 유저 마이페이지 정보 조회
export const getUserInfo = async ({ userId }) => {
  console.log("유저 정보 조회 실행");
  console.log("유저 정보조회 id  :" + userId);
  const url = getUserInfo_URL({ id: userId });

  const result = await axios
    .get(url)
    .then((response) => {
      console.log(response.status);
      return response;
    })
    .catch((error) => {
      console.error("유저 정보 조회 실패: " + error);
      if (error.response) {
        // 에러 응답이 있는 경우
        const { data, status } = error.response;
        console.log(`에러 메시지: ${data.msg}, 에러 코드: ${status}`);
        // 이곳에서 상태 코드나 에러 메시지에 따른 추가적인 에러 처리를 할 수 있습니다.
      } else {
        // 에러 응답이 없는 경우
        console.log("에러 응답이 없습니다.");
      }
    });
  return result;
};

//!---------------------------- 유저 마이페이지 정보 수정
export const updateUserInfo = async ({
  userId,
  id,
  pwd,
  name,
  email,
  phone,
}) => {
  console.log("유저 정보 수정 실행");
  console.log("유저 정보조회 id  :" + userId);
  const url = updateUserInfo_URL({ id: userId });

  const result = await axios
    .put(url, {
      id: id,
      pwd: pwd,
      name: name,
      email: email,
      phone: phone,
    })
    .then((response) => {
      console.log("회원 정보 수정 " + response.status);
      return response;
    })
    .catch((error) => {
      console.error("회원정보 수정 실패: " + error);
      if (error.response) {
        // 에러 응답이 있는 경우
        const { data, status } = error.response;
        console.log(`에러 메시지: ${data.msg}, 에러 코드: ${status}`);
        // 이곳에서 상태 코드나 에러 메시지에 따른 추가적인 에러 처리를 할 수 있습니다.
      } else {
        // 에러 응답이 없는 경우
        console.log("에러 응답이 없습니다.");
      }
    });
  return result;
};
//!---------------------------- 유저 전시 조회
export const getExhibitTicketUser = async ({ userId, value }) => {
  console.log("유저 전시 조회 실행");
  console.log("유저 전시 조회 id  :" + userId);
  const url = ExhibitUser_URL({ id: userId, value: value });

  const result = await axios
    .get(url)
    .then((response) => {
      console.log(response.status);
      return response;
    })
    .catch((error) => {
      console.error("유저 전시 조회 실패: " + error);
      if (error.response) {
        // 에러 응답이 있는 경우
        const { data, status } = error.response;
        console.log(`에러 메시지: ${data.msg}, 에러 코드: ${status}`);
        // 이곳에서 상태 코드나 에러 메시지에 따른 추가적인 에러 처리를 할 수 있습니다.
      } else {
        // 에러 응답이 없는 경우
        console.log("에러 응답이 없습니다.");
      }
    });
  return result;
};

//!----------------------------- 비번 찾기 이메일 전송
export const findPassByEmailRequest = async ({ id, email }) => {
  console.log("비번 찾기  이메일 전송 url" + FindPassEmail_URL());
  console.log("비번 찾기  이메일 전송 " + id + email);

  const result = await axios
    .post(FindPassEmail_URL(), {
      id,
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
//!----------------------------- 비번 찾기 이메일 확인번호 인증
export const confirmEmailAuthRequest = async ({ id, email, authNum }) => {
  console.log("인증번호 인증" + id + email + authNum);
  const result = await axios
    .post(FindPassAuthEmail_URL(), {
      id,
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
//!----------------------------- 비번 이메일 확인번호 재설정
export const resetPassRequest = async ({ id, name, email, pwd }) => {
  console.log("인증번호 인증" + id + name + email + pwd);
  const result = await axios
    .post(ResetUserPass_URL(), {
      id,
      name,
      email,
      pwd,
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
