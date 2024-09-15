//? 공간대여자용

import axios from "axios";
import { jsx } from "react/jsx-runtime";
// 변수명 임시 지정
const DOMAIN = "https://www.wooriarte.store/api"; // TODO: 도메인 주소 확인 필요!!!!

//?----------------------------- 공간대여자 url
const LoginSpace_URL = () => `${DOMAIN}/space-rentals/login`; //! url수정 완
const LoginJwtSpace_URL = () => `${DOMAIN}/space-rentals/jwtlogin`; //! url수정 완
const SignupSpace_URL = () => `${DOMAIN}/space-rentals`; //! 수정 완
const FindSpaceId_URL = () => `${DOMAIN}/space-rentals/find-id`;

const findSpacePass_URL = () => `${DOMAIN}/space-rentals/set-pwd`; //! 수정 완

const DeleteSpace_URL = ({ id }) => `${DOMAIN}/space-rentals/${id}`; //! 수정완

const confirmSpacePw_URL = ({ id }) =>
  `${DOMAIN}/space-rentals/${id}/verify-pwd`; //! 수정완
const getSpaceInfo_URL = ({ id }) => `${DOMAIN}/space-rentals/${id}`; //! 수정완
const updateSpaceInfo_URL = ({ id }) => `${DOMAIN}/space-rentals/${id}`; //! 수정완

//?----------------------------- 스페이스 아이템
// 공간 아이템 추가
const addSpaceItem_URL = () => `${DOMAIN}/space-items`;

// 모든 공간 아이템 조회
const getAllSpaceItem_URL = () => `${DOMAIN}/space-items/approved-all`;

// 공간 필터링
const GetFilteredSpaceProject_URL = ({ startDate, endDate, city }) =>
  `${DOMAIN}/space-items/${startDate}/${endDate}/${city}`;

// 공간 아이템 상세 조회/ 삭제
const GetSpaceItem_URL = ({ id }) => `${DOMAIN}/space-items/${id}`; //! 수정완

// 공간대여자의 아이템만 가져오기
const GetSpacesSpaceItem_URL = ({ id }) =>
  `${DOMAIN}/space-items/space-rental/${id}`;

//?------------------------------공간 신청 url
const ApplyToAuthorItem_URL = ({ itemId }) =>
  `${DOMAIN}/matchings/space/${itemId}/request`; // todo 하기

//?------------------------------작가 매칭 url
const WaitingMatchingForSpace_URL = ({ id }) =>
  `${DOMAIN}/matchings/space-rental/${id}/waitings`; // 대기 //! 수정완
const GetOfferedMatchingForSpace_URL = ({ id }) =>
  `${DOMAIN}/matchings/space-rental/${id}/offers`; // 신청받은 //! 수정완
const GetSuccessMatchingForSpace_URL = ({ id }) =>
  `${DOMAIN}/matchings/space-rental/${id}/success`; // 성공 //! 수정완

//?------------------------------ ? 이메일 인증
const FindPassForSpacebyEmail_URL = () =>
  `${DOMAIN}/email/space-rentals/email-send`; //! -> url 수정함
const FindPassAuthForSpacebyEmail_URL = () =>
  `${DOMAIN}/email/space-rentals/email-auth-check`; //!-> url 수정함

//? ------------------------------- 사진 업로드
const uploadImg_URL = ({ id }) => `${DOMAIN}/space-photos/${id}`; //!-> url 수정함

