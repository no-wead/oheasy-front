import ReceivedMatchingItem from "./ReceivedMatchingItem";

// api
import { onGetOfferedMatchingSpaceHandler } from "../../apis/servicehandeler/SpaceApiHandler";
import { onGetOfferedMatchingAuthorHandler } from "../../apis/servicehandeler/AuthorApiHandler";
import { useEffect, useState } from "react";
const ReceivedMatchingList = ({ setUpdateCount, updateCount }) => {
  const [mockData, setMockData] = useState([{}]); // 받는 형식이 배열 안 객체라

  // 대기 중 매칭
  useEffect(() => {
    let id = localStorage.getItem("userId");
    let userType = localStorage.getItem("userType");
    console.log("WaitingMatching 사업자 id " + id);
    console.log("WaitingMatching 사업자 type " + userType);
    if (userType === "author") {
      // 대기중인 매칭
      onGetOfferedMatchingAuthorHandler({ authorId: id }, (response) => {
        if (Array.isArray(response)) {
          setMockData(response);
        } else {
          console.error("응답 데이터가 배열이 아닙니다.");
        }
      });
    } else if (userType === "space") {
      onGetOfferedMatchingSpaceHandler({ spaceId: id }, (response) => {
        if (Array.isArray(response.data)) {
          setMockData(response.data);
          // console.log("서버응답데이터" + response.data);
          // console.log("상태에 넣은 데이터 " + mockData);
        } else {
          console.error("응답 데이터가 배열이 아닙니다.");
        }
      });
    } else {
      alert("대기 중 matching 잘못된 접근");
    }
  }, [updateCount]);

  return (
    <>
      {mockData.length > 0 ? (
        mockData.map((item, index) => (
          <ReceivedMatchingItem
            key={item.matchingId}
            text={`${index + 1}. ${item.name} 님이 신청을 보내셨습니다.`}
            matchingId={item.matchingId}
            setUpdateCount={setUpdateCount}
            id={item.itemId}
          />
        ))
      ) : (
        <span> 현재 제안 받은 매칭이 없습니다.</span>
      )}
    </>
  );
};

export default ReceivedMatchingList;
