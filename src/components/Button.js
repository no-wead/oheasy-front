import "../styles/Button.css";
/*
text: 버튼 문구 
type: 로그인 스타일의 버튼인지, 개인 사업자 같은 배경이 투명한 스타일의 버튼인지 분기
isVisible: 로그인류의 버튼은 로그인후엔 보이면 안됨
onClick : 버튼에 따른 클릭 이벤트 
*/
const Button = ({ text, type, isVisible, onClick, userType }) => {
  return (
    isVisible && (
      <button className={`Button Button_${type}`} onClick={onClick}>
        {text}
      </button>
    )
  );
};
export default Button;
