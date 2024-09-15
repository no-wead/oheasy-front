import {
  LoginAuthorRequest,
  SignupAuthor,
  findAuthorId,
  findAuthorPw,
  deleteAuthor,
  getAuthorInfo,
  updateAuthorInfo,
  addAuthorProject,
  getAllAuthorProject,
  getAuthorItemInfo,
  updateAuthorItemInfo,
  deleteAuthorItem,
  applyToSpaceItem,
  waitingMatchingResult,
  getOfferedMatching,
  getSuccessMatching,
  getOneAuthorProjects,
  deleteSingleExhibit,
  findPassForAuthorByEmailRequest,
  confirmEmailAuthForAuthorRequest,
  confirmAuthorPw, // 마이페이지 비번확인
  getSearchAuthorProject,
  uploadAuthorPhoto,
  deleteAuthorPhoto,
  getAuthorPhoto,
  updateAuthorPhoto,
  LoginJwtAuthorRequest,
} from "../author-api-manager";

//!----------------------------작가 로그인
// 유저 로그인 결과값
export const LoginAuthorResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("작가 id : " + response.data);
    // 임시로 localhost저장
    localStorage.setItem("userId", response.data);
    localStorage.setItem("userType", "author"); // 유저 타입으로 저장

    callback(true);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};
// 유저 로그인 editor에서 로그인 누를 시
export const onLoginAuthorHandler = ({ id, pwd }, callback) => {
  const requestBody = {
    id,
    pwd,
  };
  LoginAuthorRequest({ id, pwd }).then((response) =>
    LoginAuthorResponse(response, callback)
  );
};
//!----------------------------작가 jwt 로그인

export const LoginJwtAuthorResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("작가 id : " + response.data);
    // 임시로 localhost저장
    localStorage.setItem("userId", response.data.entityId);
    localStorage.setItem("accessToken", response.data.accessToken); // todo
    localStorage.setItem("refreshToken", response.data.refreshToken); // todo
    localStorage.setItem("userType", "author"); // 유저 타입으로 저장

    callback(true);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};
// 유저 로그인 editor에서 로그인 누를 시
export const onLoginJwtAuthorHandler = ({ id, pwd }, callback) => {
  const requestBody = {
    id,
    pwd,
  };
  LoginJwtAuthorRequest({ id, pwd }).then((response) =>
    LoginJwtAuthorResponse(response, callback)
  );
};
//!----------------------------작가 회원가입
// 작가 회원가입 응답
export const signupAuthorResponse = (response, callback) => {
  if (!response) {
    console.log("작가 회원가입 실패");
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("작가 회원가입 성공");
    callback(true);
    return;
  } else {
    console.log("작가 회원가입 실패");
    callback(false);
    console.log(response.status);
    return;
  }
};
// 스페이스 회원가입 외부에서 누를 시
export const onsignupAuthorHandler = (
  { businessNum, id, pwd, company, ceo, email, phone },
  callback
) => {
  SignupAuthor({
    businessNum,
    id,
    pwd,
    company,
    ceo,
    email,
    phone,
  }).then((response) => signupAuthorResponse(response, callback));
};

//!----------------------------작가 아이디 찾기
// 스페이스 아이디 찾기 응답
export const findAuthorIdResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("작가 아이디 찾기 성공");
    callback(response.data);
    return;
  } else {
    alert("회원가입 실패");
    callback(false);
    return;
  }
};
// 작가 아이디 찾기 누를 시
export const onFindAuthorIdHandler = ({ email }, callback) => {
  findAuthorId({ email }).then((response) =>
    findAuthorIdResponse(response, callback)
  );
};

//!----------------------------작가 비번 재설정

export const findAuthorPwResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("작가 비번 재설정 성공");
    callback(true);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};
// 작가 비번재설정
export const onFindAuthorPwHandler = ({ id, new_pwd }, callback) => {
  findAuthorPw({ id, new_pwd }).then((response) =>
    findAuthorPwResponse(response, callback)
  );
};

