import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Exhibits from "../../components/Exhibits";
import ModifyAuthorInfo from "../../pages/mypage/ModifyAuthorInfo";
import Matching from "../../components/business/Matching";
// import MyPosterForBusiness from "../../components/business/MyPosterForBusiness";
import WithDrawalUser from "../../components/user/Withdrawal";
import { Business } from "@mui/icons-material";
import BusinessItem from "../../components/business/BusinessItem";
import BusinessItemList from "../../components/business/BusinessItemList";

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

const AuthorMyPage = () => {
  const [value, setValue] = React.useState(0);
  const [enableDialog, setEnableDialog] = React.useState(false); //  다이어로그
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 유효한 회원인지 확인
  useEffect(() => {
    let userType = localStorage.getItem("userType");
    if (userType !== "author") {
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
            {/* <MyPosterForBusiness whatType={"author"} /> */}
            <BusinessItemList whatType={"author"} />
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

          <TabPanel
            value={value}
            index={2}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <ModifyAuthorInfo />
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
export default AuthorMyPage;
