import React, { useState, useRef } from "react";
import Button from "../components/Button";
import EditText from "../components/EditText";
import image1 from "../assets/image 1.png";
import { useNavigate, useLocation } from "react-router-dom";

// 레이아웃

import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

//!--------------------------예매하기 누른 페이지
// 다 입력해야 다음 페이지 넘어갈 수 있도록 하기
const BuyingTicket = () => {
  const userNameInput = useRef(); // html 돔 접근 요소 반환 ,React.MutableRefObject
  const userEmailInput = useRef();
  const userPhoneInput = useRef();
  const uselocation = useLocation();
  const { ticketNumber, price, explanation, postName, location, date } =
    uselocation.state; // from exhibiiteminfo.js
  const imageurl = image1;
  const totalPrice = ticketNumber * price;

  const nav = useNavigate();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const buyTicket = () => {
    // todo 티켓구매 창으로 넘어가기
    //이때 paymentType 넘기기!

    if (customerInfoState.customerName.length < 2) {
      userNameInput.current.focus();
      return;
    }
    if (customerInfoState.customerEmail.length < 4) {
      userEmailInput.current.focus();
      return;
    }
    if (customerInfoState.customerPhone.length < 3) {
      userPhoneInput.current.focus();
      return;
    }

    nav(`/buyingresult`, {
      replace: true,
      state: {
        totalPrice: totalPrice,
      },
    });
  };

  // 결제 방식 저장
  const [paymentType, setPaymentType] = useState("creditCard");
  // 구매할 때 입력 정보 저장
  const [customerInfoState, setCustomerInfoState] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
  });

  const handleChangeCustomerState = (e) => {
    setCustomerInfoState({
      ...customerInfoState,
      [e.target.name]: e.target.value,
    });
  };

  const onChangePaymentType = (e) => {
    setPaymentType(e.target.value);
  };

  return (
    <>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        alignItems="center" // 요소들을 세로 방향 중앙 정렬
        justifyContent="center" // 요소들을 가로 방향 중앙 정렬
      >
        <Item>
          <img src={imageurl} />
        </Item>

        <Item>
          <div>
            <span>전시명</span>
            <span>{postName}</span>
          </div>
          <div>
            <span>관람기간 </span>
            <span>{date}</span>
          </div>
          <div>
            <span>관람장소 </span>
            <span>{location}</span>
          </div>
          <div>
            <span>매수 </span>
            <span>{ticketNumber}개</span>
          </div>
          <div>
            <span>관람료 </span>
            <span>
              {ticketNumber}개 x {price} ={totalPrice}원
            </span>
          </div>
        </Item>

        <Item>
          <EditText
            ref={userNameInput}
            name="customerName"
            hint={"구매자 성함"}
            onChange={handleChangeCustomerState}
            whatType={"text"}
          />
          <div />
          <EditText
            ref={userEmailInput}
            name="customerEmail"
            hint={"티켓 받으실 이메일"}
            onChange={handleChangeCustomerState}
            whatType={"email"}
          />
          <div />
          <EditText
            ref={userPhoneInput}
            name="customerPhone"
            hint={"010-xxxx-xxxx"}
            onChange={handleChangeCustomerState}
            whatType={"number"}
          />
          <div />
          <select onChange={onChangePaymentType}>
            <option value={"creditCard"}>신용카드</option>
            <option value={"accountTransfer"}>무통장결제</option>
          </select>
          <div />
          <Button text={"결제하기"} isVisible={true} onClick={buyTicket} />
        </Item>
      </Stack>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        alignItems="center" // 요소들을 세로 방향 중앙 정렬
        justifyContent="center" // 요소들을 가로 방향 중앙 정렬
      >
        <span>{explanation}</span>
      </Stack>
    </>
  );
};
export default BuyingTicket;
