import React from "react";
import Button from "../components/Button";

const darkBackgroundStyle = {
  position: "fixed",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0,0,0,0.8)",
};

const dialogBlockStyle = {
  width: "320px",
  padding: "1.5rem",
  background: "white",
  borderRadius: "2px",
};

const h3Style = {
  margin: 0,
  fontSize: "1.5rem",
};

const pStyle = {
  fontSize: "1.125rem",
};

const buttonGroupStyle = {
  marginTop: "3rem",
  display: "flex",
  justifyContent: "flex-end",
};

const setCancel = () => {};
const setConfirm = () => {};

function Dialog({ title, children, confirmText, cancelText }) {
  confirmText = "확인";
  cancelText = "취소";
  return (
    <div style={darkBackgroundStyle}>
      <div style={dialogBlockStyle}>
        <h3 style={h3Style}>월 선택</h3>
        {/* <p style={pStyle}>{children}</p> */}
        <div style={buttonGroupStyle}>
          <Button text={cancelText} isVisible={true} onClick={setCancel} />
          <Button text={confirmText} isVisible={true} onClick={setConfirm} />
        </div>
      </div>
    </div>
  );
}

Dialog.defaultProps = {
  cancelText: "취소",
  confirmText: "확인",
};

export default Dialog;
