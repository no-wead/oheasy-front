import { useNavigate } from "react-router-dom";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AdminMatchingList from "../../components/admin/AdminMatchingList";
import AdminItmeList from "../../components/admin/AdminItemList";

// 이미지 라이브러리
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ImageList from "@mui/material/ImageList";

import Stack from "@mui/material/Stack";

import author from "../../assets/author.png";
import { useState } from "react";

import BootModalForAdmin from "../../libs/BootModalForAdmin";
import AdminExhibitList from "../../components/admin/AdminExhibitList";

import MuiDialog from "../../libs/MuiDialog";
import { useEffect } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const MainAdmin = () => {
  const [modalShow, setModalShow] = useState(false);
  const [value, setValue] = useState(0);

  const [enableDialog, setEnableDialog] = useState(false); //  다이어로그

  // 유효한 회원인지 확인
  useEffect(() => {
    let userType = localStorage.getItem("userType");
    if (userType !== "admin") {
      setEnableDialog(true);
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      style={{
        width: "96%",

        marginTop: 50,
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: "100%",
          width: "94%",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: "divider",
            marginLeft: 12,
            width: "230px", // Tabs 너비 고정
            minWidth: "250px", // 최소 너비 설정
            marginLeft: 34,
            borderColor: "black",
            ".MuiTab-root": {
              // 모든 탭에 적용되는 기본 스타일
              color: "gray",
              display: "flex",
              alignItems: "flex-start",
            },
            ".Mui-selected": {
              // 선택된 탭에만 적용되는 스타일
              color: "black !important", // 선택된 탭의 글자색을 검정으로 설정
              fontWeight: "bold", // 글자를 굵게
            },
            ".MuiTabs-indicator": {
              // 선택된 탭을 나타내는 하단 바의 스타일
              backgroundColor: "black", // 하단 바의 색을 검정으로 설정
              display: "none", // 하단 바를 보이지 않도록 설정
            },
          }}
        >
          <Tab   style={{ fontSize: "20px", margin: "10px 0" }} label="매칭관리" {...a11yProps(0)} />
          <Tab
              style={{ fontSize: "20px", margin: "10px 0" }}
            label="아이템승인 "
            {...a11yProps(1)}
          />
          <Tab   style={{ fontSize: "20px", margin: "10px 0" }} label="전시정보" {...a11yProps(2)} />
        </Tabs>

        <TabPanel
          value={value}
          index={0}
          style={{
            display: "flex",
            flexDirection: "column",

            marginBottom: 180,

            height: "100%", // 필요한 높이 지정
            width: "100%", // 필요한 너비 지정
          }}
        >
          <span style={{ fontWeight: "bold", fontSize: "25px" }}>매칭관리</span>
          <div />
          <AdminMatchingList />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <span style={{ fontWeight: "bold", fontSize: "25px" }}>
            공간 아이템
          </span>
          <AdminItmeList />
          {/* 개인정보 수정 */}
        </TabPanel>

        <TabPanel value={value} index={2}>
          <span style={{ fontWeight: "bold", fontSize: "25px" }}>전시정보</span>
          <AdminExhibitList />
        </TabPanel>
      </Box>
      {enableDialog && (
        <MuiDialog
          title={"알림"}
          content={"접근 불가능한 페이지입니다."}
          result={true}
          page={"goUserMain"}
          parentClick={setEnableDialog}
        />
      )}
    </div>
  );
};
export default MainAdmin;
