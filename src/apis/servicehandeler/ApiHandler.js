import {
  LogInRequest,
  SignupUser,
  findUserId,
  findUserPw,
  deleteUser,
  confirmUserPw,
  getUserInfo,
  updateUserInfo,
  getExhibitTicketUser,
  findPassByEmailRequest,
  confirmEmailAuthRequest,
  resetPassRequest,
  LogInJwtRequest,
} from "../api-manger";

//!----------------------------유저 로그인
// 유저 로그인 결과값
export const SignInResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("유저 id : " + response.data);
    // 임시로 localhost저장
    localStorage.setItem("userId", response.data);
    localStorage.setItem("userType", "user"); // 유저 타입으로 저장
    callback(true);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};
// 유저 로그인 editor에서 로그인 누를 시
export const onLoginButtonHandler = ({ id, pw }, callback) => {
  const requestBody = {
    id,
    pw,
  };
  LogInRequest({ id, pw }).then((response) =>
    SignInResponse(response, callback)
  );
};
//!----------------------------유저 jwt 로그인
// 유저 로그인 결과값
export const LogInJwtResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("유저 id : " + response.data);
    // 임시로 localhost저장
    localStorage.setItem("userId", response.data.entityId);
    localStorage.setItem("accessToken", response.data.accessToken); // todo
    localStorage.setItem("refreshToken", response.data.refreshToken); // todo
    localStorage.setItem("userType", "user"); // 유저 타입으로 저장
    callback(true);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};
// 유저 로그인 editor에서 로그인 누를 시
export const onLogInJwtRequestHandler = ({ id, pw }, callback) => {
  const requestBody = {
    id,
    pw,
  };
  LogInJwtRequest({ id, pw }).then((response) =>
    LogInJwtResponse(response, callback)
  );
};
//!----------------------------유저 회원가입
// 유저 회원가입 응답
export const signupUserResponse = (response, callback) => {
  if (!response) {
    callback(false); // catch에서 잡한경우, 응답값이 없을 경우
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("회원가입 성공");
    callback(true);
    return;
  } else {
    alert("회원가입 실패");
    console.log(response.status);
    return;
  }
};
// 유저 회원가입 외부에서 누를 시
export const onSignupUserHandler = (
  { userName, id, phoneNum, email, pass, authPass },
  callback
) => {
  SignupUser({
    userName,
    id,
    phoneNum,
    email,
    pass,
    authPass,
    isDeleted: false,
  }).then((response) => signupUserResponse(response, callback));
};

//!----------------------------유저 아이디 찾기
// 유저 아이디 찾기 응답
export const findUserIdResponse = (response, callback) => {
  if (!response) {
    callback({ result: false });
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("아이디 찾기 성공" + response.data);

    callback({ result: response.data, status: true }); // data는 여기에 찍어야함 response를 넘긴 파일에서 . data찍으면 안먹힘
    return;
  } else {
    alert("아이디 찾기실패");
    callback({ result: false });
    console.log(response.status);
    return;
  }
};
// 유저 아이디 찾기 누를 시
export const onFindUserIdHandler = ({ email }, callback) => {
  findUserId({ email }).then((response) =>
    findUserIdResponse(response, callback)
  );
};

//!----------------------------유저 비번찾기
// 유저 비번 찾기 응답
export const findUserPwResponse = (response, callback) => {
  if (!response) {
    alert("네트워크 이상");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("비번 찾기 성공");
    callback();
    return;
  } else {
    alert("비번찾기 실패");
    console.log(response.status);
    return;
  }
};
// 유저 비번 찾기 누름
export const onFindUserPwHandler = ({ userId, userName, email }, callback) => {
  findUserPw({ userId, userName, email }).then((response) =>
    findUserPwResponse(response, callback)
  );
};

//!---------------------------- 유저 탈퇴하기
//? 여기부터
// 유저 탈퇴 응답
export const deleteUserResponse = (response, callback) => {
  if (!response) {
    alert("네트워크 이상");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("유저 탈퇴 성공");
    callback();
    return;
  } else {
    alert("탈퇴 실패");
    console.log(response.status);
    return;
  }
};
// 유저 삭제누름
export const onDeleteUserHandler = ({ userId }, callback) => {
  console.log("유저아이디" + userId);
  deleteUser({ userId }).then((response) =>
    deleteUserResponse(response, callback)
  );
};
//!---------------------------- 유저 마이페이지 비번 확인
// 유저 비번 찾기 응답
export const confirmUserPwResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("비번 확인 성공");
    callback(true);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};
