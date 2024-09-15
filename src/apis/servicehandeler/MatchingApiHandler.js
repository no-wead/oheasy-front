import {
  matchingAccDenyRequest,
  findIdSendEmailRequest,
  confirmEmailAuthRequest,
  confirmEmailForEveryRequest,
  confirmEmailAuthForEveryRequest,
} from "../matching-api-manager";

//!----------------------------매칭 수락 거절
export const matchingAccDenyResponse = (response, callback) => {
  if (!response) {
    alert("네트워크 이상");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("작가/ 스페이스 매칭 수락/거절 : " + response.data);

    callback();
    return;
  } else {
    alert("작가/ 스페이스 매칭 수락/거절 실패");
    console.log(response.status);
    return;
  }
};
// 작가/ 스페이스 매칭 수락/거절
export const onMatchingAccDenyHandler = ({ matchingId, result }, callback) => {
  matchingAccDenyRequest({ matchingId, boolResult: result }).then((response) =>
    matchingAccDenyResponse(response, callback)
  );
};

//!---------------------------- 아이디 찾기 이메일 전송 api 유저
export const findIdSendEmailResponse = (response, callback) => {
  if (!response) {
    alert("네트워크 이상");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("아이디 찾기 이메일 전송 : " + response.data);

    callback();
    return;
  } else {
    alert("아이디 찾기 이메일 전송 실패");
    console.log(response.status);
    return;
  }
};

export const onFindIdSendEmailHandler = ({ email }, callback) => {
  findIdSendEmailRequest({ email }).then((response) =>
    findIdSendEmailResponse(response, callback)
  );
};
//!---------------------------- 아이디 찾기 인증번호 확인 api 유저
export const confirmEmailAuthResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("아이디 찾기 인증번호 확인 성공");
    callback(true);
    return;
  } else {
    callback(false);
    console.log("인증번호 인증 실패" + response.status);
    return;
  }
};

export const onConfirmEmailAuthHandler = ({ email, authNum }, callback) => {
  confirmEmailAuthRequest({ email, authNum }).then((response) =>
    confirmEmailAuthResponse(response, callback)
  );
};
//!---------------------------- 아이디 찾기 이메일- 작가, 공간대여자, 유저  전송 api 유저
export const confirmEmailForEveryResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("아이디 찾기 이메일 전송 : " + response.data);

    callback(true);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};

export const onConfirmEmailForEveryHandler = ({ email }, callback) => {
  confirmEmailForEveryRequest({ email }).then((response) =>
    confirmEmailForEveryResponse(response, callback)
  );
};

//!---------------------------- 아이디 인증번호- 유저, 작가, 공간대여자 인증번호 확인 api 유저
export const confirmEmailAuthForEveryResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("아이디 찾기 인증번호 확인 성공");
    callback(true);
    return;
  } else {
    callback(false);
    console.log("인증번호 인증 실패" + response.status);
    return;
  }
};

export const onConfirmEmailAuthForEveryHandler = (
  { email, authNum },
  callback
) => {
  confirmEmailAuthForEveryRequest({ email, authNum }).then((response) =>
    confirmEmailAuthForEveryResponse(response, callback)
  );
};
