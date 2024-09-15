import { useNavigate, useLocation } from "react-router-dom";
import "../styles/LoginSpan.css";
//! ---------------------로그인 글자
const LoginSpan = () => {
  const nav = useNavigate();

  // 유저 로그인으로 가기
  const goLogin = () => {
    nav(`/loginuser`);
  };
  return <h1 onClick={goLogin}>Login</h1>;
};
export default LoginSpan;
