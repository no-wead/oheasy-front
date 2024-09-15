import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";

import Matching from "../../components/business/Matching";
import ModifySpaceInfo from "../mypage/ModifySpaceInfo";

// 공간 보이기
import { useContext } from "react";
import image1 from "../../assets/image 1.png";
import BusinessItemList from "../../components/business/BusinessItemList";
import WithDrawalUser from "../../components/user/Withdrawal";

import { loginContext } from "../../App";
import { useEffect } from "react";

import MuiDialog from "../../libs/MuiDialog";

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

const SpaceMyPage = () => {
  const [value, setValue] = React.useState(0);

  const setIsLoginStateState = useContext(loginContext);
  const [enableDialog, setEnableDialog] = React.useState(false); //  다이어로그

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 유효한 회원인지 확인
  useEffect(() => {
    let userType = localStorage.getItem("userType");
    if (userType !== "space") {
      setEnableDialog(true);
    }
  }, []);

  return (
    <div
      className="parentContainer"
      style={{
        width: "70%",
        marginLeft: "15%",
        marginTop: 40,
        marginBottom: 40,
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: "100%",
          width: "auto",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          display="flex"
          onChange={handleChange}
          sx={{
            borderRight: 1,
            borderColor: "black",
            ".Mui-selected": {
              fontWeight: "bold",
              color: "black !important",
            },
            ".MuiTab-root": {
              justifyContent: "center",
              textTransform: "none",
              alignItems: "flex-start",
              padding: "0 0",
              color: "gray",
            },
            flex: 2,
          }}
          TabIndicatorProps={{ style: { display: "none" } }}
        >
          <Tab
            style={{ fontSize: "20px", margin: "10px 0" }}
            label="아이템 관리"
            {...a11yProps(0)}
          />
          <Tab
            style={{ fontSize: "20px", margin: "10px 0" }}
            label="매칭신청 현황"
            {...a11yProps(1)}
          />
          <Tab
            style={{ fontSize: "20px", margin: "10px 0" }}
            label="개인정보 수정"
            {...a11yProps(2)}
          />
          <Tab
            style={{ fontSize: "20px", margin: "10px 0" }}
            label="탈퇴하기"
            {...a11yProps(3)}
          />
        </Tabs>
        <Box sx={{ flex: 8, display: "flex", flexDirection: "column" }}>
          <TabPanel value={value} index={0}>
            {/*todo 사업자용 만들기 아이템관리  */}
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
                    whatType={"space"}
                  />
                );
              })}
            </ImageList>
          </Stack> */}

            <BusinessItemList whatType={"space"} />

            {/* 개인정보 수정 */}
          </TabPanel>
          <TabPanel
            value={value}
            index={2}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 180,
              marginTop: 30,

              height: "200%", // 필요한 높이 지정
              width: "100%", // 필요한 너비 지정
            }}
          >
            <ModifySpaceInfo />
          </TabPanel>
          <TabPanel
            value={value}
            index={1}
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%", // 필요한 높이 지정
              width: "100%", // 필요한 너비 지정
            }}
          >
            <Matching />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <WithDrawalUser />
          </TabPanel>
        </Box>
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
export default SpaceMyPage;
