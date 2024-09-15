import Stack from "@mui/material/Stack";

import Button from "react-bootstrap/Button";

import {
  onAcceptForAuthorHandler,
  onAcceptForSpaceHandler,
  onDenyForAuthorHandler,
  onDenyForSpaceHandler,
} from "../../apis/servicehandeler/AdminApiHandler";

const AdminItem = ({ text, id, setUpdateCount, type }) => {
  // 제안 수락/ 거절
  const AcceptPropsal = (id, result) => {
    console.log("눌린 승인 버튼" + result);

    if (type === "author") {
      onAcceptForAuthorHandler({ projectItemId: id }, () => {
        console.log("작가아이템 수락성공");
        setUpdateCount((prev) => prev + 1);
        console.log("두번째 로딩");
      });
    } else if (type === "space") {
      onAcceptForSpaceHandler({ projectItemId: id }, () => {
        console.log("공간 아이템 수락 성공");
        setUpdateCount((prev) => prev + 1);
        console.log("두번째 로딩");
      });
    } else {
      console.log("작가와 공간 둘다 아님");
    }
  };
  const denyPropsal = (id, result) => {
    console.log("눌린 승인 버튼" + result);

    if (type === "author") {
      onDenyForAuthorHandler({ projectItemId: id }, () => {
        console.log("작가아이템 거절성공");
        setUpdateCount((prev) => prev + 1);
        console.log("두번째 로딩");
      });
    } else if (type === "space") {
      onDenyForSpaceHandler({ projectItemId: id }, () => {
        console.log("공간 아이템 거절 성공");
        setUpdateCount((prev) => prev + 1);
        console.log("두번째 로딩");
      });
    } else {
      console.log("작가와 공간 둘다 아님");
    }
  };
  return (
    <>
      <Stack spacing={2} direction="row">
        <span> {text}</span>
        <Button variant="outline-dark" onClick={() => AcceptPropsal(id, true)}>
          승인
        </Button>{" "}
        <Button variant="outline-dark" onClick={() => denyPropsal(id, false)}>
          거절
        </Button>{" "}
      </Stack>
    </>
  );
};
export default AdminItem;
