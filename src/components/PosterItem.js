import Button from "./Button";
import { useNavigate } from "react-router-dom";
import ButtonBoot from "react-bootstrap/Button";
// 스크롤다이어로그
import ScrollDialog from "../libs/ScrollDialog";
import AuthorEditItem from "../pages/mypage/AuthorEditItem";

// 이미지 라이브러리
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { LocalizationProvider } from "@mui/x-date-pickers";
// 메인에 띄어지는 각 아이템 컴포넌트
// isVisible은 마이페이지 = true , 메인이면 false로
// whatType은 유저, 작가, 공간대여자 나누는거 \
// id 는 posterid
// isDialog는 작가 공간대여자가 신청할 때 자기 물건 자세히 보기 정도에 쓰임

import image1 from "../assets/image 1.png";
import axios from "axios";
import MuiDialog from "../libs/MuiDialog";
import { useState } from "react";

const PosterItem = ({
  ticketId,
  url,
  exhibitId,
  amount,
  city,
  ticketNo,
  whatType,
  isVisible,
  isDialog,
  isEditable,
  name,
  setUpdateCount,
  startDate,
  endDate,
  updateCount,
  whatTab,
}) => {
  console.log("ExhibitsItem 유저 타입" + whatType);
  console.log("시작" + startDate + endDate);
  const nav = useNavigate();
  const [enableDialog, setEnableDialog] = useState(false); //  다이어로그
  const [enableDialog2, setEnableDialog2] = useState(false); //  다이어로그
  const cancelTicket = async () => {
    if (window.confirm("취소하시겠습니까?")) {
      console.log("취소o");
      const refund = await axios.post(
        "https://www.wooriarte.store/api/refund",
        {
          ticketId: ticketId,
          reason: "",
        }
      );
      console.log("환불" + refund);
      console.log(refund.status);
      if (refund.status >= 200 && refund.status < 300) {
        setEnableDialog(true);
        setUpdateCount((prev) => prev + 1);
      } else {
        setEnableDialog2(true);
      }
    } else {
      console.log("취소x.");
    }
  };

  return (
    <div
      onClick={() => {
        // isEditable = true => 마이페이지인 경우
        if (!isEditable) {
          if (isDialog) {
            console.log("PosterItem _isDialog" + isDialog);
          } else {
            // 메인에서 아이템 클릭 시 아이템 상세보기로 이동
            switch (whatType) {
              case "space":
              case "author":
                if (!isVisible)
                  nav(`/businessiteminfo/${exhibitId}`, {
                    state: {
                      posterId: exhibitId,
                      userType: whatType,
                    },
                  }); // 메인엔 예매취소 버튼 보이면 x
                return;

              default: {
                // 유저 경우
                if (!isVisible) nav(`/exhibititeminfo/${exhibitId}`); // 메인엔 예매취소 버튼 보이면 x
                return;
              }
            }
          }
        } else {
          // 작가 공간대여자 마이페이지 수정
          switch (whatType) {
            case "space":
              return;
            case "author":
              // 작가 id도 보내야함
              // nav(`/authoredititem/${id}`); // 메인엔 예매취소 버튼 보이면 x
              return <AuthorEditItem />;
            // case "author":
            //   // 작가 id도 보내야함
            //   nav(`/authoredititem/${id}`, {
            //     state: {
            //       posterId: id,
            //       userType: whatType,
            //     },
            //   }); // 메인엔 예매취소 버튼 보이면 x
            //   return;

            default: {
              return;
            }
          }
        }
      }}
    >
      <div>
        <ImageListItem key={ticketId}>
          <img
            src={url}
            style={{ width: 270, height: 380, objectFit: "cover" }}
          />
          <ImageListItemBar

title={
  <span
    style={{
      fontWeight: "bold",
      fontSize: "18px",
      textAlign: "left", // 왼쪽 정렬
      display: "block", // span을 블록 요소로 만들어 줄 전체를 차지하게 함
      width: "100%", // 너비 100%로 설정
    }}
  >
      {name}
  </span>
}







            subtitle={
             
                    <div
                      style={{
                        display: "flex",
                    
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop:8,
                        width: "80%", // 너비 100%로 설정
                      }}
                    >
                      <span   style={{
                  color: "gray",
              
                    
                  fontSize: "15px",
                  textAlign: "left", // 왼쪽 정렬
                  display: "block", // span을 블록 요소로 만들어 줄 전체를 차지하게 함
               
                }}> 예매수: {amount}</span>
                      {whatTab === 0 && (
                        <ButtonBoot
                          style={{
                            borderColor: "black",
                            color: "black",
                            background: "#FFFFFF",
                            borderRadius: "0",
                            justifyContent: "flex-end",
                            padding: "2px",
                          }}
                          onClick={cancelTicket}
                        >
                          예매취소
                        </ButtonBoot>
                      )}
                      {whatTab === 1 && (
                        <ButtonBoot
                          style={{
                            borderColor: "white",
                            color: "white",
                            background: "#FFFFFF",
                            borderRadius: "0",
                            justifyContent: "flex-end",
                            padding: "2px",
                          }}
                          onClick={cancelTicket}
                        >
                          예매취소
                        </ButtonBoot>
                      )}
                    </div>
                 
                
              
            }
            position="below"
          />
          {/* {isDialog && <ScrollDialog />}  */}
        </ImageListItem>
      </div>
      {enableDialog && (
        <MuiDialog
          title={"알림"}
          content={"환불 완료"}
          result={true}
          page={"login"}
          parentClick={setEnableDialog}
        />
      )}
      {enableDialog2 && (
        <MuiDialog
          title={"알림"}
          content={"환불 실패"}
          result={true}
          page={"login"}
          parentClick={setEnableDialog2}
        />
      )}
    </div>
  );
};
export default PosterItem;
