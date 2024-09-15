import {
  getAllMatchingsForAdmin,
  addExhibit, // 전시 생성
  getAllExhibits,
  getExhibitInfo,
  deleteSingleExhibit,
  updateExhibit,
  updateMatchingForAdmin,
  getAllItemAccDeny,
  acceptForAuthor,
  acceptForSpace,
  denyForAuthor,
  denyForSpace,
  adminLogIn,
} from "../admin-api-manager";
//!----------------------------어드민 로그인
// 로그인 결과값
export const AdminSignInResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("어드민 로그인 : " + response.data);
    // 임시로 localhost저장
    localStorage.setItem("accessToken", response.data.accessToken); // todo
    localStorage.setItem("refreshToken", response.data.refreshToken);
    localStorage.setItem("userType", "admin"); // 유저 타입으로 저장
    callback(true);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};
// 유저 로그인 editor에서 로그인 누를 시
export const onAdminSignInHandler = ({ id, pw }, callback) => {
  const requestBody = {
    id,
    pw,
  };
  adminLogIn({ id, pw }).then((response) =>
    AdminSignInResponse(response, callback)
  );
};

//!-------------------------------관리자 모든 매칭 조회

// 콜백있음
export const onGetAllMatchingsForAdminResponse = (response, callback) => {
  if (!response) {
    alert("네트워크 이상 ");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("관리자 모든 매칭 조회 성공");
    callback(response);
    return;
  } else {
    alert("관리자 모든 매칭 조회 실패");
    console.log(response.status);
    return;
  }
};
// 작가 정보조회 이벤트
export const onGetAllMatchingsForAdminHandler = (callback) => {
  getAllMatchingsForAdmin().then((response) =>
    onGetAllMatchingsForAdminResponse(response, callback)
  );
};

//!---------------------------- 전시생성
// 전시 생성 조회 응답
export const onAddExhibitResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("전시생성 성공");
    callback(true);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};
// 전시 생성 이벤트
export const onAddExhibitHandler = (
  {
    matchingId,
    name,
    intro,
    startDate,
    endDate,
    artistName,
    hostName,
    price,
    city,
  },
  callback
) => {
  addExhibit({
    matchingId,
    name,
    intro,
    startDate,
    endDate,
    artistName,
    hostName,
    price,
    city,
  }).then((response) => onAddExhibitResponse(response, callback));
};
//!-------------------------------모든 전시 조회 : 어드민/ 예매자 메인 모든

// 콜백있음
export const onGetAllExhibitsResponse = (response, callback) => {
  if (!response) {
    //alert("네트워크 이상 ");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("모든 전시 조회 성공");
    callback(response);
    return;
  } else {
    alert("모든 전시 조회 실패");
    console.log(response.status);
    return;
  }
};
// 작가 정보조회 이벤트
export const ongetAllExhibitsHandler = (callback) => {
  getAllExhibits().then((response) =>
    onGetAllExhibitsResponse(response, callback)
  );
};
//!---------------------------- 전시 단건 조회
//* response 존재
export const getExhibitInfoResponse = (response, callback) => {
  if (!response) {
    alert("전시 단건 조회 네트워크 이상");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("전시 단건 조회 성공!!!!!!!!!!!!!!");
    callback(response);
    return;
  } else {
    alert("전시 단건 조회 실패");
    console.log(response.status);
    return;
  }
};
// 전시 단건 조회 이벤트
export const onGetExhibitInfoHandler = ({ exhibitId }, callback) => {
  getExhibitInfo({ exhibitId }).then((response) =>
    getExhibitInfoResponse(response, callback)
  );
};
//!-----------------------------관리자 전시 삭제

// 전시 삭제 응답
export const deleteSingleExhibitResponse = (response, callback) => {
  if (!response) {
    alert("네트워크 이상");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("전시 삭제 성공");
    callback();
    return;
  } else {
    alert("탈퇴 실패");
    console.log(response.status);
    return;
  }
};

export const onDeleteSingleExhibitHandler = ({ exhibitId }, callback) => {
  console.log("전시 삭제id" + exhibitId);
  deleteSingleExhibit({ exhibitId }).then((response) =>
    deleteSingleExhibitResponse(response, callback)
  );
};
//!---------------------------- 전시 정보 수정
// todo 요청 응답 확인 필요
export const updateExhibitResponse = (response, callback) => {
  if (!response) {
    alert("네트워크 이상 ");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("전시 정보 수정 성공");
    callback();
    return;
  } else {
    alert("전시 정보 수정 실패");
    console.log(response.status);
    return;
  }
};

