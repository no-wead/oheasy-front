import { useEffect, useState } from "react";
import AdminMatchingItem from "./AdminMatchingItem";
import Stack from "@mui/material/Stack";
import { onGetAllMatchingsForAdminHandler } from "../../apis/servicehandeler/AdminApiHandler";

const AdminMatchingList = () => {
  const [mockData, setMockData] = useState([{}]); // 받는 형식이 배열 안 객체라
  const [updateCount, setUpdateCount] = useState(0); // 매칭 상태 변화에 따라 리랜더링
  // 대기 중 매칭
  useEffect(() => {
    onGetAllMatchingsForAdminHandler((response) => {
      if (Array.isArray(response.data)) {
        setMockData(response.data);
      } else {
        console.error("응답 데이터가 배열이 아닙니다.");
      }
    });
  }, [updateCount]);
  return (
    <>
      <Stack spacing={3} style={{ marginTop: 30 }}>
        {mockData.length > 0 ? (
          mockData.map((item) => (
            <AdminMatchingItem
              key={item.matchingId}
              text={`매칭 ID: ${item.matchingId}, 공간 아이템: ${item.spaceItemId} 작가 아이템 : ${item.projectItemId}`}
              matchingId={item.matchingId}
              setUpdateCount={setUpdateCount}
              status={item.matchingStatus}
              spaceId={item.spaceItemId}
              authorId={item.projectItemId}
            />
          ))
        ) : (
          <span>없음</span>
        )}
      </Stack>
    </>
  );
};
export default AdminMatchingList;
