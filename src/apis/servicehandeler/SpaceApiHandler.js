import {
  LoginSpaceRequest,
  SignupSpace,
  findSpaceId,
  findSpacePw,
  deleteSpace,
  confirmSpacePw,
  getSpaceInfo,
  updateSpaceInfo,
  addSpaceItem,
  getAllSpaceItem,
  getSpaceItemInfo,
  updateSpaceItemInfo,
  deleteSpaceItem,
  applyToAuthorItem,
  waitingMatchingForSpace,
  getOfferedMatchingForSpace,
  getSuccessMatchingForSpace,
  getOneSpaceItems,
  findPassForSpaceByEmailRequest,
  confirmEmailAuthForSpaceRequest,
  getSearchSpaceProject, // 필터링
  uploadSpacePhoto,
  deleteSpacePhoto,
  getSpacePhoto,
  updateSpacePhoto,
  LoginJwtSpaceRequest,
} from "../space-api-manager";

//!----------------------------스페이스 로그인
// 유저 로그인 결과값
export const LoginSpaceResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("스페이스 id : " + response.data);
    // 임시로 localhost저장
    localStorage.setItem("userId", response.data);
    localStorage.setItem("userType", "space"); // 유저 타입으로 저장

    callback(true);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};
// 유저 로그인 editor에서 로그인 누를 시
export const onLoginSpaceHandler = ({ id, pwd }, callback) => {
  const requestBody = {
    id,
    pwd,
  };
  LoginSpaceRequest({ id, pwd }).then((response) =>
    LoginSpaceResponse(response, callback)
  );
};
//!----------------------------스페이스 jwt 로그인
// 유저 로그인 결과값
export const LoginSpaceJwtResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("스페이스 id : " + response.data);
    // 임시로 localhost저장
    localStorage.setItem("userId", response.data.entityId);
    localStorage.setItem("accessToken", response.data.accessToken); // todo
    localStorage.setItem("refreshToken", response.data.refreshToken); // todo
    localStorage.setItem("userType", "space"); // 유저 타입으로 저장

    callback(true);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};
// 유저 로그인 editor에서 로그인 누를 시
export const onLoginSpaceJwtHandler = ({ id, pwd }, callback) => {
  const requestBody = {
    id,
    pwd,
  };
  LoginJwtSpaceRequest({ id, pwd }).then((response) =>
    LoginSpaceJwtResponse(response, callback)
  );
};
//!----------------------------스페이스 회원가입
// 스페이스 회원가입 응답
export const signupSpaceResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("회원가입 성공");
    callback(true);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};
// 스페이스 회원가입 외부에서 누를 시
export const onSignupSpaceHandler = (
  { businessNum, id, pwd, company, ceo, email, phone },
  callback
) => {
  SignupSpace({
    businessNum,
    id,
    pwd,
    company,
    ceo,
    email,
    phone,
  }).then((response) => signupSpaceResponse(response, callback));
};

//!----------------------------스페이스 아이디 찾기
// 스페이스 아이디 찾기 응답
//? --- response 존재
export const findfindSpaceIdResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("스페이스 아이디 찾기 성공");
    callback(response.data);
    return;
  } else {
    console.log("스페이스 아이디 찾기 실패");
    callback(false);
    return;
  }
};
// 스페이스 아이디 찾기 누를 시
export const onFindSpaceIdHandler = ({ email }, callback) => {
  findSpaceId({ email }).then((response) =>
    findfindSpaceIdResponse(response, callback)
  );
};

//!----------------------------스페이스 비번 재설정

export const findSpacePwResponse = (response, callback) => {
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
    console.log(response.status);
    return;
  }
};
// 스페이스 비번 재설정 누름
export const onFindSpacePwHandler = ({ id, new_pwd }, callback) => {
  findSpacePw({ id, new_pwd }).then((response) =>
    findSpacePwResponse(response, callback)
  );
};

//!---------------------------- 공간대여자 탈퇴하기

