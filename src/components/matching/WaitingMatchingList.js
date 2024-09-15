import { useEffect, useState } from "react";

import { onWaitingMatchingAuthorHandler } from "../../apis/servicehandeler/AuthorApiHandler";
import { onWaitingMatchingSpaceHandler } from "../../apis/servicehandeler/SpaceApiHandler";
import MatchingItem from "./MathingItem";

const WaitingMatchingList = () => {
  const [mockData, setMockData] = useState([{}]); // 받는 형식이 배열 안 객체라

  // 대기 중 매칭
  useEffect(() => {
    let id = localStorage.getItem("userId");
    let userType = localStorage.getItem("userType");
    console.log("WaitingMatching 사업자 id " + id);
    console.log("WaitingMatching 사업자 type " + userType);
    if (userType === "author") {
      // 대기중인 매칭
      onWaitingMatchingAuthorHandler({ authorId: id }, (response) => {
        if (Array.isArray(response)) {
          setMockData(response);
        } else {
          console.error("응답 데이터가 배열이 아닙니다.");
        }
      });
    } else if (userType === "space") {
      onWaitingMatchingSpaceHandler({ spaceId: id }, (response) => {
        if (Array.isArray(response.data)) {
          setMockData(response.data);
          console.log("서버응답데이터" + response.data);
          console.log("상태에 넣은 데이터 " + mockData);
        } else {
          console.error("응답 데이터가 배열이 아닙니다.");
        }
      });
    } else {
      alert("대기 중 matching 잘못된 접근");
    }
  }, []);

  return (
    <>
      {mockData.length > 0 ? (
        mockData.map((item, index) => (
          <MatchingItem
            key={item.matchingId}
            text={`${index + 1}. ${item.name} 님에게 신청을 보냈습니다.`}
            id={item.itemId}
          />
        ))
      ) : (
        <span> 현재 대기중인 매칭이 없습니다. </span>
      )}
    </>
  );
};
export default WaitingMatchingList;