export const onUpdateExhibitHandler = (
  {
    exhibitId,
    name,
    intro,
    startDate,
    endDate,
    artistName,
    hostName,
    price,
    city,
  },
  callback
) => {
  updateExhibit({
    exhibitId,
    name,
    intro,
    startDate,
    endDate,
    artistName,
    hostName,
    price,
    city,
  }).then((response) => updateExhibitResponse(response, callback));
};

//!---------------------------- 매칭 상태 변경

export const updateMatchingForAdminResponse = (response, callback) => {
  if (!response) {
    callback(false);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("매칭 상태 변경 성공!!!!!!!!!!!!!!");
    callback(true);
    return;
  } else {
    callback(false);
    console.log(response.status);
    return;
  }
};

export const onUpdateMatchingForAdminHandler = (
  { matchingId, matchingStatus },
  callback
) => {
  console.log("핸들러 안 " + matchingId);
  updateMatchingForAdmin({ matchingId, matchingStatus }).then((response) =>
    updateMatchingForAdminResponse(response, callback)
  );
};
//!-------------------------------관리자 모든 아이템 조회

// 콜백있음
export const onGetAllItemAccDenyResponse = (response, callback) => {
  if (!response) {
    alert("네트워크 이상 ");
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("관리자 모든 매칭 조회 성공");
    callback(response.data);
    return;
  } else {
    alert("관리자 모든 매칭 조회 실패");
    console.log(response.status);
    return;
  }
};

export const onGetAllItemAccDenyHandler = (callback) => {
  getAllItemAccDeny().then((response) =>
    onGetAllItemAccDenyResponse(response, callback)
  );
};
//!---------------------------- 아이템 승인 상태 변경

export const acceptForAuthorResponse = (response, callback) => {
  if (!response) {
    console.log(response.status);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("상태 변경 성공!!!!!!!!!!!!!!");
    callback();
    return;
  } else {
    alert("매칭 상태 변경 실패");
    console.log(response.status);
    return;
  }
};

export const onAcceptForAuthorHandler = ({ projectItemId }, callback) => {
  console.log("핸들러 안 " + projectItemId);
  acceptForAuthor({ projectItemId }).then((response) =>
    acceptForAuthorResponse(response, callback)
  );
};
//!---------------------------- 아이템 승인 상태 변경

export const acceptForSpaceResponse = (response, callback) => {
  if (!response) {
    console.log(response.status);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("상태 변경 성공!!!!!!!!!!!!!!");
    callback();
    return;
  } else {
    alert("매칭 상태 변경 실패");
    console.log(response.status);
    return;
  }
};

export const onAcceptForSpaceHandler = ({ projectItemId }, callback) => {
  console.log("핸들러 안 " + projectItemId);
  acceptForSpace({ projectItemId }).then((response) =>
    acceptForSpaceResponse(response, callback)
  );
};
//!---------------------------- 아이템 승인 상태 변경

export const denyForAuthorResponse = (response, callback) => {
  if (!response) {
    console.log(response.status);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("상태 변경 성공!!!!!!!!!!!!!!");
    callback();
    return;
  } else {
    alert("매칭 상태 변경 실패");
    console.log(response.status);
    return;
  }
};

export const onDenyForAuthorHandler = ({ projectItemId }, callback) => {
  console.log("핸들러 안 " + projectItemId);
  denyForAuthor({ projectItemId }).then((response) =>
    denyForAuthorResponse(response, callback)
  );
};
//!---------------------------- 아이템 승인 상태 변경

export const denyForSpaceResponse = (response, callback) => {
  if (!response) {
    console.log(response.status);
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    console.log("상태 변경 성공!!!!!!!!!!!!!!");
    callback();
    return;
  } else {
    alert("매칭 상태 변경 실패");
    console.log(response.status);
    return;
  }
};

export const onDenyForSpaceHandler = ({ projectItemId }, callback) => {
  console.log("핸들러 안 " + projectItemId);
  denyForSpace({ projectItemId }).then((response) =>
    denyForSpaceResponse(response, callback)
  );
};
