import Form from "react-bootstrap/Form";
import Stack from "@mui/material/Stack";
import Button from "react-bootstrap/Button";

import BootModalForAdmin from "../../libs/BootModalForAdmin";
import { useState } from "react";
import { useEffect } from "react";

// 어이콘
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import IconButton from "@mui/material/IconButton";
import ApartmentIcon from "@mui/icons-material/Apartment";

// api
import { onUpdateMatchingForAdminHandler } from "../../apis/servicehandeler/AdminApiHandler";
import { useNavigate } from "react-router-dom";

import MuiDialog from "../../libs/MuiDialog";

//?--- matchingId: 관리자가 매칭 상태 수정 및 생성 시 쓰임
const AdminMatchingItem = ({
  text,
  matchingId,
  setUpdateCount,
  status,
  spaceId,
  authorId,
  userType,
}) => {
  const [modalShow, setModalShow] = useState(false); // 드랍다운 숫자 저장

  const [selectedStatus, setSelectedStatus] = useState(status); // 선택된 상태를 저장하기 위한 state
  const [enableDialog, setEnableDialog] = useState(false); //  다이어로그
  const [enableItem, setEnableItem] = useState(true); //  다이어로그
  const nav = useNavigate();

  // 드롭다운에서 선택된 값을 state에 저장
  const handleSelectChange = (event) => {
    setSelectedStatus(event.target.value);
  };
  // 매칭 상태 변경 api
  const updateState = (matchingId) => {
    onUpdateMatchingForAdminHandler(
      { matchingId, matchingStatus: selectedStatus },
      (responseStatus) => {
        if (responseStatus) {
          setEnableDialog(true);
          console.log("매칭 상태 변경 callback");
          setUpdateCount((prev) => prev + 1);
        }
      }
    );
  };
  useEffect(() => {
    console.log(selectedStatus);
  }, [selectedStatus]);

  // 전시 생성하기 -> 모달 나옴
  const addExhibit = () => {
    // myposterForBusiness. js 참고
    setModalShow(true);
  };

  const goItemAuthorInfo = (id) => {
    // alert("작가 " + id);
    nav(`/businessiteminfo/${id}`, {
      state: { userType: "author", posterId: id },
    });
  };
  const goItemSpaceInfo = (id) => {
    // alert("비즈니스 " + id);
    nav(`/businessiteminfo/${id}`, {
      state: { userType: "space", posterId: id },
    });
  };

  return (
    <>
      <Stack
        spacing={1}
        direction="row"
        sx={{ display: "flex", justifyContent: "space-between", width: "90%" }}
      >
        <>{text}</>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Form.Select
            aria-label="Default select example"
            value={selectedStatus}
            onChange={handleSelectChange}
            style={{
              width: "auto",
              marginRight: 5,
            }}
          >
            <option value="0">현재 상태</option>
            <option value="REQUESTWAITING">매칭수락대기중 </option>
            <option value="CANCEL">매칭취소</option>
            <option value="FINISH">매칭완료</option>
            <option value="WAITING">전시준비대기중</option>
            <option value="PREPARING">전시준비중</option>
          </Form.Select>
          {enableItem && selectedStatus != "FINISH" && (
            <Button
              variant="outline-dark"
              onClick={() => updateState(matchingId)}
              style={{ marginRight: 5 }}
            >
              상태 변경
            </Button>
          )}
          {enableItem && selectedStatus != "FINISH" && (
            <Button variant="outline-dark" onClick={() => addExhibit()}>
              전시생성
            </Button>
          )}
          <IconButton
            color="inherit"
            aria-label="add an alarm"
            style={{ marginLeft: 10 }}
            onClick={() => goItemAuthorInfo(authorId)}
          >
            <ContentPasteSearchIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="add an alarm"
            style={{ marginLeft: 10 }}
            onClick={() => goItemSpaceInfo(spaceId)}
          >
            <ApartmentIcon n />
          </IconButton>
        </div>
      </Stack>
      <BootModalForAdmin
        show={modalShow}
        onHide={() => setModalShow(false)}
        type={"create"}
        id={matchingId}
        setUpdateCount={setUpdateCount}
        setUpdate={setEnableItem}
      />
      {enableDialog && (
        <MuiDialog
          title={"알림"}
          content={"매칭 상태가 변경되었습니다"}
          result={true}
          page={"login"}
          parentClick={setEnableDialog}
        />
      )}
    </>
  );
};

export default AdminMatchingItem;
