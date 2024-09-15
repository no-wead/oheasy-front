import { useEffect } from "react";
import AdminItem from "./AdminItem";
import { useState } from "react";

import { onGetAllItemAccDenyHandler } from "../../apis/servicehandeler/AdminApiHandler";
import Stack from "@mui/material/Stack";
//!-------------------- 관리자 아이템 승인 창
const AdminItmeList = () => {
  const [mockData, setMockData] = useState([{}]); // 받는 형식이 배열 안 객체라
  const [mockDataForProject, setMockDataForProject] = useState([{}]); // 받는 형식이 배열 안 객체라

  const [updateCount, setUpdateCount] = useState(0); // useEffect 업데이트

  // 관리자 아이템 관리 목록
  useEffect(() => {
    onGetAllItemAccDenyHandler((response) => {
      setMockData(response.spaceItems);

      setMockDataForProject(response.projectItems);
    });
  }, [updateCount]);

  return (
    <>
      <Stack spacing={3} style={{ marginTop: 30 }}>
        {mockData.length > 0 ? (
          mockData.map((item) => (
            // todo 아래 값 반환값에 따라 맞게 수정해야함
            <AdminItem
              key={item.spaceItemId}
              text={`공간 아이템: ${item.spaceItemId} 승인상태: ${item.approval}`}
              id={item.spaceItemId}
              setUpdateCount={setUpdateCount}
              type={"space"}
            />
          ))
        ) : (
          <span>없음</span>
        )}

        <span style={{ fontWeight: "bold", fontSize: "25px" }}>
          작가 아이템
        </span>

        {mockDataForProject.length > 0 ? (
          mockDataForProject.map((item) => (
            // todo 아래 값 반환값에 따라 맞게 수정해야함
            <AdminItem
              key={item.projectItemId}
              text={`작가 아이템: ${item.projectItemId} 승인상태: ${item.approval} `}
              id={item.projectItemId}
              setUpdateCount={setUpdateCount}
              type={"author"}
            />
          ))
        ) : (
          <span>없음</span>
        )}
      </Stack>
    </>
  );
};
export default AdminItmeList;
