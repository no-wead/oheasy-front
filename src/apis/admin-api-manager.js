import axios from "axios";
import { jsx } from "react/jsx-runtime";
// 변수명 임시 지정
const DOMAIN = "https://www.wooriarte.store/api"; // TODO: 도메인 주소 확인 필요!!!!

//!--------------api
// 모든 매칭 조회
const GetAllMatchingsForAdmin_URL = () => `${DOMAIN}/matchings/admin`;

// 매칭 상태 변경
const UpdateMatchingsForAdmin_URL = ({ id }) =>
  `${DOMAIN}/matchings/admin/matchings/${id}`;

// 전시데이터 생성
const CreateSingleExhibit_URL = ({ id }) =>
  `${DOMAIN}/exhibits/admin/matchings/${id}`;

// 모든 전시 정보 조회
const GetAllExhibits_URL = () => `${DOMAIN}/exhibits`;

// 전시 단건 조회
const GetSingleExhibit_URL = ({ id }) => `${DOMAIN}/exhibits/${id}`;

// 전시 단건 삭제
const DeleteSingleExhibits_URL = ({ id }) => `${DOMAIN}/exhibits/${id}`;

// 전시 단건 정보 수정
const UpdateExhibit_URL = ({ id }) => `${DOMAIN}/exhibits/admin/${id}`;

// 모든 아이템 보기 - 승인 거절용
const GetAllItemAccDeny_URL = () => `${DOMAIN}/admin/manage-item-approval`;

// 어드민 로그인
const AdminLogin_URL = () => `${DOMAIN}/admin/jwtlogin`;

// todo 아이템 승인 거절
const AcceptDenySingleItem_URL = ({ id }) =>
  `${DOMAIN}/admin/matchings/${id}/exhibits`;

const AcceptForAuthor_URL = ({ id }) =>
  `${DOMAIN}/admin/approve-project-item/${id}`;
const AcceptForSpace_URL = ({ id }) =>
  `${DOMAIN}/admin/approve-space-item/${id}`;

const DenyForAuthor_URL = ({ id }) =>
  `${DOMAIN}/admin/refuse-project-item/${id}`;
const DenyForSpace_URL = ({ id }) => `${DOMAIN}/admin/refuse-space-item/${id}`;