//!----------------------------- 스페이스 로그인
export const LoginSpaceRequest = async ({ id, pwd }) => {
  console.log("스페이스 LoginRequest실행");
  console.log("리퀘안" + id + pwd);
  const result = await axios
    .post(LoginSpace_URL(), { id: id, pwd: pwd })
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
//!----------------------------- 공간 jwt로그인
export const LoginJwtSpaceRequest = async ({ id, pwd }) => {
  console.log("공간 LoginRequest실행");
  console.log("리퀘안" + id + pwd);
  const result = await axios
    .post(LoginJwtSpace_URL(), { id: id, pwd: pwd })
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

//!----------------------------- 스페이스 회원가입
export const SignupSpace = async ({
  businessNum,
  id,
  pwd,
  company,
  ceo,
  email,
  phone,
}) => {
  console.log("스페이스 회원가입 SignupSpace 실행");
  console.log(
    "스페이스 회원가입 리쿼안 :" +
      businessNum +
      "/" +
      company +
      "/" +
      ceo +
      "/" +
      email +
      "/" +
      phone +
      "/" +
      pwd
  );
  const result = await axios
    .post(SignupSpace_URL(), {
      businessNumber: businessNum,
      id: id,
      pwd: pwd,
      company: company,
      ceo: ceo,
      email: email,
      phone: phone,
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

//!----------------------------- 스페이스 아이디 찾기
export const findSpaceId = async ({ email }) => {
  console.log("스페이스 아이디 찾기 실행");
  console.log("스페이스 아이디 찾기 리쿼안 :" + email);
  const result = await axios
    .post(FindSpaceId_URL(), email, {
      headers: {
        "Content-Type": "text/plain",
      },
    })
    .then((response) => {
      console.log(response.status);
      return response;
    })
    .catch((error) => {
      console.error("스페이스 아이디 찾기 실패: " + error);
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
//!----------------------------- 스페이스 비번 재설정
export const findSpacePw = async ({ id, new_pwd }) => {
  console.log("스페이스 비번 재설정 실행");
  console.log("스페이스 아이디찾기 리쿼안 :" + id + "/" + new_pwd);
  const result = await axios
    .post(findSpacePass_URL(), {
      id: id,
      new_pwd,
    })
    .then((response) => {
      console.log(response.status);
      return response;
    })
    .catch((error) => {
      console.error("스페이스 비번 재설정 실패: " + error);
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
//!-----------------------------스페이스 삭제

export const deleteSpace = async ({ id }) => {
  console.log("공간대여자 삭제 실행");
  console.log("공간대여자 삭제 id  :" + id);

  const url = DeleteSpace_URL({ id: id });

  console.log("url" + url);
  const result = await axios.delete(url).catch((error) => {
    console.error("공간대여자 삭제 실패: " + error);
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

//!---------------------------- 공간대여자 마이페이지 비번 확인
export const confirmSpacePw = async ({ userId, password }) => {
  console.log("공간대여자 마이페이지 비번확인 실행");
  console.log("공간대여자 마이페이지 비번확인 id  :" + userId);
  const url = confirmSpacePw_URL({ id: userId });
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

//!---------------------------- 공간대여자 마이페이지 정보 조회
export const getSpaceInfo = async ({ id }) => {
  console.log("스페이스 정보 조회 실행");
  console.log("스페이스 정보조회 id  :" + id);
  const url = getSpaceInfo_URL({ id: id });
  console.log("스페이스정보찾기 " + url);
  const result = await axios
    .get(url)
    .then((response) => {
      console.log(response.status);
      return response;
    })
    .catch((error) => {
      console.error("스페이스 정보 조회 실패: " + error);
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

//!---------------------------- 스페이스 마이페이지 정보 수정
export const updateSpaceInfo = async ({
  spaceId,
  businessNumber,
  id,
  pwd,
  company,
  ceo,
  email,
  phone,
}) => {
  console.log("스페이스 정보 수정 실행");
  console.log("스페이스 정보조회 id  :" + id);
  const url = updateSpaceInfo_URL({ id: spaceId });

  const result = await axios
    .put(url, {
      businessNumber: businessNumber,
      id: id,
      company: company,
      ceo,
      pwd: pwd,
      email: email,
      phone: phone,
    })
    .then((response) => {
      console.log("스페이스 정보 수정 " + response.status);
      return response;
    })
    .catch((error) => {
      console.error("스페이스 수정 실패: " + error);
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
// todo 여기서부터 확인하기

//!---------------------------- 스페이스 아이템 생성
export const addSpaceItem = async ({
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
}) => {
  console.log(
    "스페이스 아이템 추가 실행" +
      spaceRentalId +
      intro +
      hostname +
      city +
      size +
      parking +
      fee +
      phone +
      startDate +
      endDate
  );
  console.log("스페이스 정보조회 id  :" + spaceRentalId);
  const result = await axios
    .post(addSpaceItem_URL(), {
      title,
      spaceRentalId,
      intro,
      hostName: hostname,
      city,
      size,
      parking,
      fee,
      phone,
      approval: false,
      startDate,
      endDate,
      isDeleted: false,
    })
    .then((response) => {
      console.log("스페이스 아이템 추가 " + response.status);
      return response;
    })
    .catch((error) => {
      console.error("스페이스 아이템 추가 실패: " + error);
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
//!---------------------------- 모든 스페이스 아이템 조회
export const getAllSpaceItem = async () => {
  console.log("모든 스페이스 아이템 가져오기 실행");
  const result = await axios
    .get(getAllSpaceItem_URL())
    .then((response) => {
      console.log("모든 스페이스 아이템 조회 " + response.status);
      return response;
    })
    .catch((error) => {
      console.error("모든 스페이스 아이템 조회 실패: " + error);
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
//!---------------------------- 스페이스 아이템 단건 조회
export const getSpaceItemInfo = async ({ posterId }) => {
  console.log("스페이스 아이템 단건 조회 시작");
  console.log("스페이스 아이템 번호 id  :" + posterId);
  const url = GetSpaceItem_URL({ id: posterId });

  const result = await axios
    .get(url)
    .then((response) => {
      console.log("스페이스 아이템 단건조회 " + response.status);
      return response;
    })
    .catch((error) => {
      console.error("스페이스 아이템 단건조회 실패: " + error);
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
// todo 시작일 끝날짜 추가 필요
//!---------------------------- 스페이스 아이템 수정
export const updateSpaceItemInfo = async ({
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
}) => {
  console.log("스페이스 아이템 수정 실행: " + startDate + endDate);
  console.log("스페이스 아이템 api 통신부 호스트네임: " + hostname);
  const url = GetSpaceItem_URL({ id: spaceId });
  console.log("스페이스 아이템 수정" + url);
  const result = await axios
    .put(url, {
      title,
      intro,
      hostName: hostname,
      city,
      size,
      parking,
      fee,
      phone,
      startDate,
      endDate,
    })
    .then((response) => {
      console.log("프로젝트 작품 수정 " + response.status);
      return response;
    })
    .catch((error) => {
      console.error("프로젝트 작품 수정 실패: " + error);
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
//!-----------------------------스페이스 아이템 삭제

export const deleteSpaceItem = async ({ spaceId }) => {
  console.log("스페이스 아이템 삭제 실행");
  console.log("스페이스 아이템 삭제 posterid  :" + spaceId);

  const url = GetSpaceItem_URL({ id: spaceId });

  console.log("url" + url);
  const result = await axios.delete(url).catch((error) => {
    console.error("스페이스 아이템 삭제 실패: " + error);
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
//!---------------------------- 공간 -> 작가 신청
export const applyToAuthorItem = async ({ authorItemId, spaceItemId }) => {
  console.log("공간 -> 작가 신청 실행");
  console.log("신청 공간 아이템 id  :" + spaceItemId);
  const url = ApplyToAuthorItem_URL({ itemId: spaceItemId });

  const result = await axios
    .post(url, { projectItemId: authorItemId })
    .then((response) => {
      console.log("공간 -> 작가 신청 status" + response.status);
      return response;
    })
    .catch((error) => {
      console.error("공간 -> 작가 신청  실패: " + error);
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
//!---------------------------- 스페이스 매칭대기
export const waitingMatchingForSpace = async ({ spaceId }) => {
  console.log("스페이스 매칭대기 실행");
  console.log("매칭대기 스페이스 id  :" + spaceId);
  const url = WaitingMatchingForSpace_URL({ id: spaceId });
  console.log("공간대여 매칭 대기 url" + url);
  const result = await axios
    .get(url)
    .then((response) => {
      console.log("스페이스 매칭대기 실행 status" + response.status);
      return response;
    })
    .catch((error) => {
      console.error("스페이스 매칭대기 실행 실패: " + error);
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
//!---------------------------- 스페이스 신청받은 조회
export const getOfferedMatchingForSpace = async ({ spaceId }) => {
  console.log("스페이스 신청받은 조회   실행");
  console.log("스페이스  id  :" + spaceId);
  const url = GetOfferedMatchingForSpace_URL({ id: spaceId });

  const result = await axios
    .get(url)
    .then((response) => {
      console.log("스페이스 신청받은 조회  실행 status" + response.status);
      return response;
    })
    .catch((error) => {
      console.error("스페이스 신청받은 조회 실행 실패: " + error);
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
//!---------------------------- 공간 성공매칭 조회
export const getSuccessMatchingForSpace = async ({ spaceId }) => {
  console.log("공간 성공매칭 실행");
  console.log("공간 id  :" + spaceId);
  const url = GetSuccessMatchingForSpace_URL({ id: spaceId });

  const result = await axios
    .get(url)
    .then((response) => {
      console.log(" 공간 성공매칭 조회  실행 status" + response.status);
      return response;
    })
    .catch((error) => {
      console.error(" 공간 성공매칭 조회  실행 실패: " + error);
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
//!---------------------------- 공간임대자의 아이템들 조회
export const getOneSpaceItems = async ({ spaceId }) => {
  console.log("공간임대자의 아이템들 조회 실행");
  console.log("공간임대자 id  :" + spaceId);
  const url = GetSpacesSpaceItem_URL({ id: spaceId });

  const result = await axios
    .get(url)
    .then((response) => {
      console.log("공간임대자 아이템들 조회 실행 status" + response.status);
      return response;
    })
    .catch((error) => {
      console.error("공간임대자 아이템들 조회 실행 실패: " + error);
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
export const findPassForSpaceByEmailRequest = async ({ id, email }) => {
  console.log("비번 찾기  이메일 전송 url" + FindPassForSpacebyEmail_URL());
  console.log("비번 찾기  이메일 전송 " + id + email);

  const result = await axios
    .post(FindPassForSpacebyEmail_URL(), {
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
export const confirmEmailAuthForSpaceRequest = async ({
  id,
  email,
  authNum,
}) => {
  console.log("인증번호 인증" + id + email + authNum);
  const result = await axios

    .post(FindPassAuthForSpacebyEmail_URL(), {
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

export const onFindPassForSpacerByEmailHandler = ({ id, email }, callback) => {
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

//!---------------------------- 필터링 아이템 불러오기
export const getSearchSpaceProject = async ({ startDate, endDate, city }) => {
  console.log(" 공간 필터링 아이템 가져오기 실행");
  const url = GetFilteredSpaceProject_URL({ startDate, endDate, city });
  console.log("공간 필터링 url" + url);
  const result = await axios
    .get(url)
    .then((response) => {
      console.log("공간 필터링 아이템 조회 " + response.status);
      return response;
    })
    .catch((error) => {
      console.error("공간 필터링 아이템 조회 실패: " + error);
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
// //!---------------------------- 공간작품 사진 올리기
export const uploadSpacePhoto = async ({ id, formData }) => {
  console.log(" 공간작품 사진 올리기 실행");
  const url = uploadImg_URL({ id });
  console.log("공간작품 사진 올리기 url" + url);
  const result = await axios
    .post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("공간작품 사진 올리기조회 " + response.status);
      return response;
    })
    .catch((error) => {
      console.error("공간작품 사진 올리기 실패: " + error);
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
// //!---------------------------- 공간작품 사진 삭제
export const deleteSpacePhoto = async ({ id }) => {
  console.log(" 공간작품 사진 삭제 실행");
  const url = uploadImg_URL({ id });
  console.log("공간작품 사진 삭제 url" + url);
  const result = await axios
    .delete(url)
    .then((response) => {
      console.log("공간작품 사진 삭제 " + response.status);
      return response;
    })
    .catch((error) => {
      console.error("공간작품 사진 삭제 실패: " + error);
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
// //!---------------------------- 공간 사진 조회
export const getSpacePhoto = async ({ id }) => {
  console.log(" 공간 사진 조회 실행");
  const url = uploadImg_URL({ id });
  console.log("공간 사진 조회 url" + url);
  const result = await axios
    .get(url)
    .then((response) => {
      console.log("공간 사진 조회 " + response.status);
      return response;
    })
    .catch((error) => {
      console.error("공간 사진 조회 실패: " + error);
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
// //!---------------------------- 공간작품 사진 수정하기
export const updateSpacePhoto = async ({ id, formData }) => {
  console.log(" 공간작품 사진 수정하기 실행");
  const url = uploadImg_URL({ id });
  console.log("공간작품 사진 수정하기 url" + url);
  const result = await axios
    .put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("공간작품 사진 수정하기 " + response.status);
      return response;
    })
    .catch((error) => {
      console.error("공간작품 사진 수정하기 실패: " + error);
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