// 공간대여자 탈퇴 응답
export const deleteSpaceResponse = (response, callback) => {
  if (!response) {
    alert("네트워크 이상");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("스페이스 탈퇴 성공");
    callback();
    return;
  } else {
    alert("탈퇴 실패");
    console.log(response.status);
    return;
  }
};
// 공간대여자 삭제누름
export const onDeleteSpaceHandler = ({ id }, callback) => {
  console.log("스페이스 아이디" + id);
  deleteSpace({ id }).then((response) =>
    deleteSpaceResponse(response, callback)
  );
};
//!---------------------------- 공간대여자 마이페이지 비번 확인
// 공간대여자 비번 확인 응답
export const confirmSpacePwResponse = (response, callback) => {
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
// 공간대여자 비번확인 누름
export const onConfirmSpacePwHandler = ({ userId, password }, callback) => {
  confirmSpacePw({ userId, password }).then((response) =>
    confirmSpacePwResponse(response, callback)
  );
};

//!---------------------------- 공간대여자 마이페이지 정보 조회
// 유저 정보 조회 응답
// todo 정보 받아야함
export const getSpaceInfoResponse = (response, callback) => {
  if (!response) {
    alert("네트워크 이상");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("스페이스 정보 조회 성공");
    callback(response);
    return;
  } else {
    alert("스페이스 정보 조회 실패");
    console.log(response.status);
    return;
  }
};
// 유저 정보조회 이벤트
export const onGetSpaceInfoHandler = ({ id }, callback) => {
  getSpaceInfo({ id }).then((response) =>
    getSpaceInfoResponse(response, callback)
  );
};

// //!---------------------------- 스페이스 마이페이지 정보 수정
// 스페이스 정보 수정 응답
export const updateSpaceInfoResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("스페이스 정보 수정 성공");
    callback(true);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};
// 스페이스 정보 수정 이벤트
export const onUpdateSpaceInfoHandler = (
  { spaceId, businessNumber, id, pwd, company, ceo, email, phone },
  callback
) => {
  updateSpaceInfo({
    spaceId,
    businessNumber,
    id,
    pwd,
    company,
    ceo,
    email,
    phone,
  }).then((response) => updateSpaceInfoResponse(response, callback));
};
// todo 여기서부터 확인하기

//!---------------------------- 스페이스 아이템 생성
// 스페이스 조회 응답
export const addSpaceItemResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("스페이스 아이템 추가 성공");
    callback(response.data);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};
// 스페이스 아이템 이벤트
export const onAddSpaceItemHandler = (
  {
    title,
    spaceRentalId,
    intro,
    hostname,
    city,
    size,
    parking,
    fee,
    phone,
    startDate,
    endDate,
  },
  callback
) => {
  addSpaceItem({
    title,
    spaceRentalId,
    intro,
    hostname,
    city,
    size,
    parking,
    fee,
    phone,
    startDate,
    endDate,
  }).then((response) => addSpaceItemResponse(response, callback));
};
//!---------------------------- 모든 스페이스 아이템 조회
// 작가 정보 조회 응답
// todo 콜백있음
export const onGetAllSpaceItemResponse = (response, callback) => {
  if (!response) {
    alert("네트워크 이상 ");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("모든 스페이스 아이템 조회 성공");
    callback(response);
    return;
  } else {
    alert("모든 스페이스 아이템 조회 실패");
    console.log(response.status);
    return;
  }
};
// 작가 정보조회 이벤트
export const onGetAllSpaceItemHandler = (callback) => {
  getAllSpaceItem().then((response) =>
    onGetAllSpaceItemResponse(response, callback)
  );
};

