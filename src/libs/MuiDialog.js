import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// page는 페이지별 다이어로그 반응 parent는 부모 다이어로그 표시 이벤트 전달
export default function MuiDialog({
  title,
  content,
  result,
  page,
  parentClick,
  parentAnotherClick, // BusinessInfo에 쓰임
}) {
  const nav = useNavigate();
  const [open, setOpen] = React.useState(result);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    // 가는 곳 명시
    switch (page) {
      case "userSignUp": {
        // SignupUser.js
        nav(`/loginuser`);
        setOpen(false);
        return;
      }

      case "login": {
        // LoginEditor.js
        setOpen(false);
        parentClick(false);
        return;
      }
      case "goLogin": {
        nav(-1);
        setOpen(false);
        parentClick(false);
        return;
      }
      case "authorLogin": {
        // SignupUser.js
        nav(`/loginauthor`);
        setOpen(false);
        return;
      }
      case "spaceLogin": {
        // SignupUser.js
        nav(`/loginspace`);
        setOpen(false);
        return;
      }
      case "forBusinessInfo": {
        //for BusinessInfo.js
        setOpen(false);
        parentClick(false);
        parentAnotherClick(false);
        return;
      }
      case "goUserMain": {
        //for withdrawal.js
        nav(`/`);
        setOpen(false);

        return;
      }
      case "goMainbusiness": {
        //for applywithitem.js
        nav(`/mainbusiness`, { replace: true });
        setOpen(false);
        parentClick(false);
        return;
      }
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            style={{
              paddingBottom: 10,
              paddingTop: 10,
              paddingRight: 100,
            }}
          >
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              color: "black", // 활성화 상태에 따라 색상 변경
              fontWeight: "normal", // 활성화 상태에 따라 굵기 변경
            }}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
