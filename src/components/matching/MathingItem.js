//! 매칭 현황에서 나타날 아이템
// 어이콘
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import IconButton from "@mui/material/IconButton";

import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
const MatchingItem = ({ text, id }) => {
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
        spacing={1}
        direction="row"
        sx={{ display: "flex", justifyContent: "space-between", width: "90%" }}
      >
        <span> {text}</span>
        <IconButton
          color="inherit"
          aria-label="add an alarm"
          style={{ marginLeft: 130 }}
          onClick={() => {
            goItemInfo(id);
          }}
        >
          <ContentPasteSearchIcon />
        </IconButton>
      </Stack>
    </>
  );
};
export default MatchingItem;
