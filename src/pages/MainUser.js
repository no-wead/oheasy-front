// 추후 useEffect로 초기 설정하기
import { useEffect } from "react";

import mainAdBanner from "../assets/mainAdBanner.png";
import PosterItem from "../components/PosterItem";
import "../styles/MainUser.css";
import Button from "@mui/material/Button";
import * as React from "react";

// api
import { ongetAllExhibitsHandler } from "../apis/servicehandeler/AdminApiHandler";

// 사진
import author from "../assets/author.png";
// 레이아웃
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

// 상위 3개 노출
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

// 사진움직이기
import CustomCarouselForMain from "../libs/CustomeCarouselForMain";
import { mainCarouselImage } from "../util/Images";

// 작가 사업자 로그인하러 가기 카드이미지
import ParticipateCard from "../libs/ParticipateCard";
import { cardImg } from "../util/Images";

// 전시 보이기
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import PosterForMain from "../components/PosterForMain";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Carousel } from "react-bootstrap";

import quotation from "../assets/quotation.png";
import author3 from "../assets/author3.jpg";
import gian from "../assets/gian.jpg";
import kimuj from "../assets/kimuj.jpg";

// stack 배치 사용
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// 추후 무한 스크롤로 변경
const MainUser = () => {
  const [mockData, setMockData] = useState([{}]); // 받는 형식이 배열 안 객체라
  const [visibleData, setVisibleData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const nav = useNavigate();

  // 아이템 상세 보기 api
  const handleItemInfo = (exhibitId) => {
    console.log("exhibitId" + exhibitId);
    nav(`/exhibititeminfo/${exhibitId}`, { state: { exhibitId } });
  };

  useEffect(() => {
    ongetAllExhibitsHandler((response) => {
      if (Array.isArray(response.data)) {
        setMockData(response.data);
        setVisibleData(mockData.slice(0, 3));
      } else {
        console.error("응답 데이터가 배열이 아닙니다.");
      }
    });
  }, []);
  useEffect(() => {
    setVisibleData(mockData.slice(0, 3));
  }, [mockData]);

  useEffect(() => {
    console.log("*********************************");
    console.log(visibleData);
  }, [visibleData]);

  const handleShowAll = () => {
    setVisibleData(mockData);
    setShowAll(true); // 전체 데이터가 표시되고 있음을 상태로 관리
  };

  const goWooriBank = () => {
    const url =
      "https://pc.wooricard.com/dcpc/yh1/crd/crd01/H1CRD101S02.do?cdPrdCd=102534&canvasser=88804648&utm_source=pc_google&utm_medium=card&utm_campaign=credit&utm_content=DA@%EC%B9%B4%EB%93%9C%EC%9D%98%EC%A0%95%EC%84%9D%E2%85%A1&utm_term=%EC%9A%B0%EB%A6%AC%EC%B9%B4%EB%93%9Cda&gclid=Cj0KCQjw0MexBhD3ARIsAEI3WHLGBO7mkYUjUuDa9Kp0KTFMx3_k_IenEW1FUeSCdf-hYrMlaP3oCs4aAo-gEALw_wcB/";
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const formatDate = (date) => {
    return String(date).replace(/-/g, ".");
  };

  return (
    <div style={{ width: "70%", textAlign: "center", margin: "auto" }}>
      <React.Fragment>
        <CssBaseline />
        <Container style={{ padding: "0 0", maxWidth: "100%", height: "100%" }}>
          <CustomCarouselForMain>
            {mainCarouselImage.map((image, index) => {
              return (
                <img
                  key={index}
                  src={image.imgURL}
                  alt={image.imgAlt}
                  style={{ maxWidth: "auto" }}
                />
              );
            })}
          </CustomCarouselForMain>
          <Stack
            direction={"row"}
            sx={{
              marginTop: 6, // 40px, MUI의 spacing system 사용
              justifyContent: "space-between", // 요소들을 양 끝으로 분산 배치
            }}
          >
            <span
              style={{ textAlign: "left", fontWeight: "bold", fontSize: 24 }}
            >
              전시 Exhibits
            </span>
            {!showAll && (
              <Button
                color="inherit"
                size="small"
                onClick={handleShowAll}
                style={{ color: "gray", alignContent: "flex-end" }} // 비활성화 상태에서 회색으로 설정
              >
                {"전시 모두 보기 >"}
              </Button>
            )}
          </Stack>
        </Container>
        <div className="line" style={{ marginTop: 15 }}></div>
        <Container style={{ width: "100%", padding: "0 0" }}>
          <Box sx={{ bgcolor: "#00000000", height: "100%", marginTop: 5 }}>
            {/* 추천 리스트 */}
            {/* <Stack
              justifyContent="center" // 가로 방향으로 중앙 정렬
              alignItems="center" // 세로 방향으로 중앙 정렬
              style={{ height: "100vh" }}
            >
              <ImageList
                sx={{ maxWidth: 1000, height: 500, overflowY: "hidden" }}
                cols={3}
              >
                {mockData2.map((item) => {
                  return (
                    <PosterForMain
                      key={item.id}
                      {...item}
                      date={item.createdDate}
                      whatType={"user"}
                    />
                  );
                })}
              </ImageList>
            </Stack> */}

            {/* 모든리스트 */}
            <Stack
              justifyContent="center" // 가로 방향으로 중앙 정렬
              alignItems="center" // 세로 방향으로 중앙 정렬
              style={{ marginTop: 0, width: "100%" }}
            >
              <ImageList
                sx={{ maxWidth: "100%", height: "auto", overflowY: "hidden" }}
                cols={3}
                gap={100} // 이미지 사이의 간격 설정
              >
                {visibleData.map((item) => (
                  <ImageListItem
                    key={item.exhibitId}
                    onClick={() => handleItemInfo(item.exhibitId)}
                    style={{
                      height: 480,
                      display: "inline",
                      lexDirection: "column", // 자식 요소를 세로 방향으로 정렬
                      justifyContent: "center", // 세로 방향 중앙 정렬
                    }}
                  >
                    <img
                      src={Array.isArray(item.urls) ? item.urls[0] : "없음"}
                      alt={item.name}
                      loading="eager"
                      style={{
                        width: 281,
                        height: 400,
                        objectFit: "cover",
                      }} // 모든 이미지가 동일한 가로 길이를 가지도록 가로 너비를 100%로 설정
                    />
                    <ImageListItemBar
                      title={
                        <>
                          <span
                            style={{
                              fontWeight: "bold",
                              fontSize: "15px",
                              textAlign: "left", // 왼쪽 정렬
                              display: "block", // span을 블록 요소로 만들어 줄 전체를 차지하게 함
                              width: "100%", // 너비 100%로 설정
                            }}
                          >
                            {/* {item.city } */}
                          </span>
                          <div></div>
                          <span
                            style={{
                              width: 281,
                              fontWeight: "bold",
                              fontSize: "24px",
                              textAlign: "left", // 왼쪽 정렬
                              display: "block", // span을 블록 요소로 만들어 줄 전체를 차지하게 함
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {item.name}
                          </span>
                        </>
                      }
                      subtitle={
                        <div style={{ marginTop: 10 }}>
                          <span
                            style={{
                              color: "gray",
                              fontSize: "15px",
                              textAlign: "left", // 왼쪽 정렬
                              display: "block", // span을 블록 요소로 만들어 줄 전체를 차지하게 함
                              width: "100%", // 너비 100%로 설정
                            }}
                          >
                            {formatDate(item.startDate) +
                              "~" +
                              formatDate(item.endDate)}
                          </span>
                        </div>
                      }
                      position="below"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Stack>

            {/* <section className="py-0" id="howitworks" style={{ marginTop: 30 }}>
              <div className="container">
                <hr className="mt-6"></hr>
                <div className="row">
                  <div className="col-12">
                    <p className="text-center"> You post, We exhibit.</p>
                    <h1 className="text-center lh-sm fs-lg-6 fs-xxl-7">
                      전시주최에 관심 있으신가요?
                    </h1>
                  </div>
                </div>
                <div className="row mt-6">
                  <div
                    className="col-12 col-md-4 d-flex flex-column align-items-center"
                    style={{ paddingRight: 60, paddingLeft: 60, marginTop: 30 }}
                  >
                    <div className="badge badge-circle bg-soft-primary flex-center">
            {/* <div
                        className="text-primary fs-7 font-base"
                        style={{
                          color: "black",
                          fontSize: "30px",
                        }}
                      >
                        1
                      </div> */}
            {/* </div>
                    <h5 className="text-primary text-center mt-3">
                      사업자로
                      <br /> 가입해보세요.
                    </h5>
                    <p className="text-center mx-xl-7">
                      사업자로 가입하여 <br /> 수많은 작품과 공간을
                      <br /> 둘러보세요.
                    </p>
                  </div>
                  <div
                    className="col-12 col-md-4 d-flex flex-column align-items-center"
                    style={{ paddingRight: 60, paddingLeft: 60, marginTop: 30 }}
                  >
                    <div className="badge badge-circle bg-soft-warning flex-center"> */}
            {/* <div
                        className="text-warning fs-7 font-base"
                        style={{
                          fontSize: "30px",
                        }}
                      >
                        2
                      </div> */}
            {/* </div>
                    <h5 className="text-primary text-center mt-3">
                      작품 혹은 공간을
                      <br /> 소개해보세요.
                    </h5>
                    <p className="text-center mx-xl-7">
                      소개도 하고 <br /> 맘에 드는 작품과 공간에 <br /> 제안을
                      보내보세요.
                    </p>
                  </div>
                  <div
                    className="col-12 col-md-4 d-flex flex-column align-items-center"
                    style={{ paddingRight: 60, paddingLeft: 60, marginTop: 30 }}
                  >
                    <div className="badge badge-circle bg-soft-success flex-center"> */}
            {/* <div
                        className="text-success fs-7 font-base"
                        style={{
                          fontSize: "30px",
                        }}
                      >
                        3
                      </div> */}
            {/* </div>
                    <h5 className="text-primary text-center mt-3">
                      전시를
                      <br /> 열어보세요.
                    </h5>
                    <p className="text-center mx-xl-7">
                      WOORI ATRE가 <br /> 전시의 시작과 끝을
                      <br /> 책임져드립니다.
                    </p>
                  </div>
                </div>
              </div>
            </section> */}

            {/* <div class="gray-line" style={{ marginTop: 30 }}></div> */}

            {/* <section
              className="pb-7 pt-5"
              id="testimonial"
              style={{ marginBottom: 30 }}
            >
              <div className="container-xxl">
                <div className="row flex-center h-100">
                  <div className="col-12">
                    <Carousel>
                      <Carousel.Item interval={10000}>
                        <div className="row h-100 align-items-center justify-content-around">
                          <div className="col-md-4 col-lg-5 col-xl-4 text-center order-1 d-none d-md-block">
                            <div className="wrapper square shadow-square-top">
                              <img
                                className="rounded-3 mt-4"
                                src={author3}
                                alt="testimonials"
                                width="325"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-6 col-xl-5 mb-4">
                            <img
                              className="img-fluid"
                              src={quotation}
                              alt="testimonials-bg"
                            />
                            <h2 className="my-5">
                              When it comes to both reliability and quality,{" "}
                              <span className="text-primary">ClickR</span> is
                              undoubtedly one of the best services out there.
                              Team was fast and responsible. 5 stars for them!
                            </h2>
                            <h6 className="text-700 fs-lg-0 mb-0">
                              Andrinna Malin
                            </h6>
                            <p className="fw-normal text-700 fs--1">
                              Designer, co-Founder at Nirvana Tech
                            </p>
                          </div>
                        </div>
                      </Carousel.Item>
                      <Carousel.Item interval={5000}>
                        <div className="row h-100 align-items-center justify-content-around">
                          <div className="col-md-4 col-lg-5 col-xl-4 text-center order-1 d-none d-md-block">
                            <div className="wrapper square shadow-square-top">
                              <img
                                className="rounded-3 mt-4"
                                src={gian}
                                alt="testimonials"
                                width="325"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-6 col-xl-5 mb-4">
                            <img
                              className="img-fluid"
                              src={quotation}
                              alt="testimonials-bg"
                            />
                            <h2 className="my-5">
                              When it comes to both reliability and quality,{" "}
                              <span className="text-primary">ClickR</span> is
                              undoubtedly one of the best services out there.
                              Team was fast and responsible. 5 stars for them!
                            </h2>
                            <h6 className="text-700 fs-lg-0 mb-0">
                              Ainara Vergara,
                            </h6>
                            <p className="fw-normal text-700 fs--1">Designer</p>
                          </div>
                        </div>
                      </Carousel.Item>
                      <Carousel.Item interval={3000}>
                        <div className="row h-100 align-items-center justify-content-around">
                          <div className="col-md-4 col-lg-5 col-xl-4 text-center order-1 d-none d-md-block">
                            <div className="wrapper square shadow-square-top">
                              <img
                                className="rounded-3 mt-4"
                                src={kimuj}
                                alt="testimonials"
                                width="325"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-6 col-xl-5 mb-4">
                            <img
                              className="img-fluid"
                              src={quotation}
                              alt="testimonials-bg"
                            />
                            <h2 className="my-5">
                              When it comes to both reliability and quality,{" "}
                              <span className="text-primary">ClickR</span> is
                              undoubtedly one of the best services out there.
                              Team was fast and responsible. 5 stars for them!
                            </h2>
                            <h6 className="text-700 fs-lg-0 mb-0">
                              Niek Bove,
                            </h6>
                            <p className="fw-normal text-700 fs--1">
                              Senior Developer
                            </p>
                          </div>
                        </div>
                      </Carousel.Item>
                    </Carousel>
                  </div>
                </div>
              </div>
            </section> */}

            {/* 문구배너  */}
            {/* <img
              onClick={() => {
                goWooriBank();
              }}
              src={mainAdBanner}
              style={{
                width: "100% ",
                height: 220,
                display: "block",
                marginBottom: 20,
                marginTop: 70,
              }}
              alt="Responsive image"
            /> */}
          </Box>
        </Container>
      </React.Fragment>

      {/* {mockData.map((item) => (
        <PosterItem
          key={item.id}
          {...item}
          date={item.createdDate}
          whatType={"user"}
          isVisible={false}
        />
      ))} */}
    </div>
  );
};
export default MainUser;