//!----------------------------- 어드민 로그인
export const adminLogIn = async ({ id, pw }) => {
  console.log("어드민 LoginRequest실행");
  console.log("리퀘안" + id + pw);
  const result = await axios
    .post(AdminLogin_URL(), { id: id, pwd: pw })
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

// //!----------------------------관리자 모든 매칭 조회
export const getAllMatchingsForAdmin = async () => {
  console.log("관리자 모든 매칭 조회 실행 ");

  const result = await axios
    .get(GetAllMatchingsForAdmin_URL())
    .then((response) => {
      console.log("관리자 모든 매칭 조회 " + response.status);
      return response;
    })
    .catch((error) => {
      console.error("관리자 모든 매칭 조회 실패: " + error);
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
//!---------------------------- 젼시 아이템 생성
export const addExhibit = async ({
  matchingId,
  name,
  intro,
  startDate,
  endDate,
  artistName,
  hostName,
  price,
  city,
}) => {
  console.log(
    "전시 생성 apimanager" +
      matchingId +
      name +
      intro +
      startDate +
      endDate +
      artistName +
      hostName +
      price +
      city
  );
  console.log("전시 생성 매칭id  :" + matchingId);
  const url = CreateSingleExhibit_URL({ id: matchingId });
  console.log("전시 생성 url : " + url);
  const result = await axios
    .post(url, {
      matchingId,
      name,
      intro,
      startDate,
      endDate,
      artistName,
      hostName,
      price,
      soldAmount: 0,
      city,
      isDeleted: false,
    })
    .then((response) => {
      console.log("전시 생성 " + response.status);
      return response;
    })
    .catch((error) => {
      console.error("전시 생성 실패: " + error);
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
// //!---------------------------- 모든 전시 -> 관리자랑 예매자 전부 봄
export const getAllExhibits = async () => {
  console.log("모든 전시 조회 실행 ");

  const result = await axios
    .get(GetAllExhibits_URL())
    .then((response) => {
      console.log("전시 조회 " + response.status);
      return response;
    })
    .catch((error) => {
      console.error("모든 전시 조회 실패: " + error);
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
//!---------------------------- 전시 정보 단건 조회

export const getExhibitInfo = async ({ exhibitId }) => {
  console.log("전시 정보 단건 조회 실행");
  console.log("전시 정보 단건 조회 id  :" + exhibitId);
  const url = GetSingleExhibit_URL({ id: exhibitId });

  console.log("전시 단건 조회 :" + url);
  const result = await axios
    .get(url)
    .then((response) => {
      console.log(response.status);
      return response;
    })
    .catch((error) => {
      console.error("전시 정보 단건 조회  실패: " + error);
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
//!-----------------------------관리자 전시 삭제

export const deleteSingleExhibit = async ({ exhibitId }) => {
  console.log(" 전시 삭제 실행");
  console.log(" 전시 삭제 id  :" + exhibitId);

  const url = DeleteSingleExhibits_URL({ id: exhibitId });

  console.log("전시 삭제 url" + url);
  const result = await axios.delete(url).catch((error) => {
    console.error("전시 삭제 실패: " + error);
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
//!---------------------------- 전시 정보 수정
// todo 요청 응답 필요
export const updateExhibit = async ({
  exhibitId,
  name,
  intro,
  startDate,
  endDate,
  artistName,
  hostName,
  price,
  city,
}) => {
  console.log("전시 정보 수정 실행");
  console.log("전시 정보 수정 전시id  :" + exhibitId);
  const url = UpdateExhibit_URL({ id: exhibitId });

  const result = await axios
    .put(url, {
      name,
      intro,
      startDate,
      endDate,
      artistName,
      hostName,
      price,
      city,
    })
    .then((response) => {
      console.log("전시 정보 수정" + response.status);
      return response;
    })
    .catch((error) => {
      console.error("전시 정보 수정 실패: " + error);
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

//!---------------------------- 매칭 상태 변경
export const updateMatchingForAdmin = async ({
  matchingId,
  matchingStatus,
}) => {
  console.log("매칭 상태 변경 실행");
  console.log("매칭 상태 변경 id  :" + matchingId);
  const url = UpdateMatchingsForAdmin_URL({ id: matchingId });

  console.log("매칭 상태 변경 url :" + url);
  const result = await axios
    .patch(url, {
      matchingStatus,
    })
    .then((response) => {
      console.log(response.status);
      return response;
    })
    .catch((error) => {
      console.error(" 매칭 상태 변경 실패: " + error);
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

// //!----------------------------관리자 모든 아이템 조회
export const getAllItemAccDeny = async () => {
  console.log("관리자 모든 아이템 조회 실행 ");

  const result = await axios
    .get(GetAllItemAccDeny_URL())
    .then((response) => {
      console.log("관리자 모든 아이템 조회 " + response.status);
      return response;
    })
    .catch((error) => {
      console.error("관리자 모든 아이템 조회 실패: " + error);
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
//!---------------------------- 작가 아이템 승인 변경
export const acceptForAuthor = async ({ projectItemId }) => {
  console.log("작가 아이템 승인 변경실행");
  console.log("작가 아이템 승인 변경 id  :" + projectItemId);
  const url = AcceptForAuthor_URL({ id: projectItemId });

  console.log("작가 아이템 승인 변경 url :" + url);
  const result = await axios
    .post(url)
    .then((response) => {
      console.log(response.status);
      return response;
    })
    .catch((error) => {
      console.error(" 작가 아이템 승인 변경실패: " + error);
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
//!---------------------------- 공간 아이템 승인 변경
export const acceptForSpace = async ({ projectItemId }) => {
  console.log("작가 아이템 승인 변경실행");
  console.log("작가 아이템 승인 변경 id  :" + projectItemId);
  const url = AcceptForSpace_URL({ id: projectItemId });

  console.log("작가 아이템 승인 변경 url :" + url);
  const result = await axios
    .post(url)
    .then((response) => {
      console.log(response.status);
      return response;
    })
    .catch((error) => {
      console.error(" 작가 아이템 승인 변경실패: " + error);
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
//!---------------------------- 작가 아이템 승인 거절 변경
export const denyForAuthor = async ({ projectItemId }) => {
  console.log("작가 아이템 승인 변경실행");
  console.log("작가 아이템 승인 변경 id  :" + projectItemId);
  const url = DenyForAuthor_URL({ id: projectItemId });

  console.log("작가 아이템 승인 변경 url :" + url);
  const result = await axios
    .post(url)
    .then((response) => {
      console.log(response.status);
      return response;
    })
    .catch((error) => {
      console.error(" 작가 아이템 승인 변경실패: " + error);
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
//!---------------------------- 공간 아이템 승인 변경
export const denyForSpace = async ({ projectItemId }) => {
  console.log("작가 아이템 승인 변경실행");
  console.log("작가 아이템 승인 변경 id  :" + projectItemId);
  const url = DenyForSpace_URL({ id: projectItemId });

  console.log("작가 아이템 승인 변경 url :" + url);
  const result = await axios
    .post(url)
    .then((response) => {
      console.log(response.status);
      return response;
    })
    .catch((error) => {
      console.error(" 작가 아이템 승인 변경실패: " + error);
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