//!---------------------------- 스페이스 아이템 단건 조회
// 작가 아이템 단건 조회 응답
// todo 콜백 있음
export const getSpaceItemInfoResponse = (response, callback) => {
  if (!response) {
    alert("삭제된 공간 아이템");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("스페이스 아이템 단건 조회 성공");
    callback(response);
    return;
  } else {
    alert("삭제된 공간 아이템");
    console.log(response.status);
    return;
  }
};
// 작가 정보조회 이벤트
export const onGetSpaceItemInfoHandler = ({ posterId }, callback) => {
  getSpaceItemInfo({
    posterId,
  }).then((response) => getSpaceItemInfoResponse(response, callback));
};

// //!---------------------------- 스페이스 아이템 수정
// 프로젝트 아이템 수정 응답
export const updateAuthorItemInfoResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("프로젝트 아이템 수정 성공");
    callback(true);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};
//  수정 이벤트
export const onUpdateSpaceItemInfoHandler = (
  {
    title,
    spaceId,
    intro,
    hostname,
    city,
    size,
    parking,
    fee,
    phone,
    startDate,
    endDate,
  },
  callback
) => {
  console.log("수정핸들러 안");
  updateSpaceItemInfo({
    title,
    spaceId,
    intro,
    hostname,
    city,
    size,
    parking,
    fee,
    phone,
    startDate,
    endDate,
  }).then((response) => updateAuthorItemInfoResponse(response, callback));
};
//!---------------------------- 스페이스 아이템 삭제

// 프로젝트아이템 삭제 응답
export const deleteSpaceItemResponse = (response, callback) => {
  if (!response) {
    alert("네트워크 이상");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("스페이스 아이템 삭제 성공");
    callback();
    return;
  } else {
    alert("스페이스 아이템 삭제 실패");
    console.log(response.status);
    return;
  }
};
// 프로젝트아이템 삭제누름
export const onDeleteSpaceItemHandler = ({ spaceId }, callback) => {
  console.log("스페이스 아이템 삭제 " + spaceId);
  deleteSpaceItem({ spaceId }).then((response) =>
    deleteSpaceItemResponse(response, callback)
  );
};
//!---------------------------- 공간-> 작가 신청

export const applyToAuthorItemResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    callback(true);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};

export const onApplyToAuthorItemHandler = (
  { authorItemId, spaceItemId },
  callback
) => {
  console.log(
    "공간 -> 작가 신청 : authorItemId, spaceItemId " +
      authorItemId +
      "/" +
      spaceItemId
  );
  applyToAuthorItem({ authorItemId, spaceItemId }).then((response) =>
    applyToAuthorItemResponse(response, callback)
  );
};
//!----------------------------  공간 매칭대기
// todo callback 있음
// 공간 매칭대기 응답
export const waitingMatchingForSpaceResponse = (response, callback) => {
  if (!response) {
    alert("공간대여자 매칭대기 데이터없음");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("공간 매칭대기 응답 성공");
    callback(response);
    return;
  } else {
    alert("공간 매칭대기 실패");
    console.log(response.status);
    return;
  }
};
//  공간 매칭대기
export const onWaitingMatchingSpaceHandler = ({ spaceId }, callback) => {
  console.log("공간 매칭대기 :  spaceId " + spaceId);
  waitingMatchingForSpace({ spaceId: spaceId }).then((response) =>
    waitingMatchingForSpaceResponse(response, callback)
  );
};
//!---------------------------- 스페이스 신청받은 조회
// todo callback 있음
//  스페이스 신청받은 조회 응답
export const getOfferedMatchingForSpaceResponse = (response, callback) => {
  if (!response) {
    callback(null);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log(" 스페이스 신청받은 조회 응답 성공");
    callback(response);
    return;
  } else {
    callback(null);
    console.log(response.status);
    return;
  }
};
//  작가 성사된 매칭 조회
export const onGetOfferedMatchingSpaceHandler = ({ spaceId }, callback) => {
  console.log("공간용 신청받은 :  spaceId " + spaceId);
  getOfferedMatchingForSpace({ spaceId }).then((response) =>
    getOfferedMatchingForSpaceResponse(response, callback)
  );
};
//!---------------------------- 공간 성공매칭 조회
// todo callback 있음
// 공간 매칭대기 응답
export const getSuccessMatchingForSpaceResponse = (response, callback) => {
  if (!response) {
    alert("공간대여자 성공매칭 데이터없음 ");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("공간 성공매칭 조회 응답 성공");
    callback(response);
    return;
  } else {
    alert("공간 성공매칭 조회 실패");
    console.log(response.status);
    return;
  }
};
//  공간 성사된 매칭 조회
export const onGetSuccessMatchingSpaceHandler = ({ spaceId }, callback) => {
  console.log("공간 신청받은 :  spaceId " + spaceId);
  getSuccessMatchingForSpace({ spaceId }).then((response) =>
    getSuccessMatchingForSpaceResponse(response, callback)
  );
};
//!---------------------------- 공간대여자의 아이템들 조회
//? callback 있음

