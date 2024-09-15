import * as React from "react";

// 레이아웃
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import { MapsUgcTwoTone } from "@mui/icons-material";
import MatchingItem from "../matching/MathingItem";
import WaitingMatchingList from "../matching/WaitingMatchingList";
import ReceivedMatchingList from "../matching/ReceivedMatchingList";
import AcceptedMatchingList from "../matching/AcceptedMatchingList";
import { useState } from "react";

const Matching = () => {
  // 매칭 성사되면 재로딩
  const [updateCount, setUpdateCount] = useState(0);

  return (
    <>
      <Container>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <h2>
            <span style={{ fontSize: 22, fontWeight: "bold" }}>받은 제안</span>
          </h2>
          <div style={{ backgroundColor: "white" }}></div>
          <Stack
            alignItems="center" // 세로 방향으로 중앙 정렬
            spacing={2}
            sx={{
              display: "flex",
            
              marginBottom: 1,
            }}
            // 요소들을 가로 방향으로 배치
          >
            <ReceivedMatchingList
              setUpdateCount={setUpdateCount}
              updateCount={updateCount}
            />
          </Stack>
          <h2>
            <span style={{ fontSize: 22, fontWeight: "bold" }}>신청 현황</span>
          </h2>

          <div />
          <Stack
            alignItems="center" // 세로 방향으로 중앙 정렬
            spacing={2}
            style={{ display: "flex", marginBottom: 7 }}
          >
            {/* 대기 매칭 리스트  */}
            <WaitingMatchingList />
          </Stack>

          <h2>
            <span style={{ fontSize: 22, fontWeight: "bold" }}>
              성사된 매칭
            </span>
          </h2>

          <Stack
            alignItems="center" // 세로 방향으로 중앙 정렬
            spacing={2}
            style={{ display: "flex", marginTop: 2 }}
            // 요소들을 가로 방향으로 배치
          >
            <AcceptedMatchingList updateCount={updateCount} />
          </Stack>
        </Box>
      </Container>
    </>
  );
};
export default Matching;