//!---------------------------- 작가 탈퇴하기

// 공간대여자 탈퇴 응답
export const deleteAuthorResponse = (response, callback) => {
  if (!response) {
    alert("네트워크 이상");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("작가 탈퇴 성공");
    callback();
    return;
  } else {
    alert("탈퇴 실패");
    console.log(response.status);
    return;
  }
};
// 작가 삭제누름
export const onDeleteAuthorHandler = ({ id }, callback) => {
  console.log("작가 아이디" + id);
  deleteAuthor({ id }).then((response) =>
    deleteAuthorResponse(response, callback)
  );
};
//!---------------------------- 작가 마이페이지 비번 확인
//  비번 확인 응답
export const confirmAuthorPwResponse = (response, callback) => {
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
//  비번확인 누름
export const onConfirmAuthorPwHandler = ({ userId, password }, callback) => {
  confirmAuthorPw({ userId, password }).then((response) =>
    confirmAuthorPwResponse(response, callback)
  );
};

//!---------------------------- 작가 마이페이지 정보 조회
// 작가 정보 조회 응답
// todo response callback 받아야함
export const getAuthorInfoResponse = (response, callback) => {
  if (!response) {
    alert("네트워크 이상");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("작가 정보 조회 성공");
    callback(response.data);
    return;
  } else {
    alert("작가 정보 조회 실패");
    console.log(response.status);
    return;
  }
};
// 유저 정보조회 이벤트
export const onGetAuthorInfoHandler = ({ id }, callback) => {
  getAuthorInfo({ id }).then((response) =>
    getAuthorInfoResponse(response, callback)
  );
};

// //!---------------------------- 작가 마이페이지 정보 수정
// 작가 정보 조회 응답
export const updateAuthorInfoResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("작가 정보 수정 성공");
    callback(true);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};
// 작가 정보 수정 이벤트
export const onUpdateUserInfoHandler = (
  { authorId, businessNumber, company, ceo, email, phone },
  callback
) => {
  updateAuthorInfo({
    authorId,
    businessNumber,

    company,
    ceo,
    email,
    phone,
  }).then((response) => updateAuthorInfoResponse(response, callback));
};

//!---------------------------- 작가 아이템 생성
// 작가 정보 조회 응답
// todo 지역, 날짜 추가 해야함
export const addAuthorProjectResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("작가 아이템 추가 성공");
    callback(response.data);
    return;
  } else {
    alert("작가 아이템 조회 실패");
    callback(false);
    return;
  }
};
// 작가 정보조회 이벤트
export const onAddAuthorProjectHandler = (
  { authorId, artistName, intro, phone, startDate, endDate, city, title },
  callback
) => {
  addAuthorProject({
    authorId,
    artistName,
    intro,
    phone,
    startDate,
    endDate,
    city,
    title,
  }).then((response) => addAuthorProjectResponse(response, callback));
};
//!---------------------------- 모든 작가 아이템 조회
// 작가 정보 조회 응답
export const onAllAuthorProjectResponse = (response, callback) => {
  if (!response) {
    alert("네트워크 이상 ");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("모든 작가 아이템 조회 성공");
    callback(response);
    return;
  } else {
    alert("모든 작가 아이템 조회 실패");
    console.log(response.status);
    return;
  }
};
// 작가 정보조회 이벤트
export const onAllAuthorProjectHandler = (callback) => {
  getAllAuthorProject().then((response) =>
    onAllAuthorProjectResponse(response, callback)
  );
};
//!---------------------------- 작가 필터링 아이템 조회

export const onGetSearchAuthorProjectResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("작가 필터링 아이템 조회성공");
    callback(response);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};

export const onGetSearchAuthorProjectHandler = (
  { startDate, endDate, city },
  callback
) => {
  getSearchAuthorProject({ startDate, endDate, city }).then((response) =>
    onGetSearchAuthorProjectResponse(response, callback)
  );
};

