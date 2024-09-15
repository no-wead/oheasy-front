import { useEffect, useState } from "react";
import { onGetSuccessMatchingAuthorHandler } from "../../apis/servicehandeler/AuthorApiHandler";
import { onGetSuccessMatchingSpaceHandler } from "../../apis/servicehandeler/SpaceApiHandler";
import MatchingItem from "../../components/matching/MathingItem";
const AcceptedMatchingList = ({ updateCount }) => {
  const [mockData, setMockData] = useState([{}]); // 받는 형식이 배열 안 객체라

  // 성사된 매칭
  useEffect(() => {
    let id = localStorage.getItem("userId");
    let userType = localStorage.getItem("userType");
    console.log("성사된Matching 사업자 id " + id);
    console.log("성사된Matching 사업자 type " + userType);
    if (userType === "author") {
      onGetSuccessMatchingAuthorHandler({ authorId: id }, (response) => {
        if (Array.isArray(response)) {
          setMockData(response);
        } else {
          console.error("성사된 데이터가 배열이 아닙니다.");
        }
      });
    } else if (userType === "space") {
      onGetSuccessMatchingSpaceHandler({ spaceId: id }, (response) => {
        if (Array.isArray(response.data)) {
          setMockData(response.data);
          console.log("서버응답데이터" + response.data);
          console.log("상태에 넣은 데이터 " + mockData);
        } else {
          console.error("응답 데이터가 배열이 아닙니다.");
        }
      });
    } else {
      alert("성사된 matching 잘못된 접근");
    }
  }, [updateCount]);

  return (
    <>
      <>
        {mockData.length > 0 ? (
          mockData.map((item, index) => (
            <MatchingItem
              key={item.matchingId}
              text={`${index + 1}. ${item.name} 님과 매칭이 성사되었습니다.`}
              id={item.itemId}
            />
          ))
        ) : (
          <span>현재 성사된 매칭이 없습니다.</span>
        )}
      </>
    </>
  );
};
export default AcceptedMatchingList;
