import Stack from "@mui/material/Stack";
import Button from "react-bootstrap/Button";
// 체크박스
import Checkbox from "@mui/material/Checkbox";
import { blue, grey, pink, red } from "@mui/material/colors";
import * as React from "react";

// css
import "../../styles/Withdrawal.css";

// api
import { onDeleteUserHandler } from "../../apis/servicehandeler/ApiHandler";
import { onDeleteAuthorHandler } from "../../apis/servicehandeler/AuthorApiHandler";
import { onDeleteSpaceHandler } from "../../apis/servicehandeler/SpaceApiHandler";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MuiDialog from "../../libs/MuiDialog";

import { loginContext } from "../../App";
import { dark } from "@mui/material/styles/createPalette";

const WithDrawalUser = () => {
  const nav = useNavigate();
  // 회원탈퇴 버튼 활성화
  const [enableBtn, setEnableBtn] = useState(false);
  // 체크 상태
  const [checked, setChecked] = useState(false);
  const changeUserLoginState = React.useContext(loginContext);
  const [enableDialog, setEnableDialog] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // 동의 한 후 탈퇴 가능하게
  useEffect(() => {
    if (checked) setEnableBtn(true);
    else setEnableBtn(false);
  }, [checked]);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // 탈퇴하기 클릭 리스너
  const widthDrawalHandler = () => {
    let userType = localStorage.getItem("userType");
    let id = localStorage.getItem("userId");
    if (userType === "user") {
      onDeleteUserHandler({ userId: id }, () => {
        console.log("탈퇴눌림");
        // 성공시 콜백

        console.log("유저탈퇴 successful, navigating back");
        localStorage.removeItem("userId");
        localStorage.removeItem("userType");
        changeUserLoginState(false);
        setEnableDialog(true);
      });
    } else if (userType === "author") {
      // todo 선언하기
      onDeleteAuthorHandler({ id }, () => {
        console.log("작가 탈퇴 눌림");
        localStorage.removeItem("userId");
        localStorage.removeItem("userType");
        changeUserLoginState(false);
        setEnableDialog(true);
      });
    } else if (userType === "space") {
      onDeleteSpaceHandler({ id }, () => {
        console.log("공간대여자 탈퇴 눌림");
        localStorage.removeItem("userId");
        localStorage.removeItem("userType");
        changeUserLoginState(false);
        setEnableDialog(true);
      });
    } else {
      console.log("회원 탈퇴 잘못된 접근 ");
    }
  };

  return (
    <div
      className="withdrawalContainer"
      style={{ marginBottom: 65, width: "100%" }}
    >
      <span style={{ fontSize: "23px" }}>
        {" "}
        <strong>
          WOORI ARTE 회원 탈퇴 시, <br /> 아래 내용을 먼저 확인해 주세요.
        </strong>
      </span>
      <div className="content">
        <span></span>
      </div>
      <div />
      <span>
        <p>
          <span>&#183;</span>회원 탈퇴는 신청하시는 즉시 처리됩니다.
        </p>
        <p>
          <span>&#183;</span>회원 탈퇴 후에는 해당 아이디를 다시 사용할 수
          없습니다.{" "}
        </p>
        <p>
          <span>&#183;</span>로그인이 필요한 서비스 이용은 더 이상 이용하실 수
          없게 됩니다.{" "}
        </p>
      </span>
      <Stack
        spacing={2}
        direction="row"
        style={{ alignItems: "center", marginBottom: 20, marginTop: 10 }}
      >
        <Checkbox
          {...label}
          onChange={handleChange}
          style={{
            color: "#000000", // 이 색상은 검은색입니다.
          }}
        />
        <p>
          <span>위 내용을 모두 확인했으며, 이에 동의합니다.</span>
        </p>
      </Stack>
      <Stack spacing={2} direction="row" sx={{ justifyContent: "flex-end" }}>
        <button
          disabled={!enableBtn}
          onClick={widthDrawalHandler}
          type="button"
          class="btn btn-dark"
          style={{
            border: "1px solid #000",
            borderRadius: "0",
            width: "100px",
            height: "40px",
          }}
        >
          탈퇴 신청
        </button>{" "}
      </Stack>
      {enableDialog && (
        <MuiDialog
          title={"알림"}
          content={"탈퇴 되었습니다."}
          result={true}
          page={"goUserMain"}
        />
      )}
    </div>
  );
};
export default WithDrawalUser;
