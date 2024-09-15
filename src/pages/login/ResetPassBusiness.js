import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { onFindAuthorPwHandler } from "../../apis/servicehandeler/AuthorApiHandler";
import { onFindSpacePwHandler } from "../../apis/servicehandeler/SpaceApiHandler";

// 다이어로그
import MuiDialog from "../../libs/MuiDialog";
//? 비즈니스 비번 재설정 사이트
const ResetPassBusiness = () => {
  const uselocation = useLocation();
  const { userInfo, id } = uselocation.state; // 작가인지 공간인지
  const [enableDialog, setEnableDialog] = useState(false); //  다이어로그
  // 다음 버튼 활성화
  const [enableNextBtn, setEnableNextBtn] = useState(true);

  const [state, setState] = useState({
    pass: "",
    authpass: "",
  });
  // id, pw 입력이 달라지면 상태 감지
  const handleChangeState = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (
      state.pass === state.authpass &&
      state.pass.length > 1 &&
      state.authpass.length > 1
    ) {
      setEnableNextBtn(true);
    } else {
      setEnableNextBtn(false);
    }
  }, [state]);
  //todo 유저별로 api 달기
  // api 연결 시 id, userType 필요함
  const nextPage = () => {
    if (userInfo === "author") {
      onFindAuthorPwHandler({ id, new_pwd: state.pass }, (responseStatus) => {
        if (responseStatus) {
          setEnableDialog(true);
        }
      });
    } else {
      // 공간대여자의 경우
      onFindSpacePwHandler({ id, new_pwd: state.pass }, (responseStatus) => {
        if (responseStatus) {
          setEnableDialog(true);
        }
      });
    }
  };
  return (
    <>
      <Box
        component="form"
        sx={{
          display: "flex", // 사용 flexbox 레이아웃
          flexDirection: "column", // 요소들을 세로로 정렬
          alignItems: "center", // 가로 방향으로 가운데 정렬
          "& .MuiTextField-root": { m: 1, width: "25ch" }, // 각 텍스트 필드 스타일 지정
          marginBottom: 20,
        }}
        noValidate
        autoComplete="off"
      >
        <Stack spacing={2}>
          <h2 style={{ marginBottom: 40, marginTop: 30, marginLeft: 10 }}>
            비밀번호 재설정
          </h2>
          <TextField
            name="pass"
            id="standard-number1"
            label="새로운 비밀번호 "
            type="password"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            onChange={handleChangeState}
          />
          <TextField
            name="authpass"
            id="standard-number2"
            label="새로운 비밀번호 재입력 "
            type="password"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            onChange={handleChangeState}
          />

          <button
            type="button"
            class="btn btn-dark"
            onClick={nextPage}
            disabled={!enableNextBtn}
          >
            확인
          </button>
        </Stack>
        {enableDialog && (
          <MuiDialog
            title={"알림"}
            content={
              "비밀번호가 재설정되었습니다. 로그인 페이지로 이동합니다. "
            }
            result={true}
            page={"goLogin"}
            parentClick={setEnableDialog}
          />
        )}
      </Box>
    </>
  );
};

export default ResetPassBusiness;