//!---------------------------- 작가 아이템 단건 조회
// 작가 아이템 단건 조회 응답
// todo 콜백 있음
export const getAuthorItemInfoResponse = (response, callback) => {
  if (!response) {
    alert("삭제된 작가 아이템 ");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("작가 아이템 단건 조회 성공");
    callback(response);
    return;
  } else {
    alert("삭제된 작가 아이템");
    console.log(response.status);
    return;
  }
};
// 작가 정보조회 이벤트
export const onGetAuthorItemInfoHandler = ({ posterId }, callback) => {
  getAuthorItemInfo({
    posterId,
  }).then((response) => getAuthorItemInfoResponse(response, callback));
};

// //!---------------------------- 작가 아이템 수정
// 작가 아이템 수정 응답
export const updateAuthorItemInfoResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("작가 아이템 수정 성공");
    callback(true);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};
// 작가 아이템 수정 이벤트
export const onUpdateAuthorItemInfoHandler = (
  { posterId, artistName, intro, phone, startDate, endDate, city, title },
  callback
) => {
  updateAuthorItemInfo({
    title,
    posterId,
    artistName,
    intro,
    phone,
    startDate,
    endDate,
    city,
  }).then((response) => updateAuthorItemInfoResponse(response, callback));
};
//!---------------------------- 작가아이템 삭제

// 작가아이템 삭제 응답
export const deleteAuthorItemResponse = (response, callback) => {
  if (!response) {
    alert("네트워크 이상");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("작가아이템 삭제 성공");
    callback();
    return;
  } else {
    alert("작가아이템 삭제 실패");
    console.log(response.status);
    return;
  }
};
// 작가아이템 삭제누름
export const onDeleteAuthorItemHandler = ({ posterId }, callback) => {
  console.log("작가 아이템 삭제 " + posterId);
  deleteAuthorItem({ posterId }).then((response) =>
    deleteAuthorItemResponse(response, callback)
  );
};
//!---------------------------- 작가 -> 공간 신청

export const applyToSpaceItemResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("작가 -> 공간 신청 성공");
    callback(true);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};

export const onApplyToSpaceItemHandler = (
  { authorItemId, spaceItemId },
  callback
) => {
  console.log(
    "작가 -> 공간 신청 : authorItemId, spaceItemId " +
      authorItemId +
      "/" +
      spaceItemId
  );
  applyToSpaceItem({ authorItemId, spaceItemId }).then((response) =>
    applyToSpaceItemResponse(response, callback)
  );
};
//!----------------------------  작가 매칭대기
// todo callback 있음
// 작가 매칭대기 응답
export const waitingMatchingResultResponse = (response, callback) => {
  if (!response) {
    alert("작가 매칭대기데이터없음");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("작가 매칭대기 응답 성공");
    callback(response.data);
    return;
  } else {
    alert("작가 매칭대기 실패");
    console.log(response.status);
    return;
  }
};
//  작가 매칭대기 삭제누름
export const onWaitingMatchingAuthorHandler = ({ authorId }, callback) => {
  console.log("작가 매칭대기 :  authorId " + authorId);
  waitingMatchingResult({ authorId }).then((response) =>
    waitingMatchingResultResponse(response, callback)
  );
};
//!---------------------------- 작가 신청받은 조회
// todo callback 있음
// 작가 매칭대기 응답
export const GetOfferedMatchingResponse = (response, callback) => {
  if (!response) {
    alert("작가 신청받은데이터없음 ");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("작가 신청받은 조회 응답 성공");
    callback(response.data);
    return;
  } else {
    alert("작가 신청받은 조회 실패");
    console.log(response.status);
    return;
  }
};
//  작가 성사된 매칭 조회
export const onGetOfferedMatchingAuthorHandler = ({ authorId }, callback) => {
  console.log("작가 신청받은 :  authorId " + authorId);
  getOfferedMatching({ authorId }).then((response) =>
    GetOfferedMatchingResponse(response, callback)
  );
};
//!---------------------------- 작가 성공매칭 조회
// todo callback 있음
// 작가 매칭대기 응답
export const getSuccessMatchingResponse = (response, callback) => {
  if (!response) {
    alert("작가 성공매칭값없음");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("작가 성공매칭 조회 응답 성공");
    callback(response.data);
    return;
  } else {
    alert("작가 성공매칭 조회 실패");
    console.log(response.status);
    return;
  }
};
//  작가 성사된 매칭 조회
export const onGetSuccessMatchingAuthorHandler = ({ authorId }, callback) => {
  console.log("작가 신청받은 :  authorId " + authorId);
  getSuccessMatching({ authorId }).then((response) =>
    getSuccessMatchingResponse(response, callback)
  );
};
//!---------------------------- 작가의 아이템들 조회
//? callback 있음

