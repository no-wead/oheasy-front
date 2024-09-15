import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "../styles/ExhibitItemInfo.css";
import { useLocation, useParams } from "react-router-dom";
import image1 from "../assets/image 1.png";
import { useNavigate } from "react-router-dom";
import CustomCarousel from "../libs/CustomCarousel";

// + - 아이콘
import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Tooltip from "@mui/material/Tooltip";
// 배치
import Stack from "@mui/material/Stack";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Payment from "../payment";

// 구매 다이어로그로 넘김
import { BuyingDialog } from "../libs/ScrollDialog";

// api
import { onGetExhibitInfoHandler } from "../apis/servicehandeler/AdminApiHandler";

const ExhibitItemInfo = () => {
  const nav = useNavigate();
  const uselocation = useLocation();
  const { exhibitId } = uselocation.state; // from mainuser.js

  const [exhibitInfoState, setExhibitInfoState] = useState({
    name: "", // 전시명
    intro: "", // 전시소개
    startDate: "", // 시작날짜
    endDate: "", // 끝날짜
    artistName: "", // 직가명
    hostName: "", // 주최자명
    price: "", // 가격
    address: "", // 주소
    urls: [],
  });

  useEffect(() => {
    console.log("전시정보 불러오기 useEffect");

    console.log("전시 modal id " + exhibitId);
    onGetExhibitInfoHandler({ exhibitId: exhibitId }, (response) => {
      console.log(response);
      setExhibitInfoState((prevState) => ({
        name: response.data.name, // 전시명
        intro: response.data.intro, // 전시소개
        startDate: response.data.startDate, // 시작날짜
        endDate: response.data.endDate, // 끝날짜
        artistName: response.data.artistName, // 직가명
        hostName: response.data.hostName, // 주최자명
        price: response.data.price, // 가격
        address: response.data.city, // 주소
        urls: response.data.urls,
      }));
    });
  }, []);

  // 예매할 티켓 수
  const [ticketNumber, setTicketNumber] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0); // 총 가격 상태
  const param = useParams(); // parameter 번호, post번호

  useEffect(() => {
    setTotalPrice(ticketNumber * exhibitInfoState.price); // 총 가격 계산 후 상태 업데이트
  }, [ticketNumber]); // ticketNumber가 변경될 때마다 이 효과를 재실행

  const plusTicket = () => {
    if (ticketNumber + 1 < 500) {
      setTicketNumber((ticketNumber) => ticketNumber + 1);
    }
  };

  const minusTicket = () => {
    if (ticketNumber - 1 >= 0) {
      setTicketNumber((ticketNumber) => ticketNumber - 1);
    }
  };

  return (
 
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="100%" sx={{ display: "flex"}}>
         
          <Box
          sx={{
            width: "70%", // Box의 너비를 전체의 80%로 설정
            height: "100%",
           
          
            marginX: "auto", // 좌우 마진을 auto로 설정하여 중앙 정렬
          }}
        >


<Stack
            spacing={10}
            direction="row"
            sx={{
              marginTop:5,
              display: "flex",
              justifyContent: "space-between", // 요소들을 양쪽 끝으로 정렬
              width: "100%", // Stack의 너비를 Box와 같게 100%로 설정
            }}
          >
          <CustomCarousel isInfo={true}>
            {exhibitInfoState.urls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Image ${index}`}
                style={{
                
                  height: 576,
                  objectFit: "cover",
                }}
              />
            ))}
          </CustomCarousel>
            
        
        

          
              <div   style={{ width: "60%", height: "100%" }}>
              <Stack spacing={0}>
                  <h1 style={{ fontSize: 36, fontWeight: 'bold' }}>{exhibitInfoState.name}</h1>
             
                {/* <br></br>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="selector-item1">
                  <div className="label">작가이름</div>
                </div>
                <span className="value" style={{ marginLeft: '10px' }}>{exhibitInfoState.artistName}</span>
                </div>
                <br></br>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="selector-item2">
                  <div className="label">주최자</div>
                </div>
                  <span className="value" style={{ marginLeft: '10px' }}>{exhibitInfoState.hostName}</span>
                </div> */}
               
                <Stack direction={"row"} spacing={0} style={{marginTop:8}}>
            
                <br></br>
                  <span style={{fontWeight:"bold"}}>관람장소</span>
            
                  <span className="value" style={{ marginLeft: '15px' }}>{exhibitInfoState.address}</span>
              
                </Stack>
                <br></br>
                <Stack direction={"row"} spacing={0}>
              
                  <span style={{fontWeight:"bold"}} >관람기간 </span>
              
                <span className="value" style={{ marginLeft: '15px', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    {exhibitInfoState.startDate +
                      "~" +
                      exhibitInfoState.endDate}
                  </span>
                </Stack>





                <br></br>

                <Stack direction={"row"} spacing={0}>
                
                  <span style={{fontWeight:"bold"}} >관람료 </span>
              
                  <span  style={{ marginLeft: '15px' }}>{exhibitInfoState.price}원</span>
       </Stack>





                <br></br>
               
                  {/* <div style={{ marginBottom: 20 }}>
                    <span>총 결제 금액 : </span>
                    <span>
                      {ticketNumber}개 x {exhibitInfoState.price} ={totalPrice}
                      원
                    </span>
                  </div>
                  <div class="gray-line" style={{ maxWidth: 40, marginTop: 100 }}></div>
                    <h2 style={{ marginTop: 20 }}>전시 소개 </h2>
                  <div class="gray-line" style={{ maxWidth: 40 }}></div> */}
                  <span>

                    {exhibitInfoState.intro}
                  </span>
             
                
                  <Stack
  direction="row"
  spacing={2}
  style={{
    position: "relative", // 버튼을 뷰포트에 고정
    marginTop: 100,
    borderRadius: "0",
    display: "flex",
    alignItems: "center", // 여기에 alignItems을 추가
  
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
   
    float: "right", // 버튼을 왼쪽으로 정렬
  }}
>
                    <Tooltip title="Minus">
                      <IconButton onClick={minusTicket}>
                        <RemoveIcon />
                      </IconButton>
                    </Tooltip>
                    <span style={{alignItems:"center"}}>{ticketNumber}</span>
                    <Tooltip title="Plus">
                      <IconButton onClick={plusTicket}>
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                    <Payment
                    exhibitId={exhibitId}
                    exhibitName={exhibitInfoState.name}
                    ticketNumber={ticketNumber}
                    ></Payment>
                  </Stack>
            
                </Stack>
              </div>
          
            </Stack>
            </Box>
         

          {/* 구분선 */}
        </Container>
      </React.Fragment>

  );
};
export default ExhibitItemInfo;