export const getOneSpaceItemsResponse = (response, callback) => {
  if (!response) {
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("공간대여자의 아이템들 조회 성공");
    callback(response);
    return;
  } else {
    console.log(response.status);
    return;
  }
};
export const onGetOneSpaceProjectsHandler = ({ spaceId }, callback) => {
  console.log("공간대여자 :  spaceId  " + spaceId);
  getOneSpaceItems({ spaceId }).then((response) =>
    getOneSpaceItemsResponse(response, callback)
  );
};
//!---------------------------- 비번 찾기 이메일 전송 api
export const findPassForSpaceByEmailResponse = (response, callback) => {
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

export const onFindPassForSpaceByEmailHandler = ({ id, email }, callback) => {
  findPassForSpaceByEmailRequest({ id, email }).then((response) =>
    findPassForSpaceByEmailResponse(response, callback)
  );
};
//!---------------------------- 비번찾기 이메일  인증번호 확인
export const confirmEmailAuthForSpaceResponse = (response, callback) => {
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

export const onConfirmEmailAuthForSpaceHandler = (
  { id, email, authNum },
  callback
) => {
  confirmEmailAuthForSpaceRequest({ id, email, authNum }).then((response) =>
    confirmEmailAuthForSpaceResponse(response, callback)
  );
};
//!---------------------------- 작가 필터링 아이템 조회

export const onGetSearchSpaceProjectResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("공간 필터링 아이템 조회성공");
    callback(response);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};

export const onGetSearchSpaceProjectHandler = (
  { startDate, endDate, city },
  callback
) => {
  getSearchSpaceProject({ startDate, endDate, city }).then((response) =>
    onGetSearchSpaceProjectResponse(response, callback)
  );
};
//!---------------------------- 공간 사진 올리기

export const onUploadSpacePhotoResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("공간 사진 올리기 성공");
    callback(response);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};

export const onUploadSpacePhotoHandler = ({ id, formData }, callback) => {
  uploadSpacePhoto({ id, formData }).then((response) =>
    onUploadSpacePhotoResponse(response, callback)
  );
};
//!---------------------------- 공간 사진 삭제

export const onDeleteSpacePhotoResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("공간 사진 삭제성공");
    callback(response);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};

export const onDeleteSpacePhotoHandler = ({ id }, callback) => {
  deleteSpacePhoto({ id }).then((response) =>
    onDeleteSpacePhotoResponse(response, callback)
  );
};
//!---------------------------- 공간 사진 조회

export const onGetSpacePhotoResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("공간 사진 조회");
    callback(response);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};

export const onGetSpacePhotoHandler = ({ id }, callback) => {
  getSpacePhoto({ id }).then((response) =>
    onGetSpacePhotoResponse(response, callback)
  );
};
//!---------------------------- 공간 사진 수정

export const onUpdateSpacePhotoResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("공간 사진 수정 성공");
    callback(true);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};

export const onUpdateSpacePhotoHandler = ({ id, formData }, callback) => {
  updateSpacePhoto({ id, formData }).then((response) =>
    onUpdateSpacePhotoResponse(response, callback)
  );
};