// 유저 비번 찾기 누름
export const onConfirmUserPwHandler = ({ userId, password }, callback) => {
  confirmUserPw({ userId, password }).then((response) =>
    confirmUserPwResponse(response, callback)
  );
};

//!---------------------------- 유저 마이페이지 정보 조회
// 유저 정보 조회 응답
// todo 정보 받아야함
export const getUserInfoResponse = (response, callback) => {
  if (!response) {
    alert("네트워크 이상");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("유저 정보 조회 성공");
    callback(response);
    return;
  } else {
    alert("유저 정보 조회 실패");
    console.log(response.status);
    return;
  }
};
// 유저 정보조회 이벤트
export const onGetUserInfoHandler = ({ userId }, callback) => {
  getUserInfo({ userId }).then((response) =>
    getUserInfoResponse(response, callback)
  );
};

//!---------------------------- 유저 마이페이지 정보 수정
// 유저 정보 조회 응답
export const updateUserInfoResponse = (response, callback) => {
  if (!response) {
    alert("네트워크 이상 ");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("유저 정보 조회 성공");
    callback();
    return;
  } else {
    alert("유저 정보 조회 실패");
    console.log(response.status);
    return;
  }
};
// 유저 정보조회 이벤트
export const onUpdateUserInfoHandler = (
  { userId, id, pwd, name, email, phone },
  callback
) => {
  updateUserInfo({ userId, id, pwd, name, email, phone }).then((response) =>
    updateUserInfoResponse(response, callback)
  );
};

//!---------------------------- 예매자 페이지 전시 리스트 모두 가져오기
export const getUserMainPosterResponse = (response, callback) => {
  if (!response) {
    //alert("네트워크 이상 ");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("유저 정보 조회 성공");
    callback();
    return;
  } else {
    alert("유저 정보 조회 실패");
    console.log(response.status);
    return;
  }
};
// 유저 정보조회 이벤트
export const ongetUserMainPosterHandler = (
  { userId, id, pwd, name, email, phone },
  callback
) => {
  updateUserInfo({ userId, id, pwd, name, email, phone }).then((response) =>
    getUserMainPosterResponse(response, callback)
  );
};
//!---------------------------- 유저 전시 조회

export const getExhibitTicketUserResponse = (response, callback) => {
  if (!response) {
    // alert("네트워크 이상");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("유저 전시 조회 성공");
    callback(response);
    return;
  } else {
    alert("유저 전시 조회실패");
    console.log(response.status);
    return;
  }
};

export const onGetExhibitTicketUserHandler = ({ userId, value }, callback) => {
  console.log("핸들러 안 " + value);
  getExhibitTicketUser({ userId, value }).then((response) =>
    getExhibitTicketUserResponse(response, callback)
  );
};
//!---------------------------- 비번 찾기 이메일 전송 api
export const findPassByEmailResponse = (response, callback) => {
  if (!response) {
    alert("네트워크 이상");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log(" 비번 찾기 이메일 전송 : " + response.data);

    callback();
    return;
  } else {
    alert(" 비번 찾기 이메일 전송 실패");
    console.log(response.status);
    return;
  }
};

export const onFindPassByEmailHandler = ({ id, email }, callback) => {
  findPassByEmailRequest({ id, email }).then((response) =>
    findPassByEmailResponse(response, callback)
  );
};
//!---------------------------- 비번찾기 이메일  인증번호 확인
export const confirmEmailAuthResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("비번 찾기 인증번호 확인 성공");
    callback(true);
    return;
  } else {
    callback(false);
    console.log("비번 인증 실패" + response.status);
    return;
  }
};

export const onConfirmEmailAuthHandler = ({ id, email, authNum }, callback) => {
  confirmEmailAuthRequest({ id, email, authNum }).then((response) =>
    confirmEmailAuthResponse(response, callback)
  );
};
//!---------------------------- 비번찾기 이메일 재설정
export const resetUserPassResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("비번 재설정 성공");
    callback(true);
    return;
  } else {
    callback(false);
    console.log("비번 인증 실패" + response.status);
    return;
  }
};

export const onResetUserPassHandler = ({ id, name, email, pwd }, callback) => {
  resetPassRequest({ id, name, email, pwd }).then((response) =>
    resetUserPassResponse(response, callback)
  );
};