export const getOneAuthorProjectsResponse = (response, callback) => {
  if (!response) {
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("작가의 아이템들 조회 성공");
    callback(response);
    return;
  } else {
    console.log(response.status);
    return;
  }
};

export const onGetOneAuthorProjectsHandler = ({ authorId }, callback) => {
  console.log("작가 신청받은 :  authorId " + authorId);
  getOneAuthorProjects({ authorId }).then((response) =>
    getOneAuthorProjectsResponse(response, callback)
  );
};
//!-----------------------------작가 전시 삭제

export const deleteSingleProjectItemResponse = (response, callback) => {
  if (!response) {
    alert("네트워크 이상");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("작가 아이템 삭제 성공");
    callback();
    return;
  } else {
    alert("작가아이템 삭제 실패");
    console.log(response.status);
    return;
  }
};
export const onDeleteSingleProjectItemHandler = (
  { projectItemId },
  callback
) => {
  console.log("작가 아이템 삭제id" + projectItemId);
  deleteSingleExhibit({ projectItemId }).then((response) =>
    deleteSingleProjectItemResponse(response, callback)
  );
};
//!---------------------------- 비번 찾기 이메일 전송 api
export const findPassForAuthorByEmailResponse = (response, callback) => {
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

export const onFindPassForAuthorByEmailHandler = ({ id, email }, callback) => {
  findPassForAuthorByEmailRequest({ id, email }).then((response) =>
    findPassForAuthorByEmailResponse(response, callback)
  );
};
//!---------------------------- 비번찾기 이메일  인증번호 확인
export const confirmEmailAuthForAuthorResponse = (response, callback) => {
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

export const onConfirmEmailAuthForAuthorHandler = (
  { id, email, authNum },
  callback
) => {
  confirmEmailAuthForAuthorRequest({ id, email, authNum }).then((response) =>
    confirmEmailAuthForAuthorResponse(response, callback)
  );
};
//!---------------------------- 작가 사진 올리기

export const onUploadAuthorPhotoResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("작가 사진 올리기 성공");
    callback(response);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};

export const onUploadAuthorPhotoHandler = ({ id, formData }, callback) => {
  uploadAuthorPhoto({ id, formData }).then((response) =>
    onUploadAuthorPhotoResponse(response, callback)
  );
};
//!---------------------------- 작가 사진 삭제

export const onDeleteAuthorPhotoResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("작가 사진 삭제성공");
    callback(response);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};

export const onDeleteAuthorPhotoHandler = ({ id }, callback) => {
  deleteAuthorPhoto({ id }).then((response) =>
    onDeleteAuthorPhotoResponse(response, callback)
  );
};
//!---------------------------- 작가 사진 조회

export const onGetAuthorPhotoResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("작가 사진 조회");
    callback(response);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};

export const onGetAuthorPhotoHandler = ({ id }, callback) => {
  getAuthorPhoto({ id }).then((response) =>
    onGetAuthorPhotoResponse(response, callback)
  );
};
//!---------------------------- 작가 사진 수정

export const onUpdateAuthorPhotoResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("작가 사진 수정 성공");
    callback(true);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};

export const onUpdateAuthorPhotoHandler = ({ id, formData }, callback) => {
  updateAuthorPhoto({ id, formData }).then((response) =>
    onUpdateAuthorPhotoResponse(response, callback)
  );
};
