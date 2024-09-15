import Stack from "@mui/material/Stack";
import Button from "react-bootstrap/Button";
// 어이콘
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import IconButton from "@mui/material/IconButton";

import { onMatchingAccDenyHandler } from "../../apis/servicehandeler/MatchingApiHandler";
import { useNavigate } from "react-router-dom";
//!--------------------비즈니스 매칭관리 페이지
const ReceivedMatchingItem = ({ text, matchingId, setUpdateCount, id }) => {
  // 제안 수락/ 거절
  const AcceptPropsal = (matchingId, result) => {
    console.log("눌린 매칭 버튼" + result);
    onMatchingAccDenyHandler({ matchingId, result }, () => {
      console.log("제안 수락/거절 성공");
      setUpdateCount((prev) => prev + 1);
      console.log("두번째 로딩");
    });
  };

  const nav = useNavigate();

  const goItemInfo = (id) => {
    let whatUser = localStorage.getItem("userType");
    if (whatUser === "author") {
      nav(`/businessiteminfo/${id}`, {
        state: { userType: "space", posterId: id },
      });
    } else {
      nav(`/businessiteminfo/${id}`, {
        state: { userType: "author", posterId: id },
      });
    }
  };

  return (
    <>
      <Stack
        spacing={0.9}
        direction="row"
        sx={{ display: "flex", justifyContent: "space-between", width: "90%" }}
      >
        <span> {text}</span>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            aria-label="add an alarm"
            style={{ marginRight: 5 }}
            onClick={() => goItemInfo(id)}
          >
            <ContentPasteSearchIcon />
          </IconButton>
          <Button
            variant="outline-dark"
            style={{ padding: 5, marginRight: 5 }}
            onClick={() => AcceptPropsal(matchingId, true)}
          >
            수락
          </Button>{" "}
          <Button
            variant="outline-dark"
            style={{ padding: 5 }}
            onClick={() => AcceptPropsal(matchingId, false)}
          >
            거절
          </Button>{" "}
        </div>
      </Stack>
    </>
  );
};
export default ReceivedMatchingItem;
