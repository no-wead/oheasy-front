import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// todo 결제 후 앞으로 가는거 막기
const BuyingResult = () => {
  const bankName = "우리은행";
  const accountNumber = "1002-020-14444";

  const uselocation = useLocation();
  const { totalPrice } = uselocation.state;

  // 입금날짜 3일 안에하는걸로 지속적으로 변경
  const [dateState, setDateState] = useState();
  // 특정 날짜에 일수를 더하는 함수
  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const formateDate = (date) => {
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(date);
  };

  const [todayState, setTodayState] = useState(formateDate(new Date()));
  const [endDayState, setEndDayState] = useState(
    formateDate(addDays(new Date(), 3))
  );

  return (
    <div className="parentComponent">
      <h2>주문이 완료되었습니다.</h2>
      <div />
      <span>아래 가상계좌로 입금해주시면 정상적으로 결제완료가 됩니다.</span>
      <div />
      <span>계좌 정보</span>
      <div />
      <span>
        {bankName} : {accountNumber}
      </span>
      <span>예금주 : 우리아르떼</span>
      <div />
      <span>결제 금액</span>
      <div />
      <span>{totalPrice}</span>
      <div />
      <span>입금기간</span>
      <div />
      <span>
        {todayState} ~ {endDayState}
      </span>
    </div>
  );
};
export default BuyingResult;
