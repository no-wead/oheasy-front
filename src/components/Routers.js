import { Route, Routes } from "react-router-dom";
import BusinessItemInfo from "../pages/BusinessItemInfo";
import BuyingResult from "../pages/BuyingResult";
import BuyingTicket from "../pages/BuyingTicket";
import ExhibitItemInfo from "../pages/ExhibitItemInfo";
import FindIdBusiness from "../pages/FindIdBusiness";
import FindIdUser from "../pages/FindIdUser";
import FindPassBusiness from "../pages/FindPassBusiness";
import FindPassUser from "../pages/FindPassUser";
import LoginAuthor from "../pages/LoginAuthor";
import LoginBusiness from "../pages/LoginBusiness";
import LoginSpace from "../pages/LoginSpace";
import LoginUser from "../pages/LoginUser";
import MainUser from "../pages/MainUser";
import MypageUser from "../pages/MypageUser";
import Signupbusiness from "../pages/SignupBusiness";
import SignupUser from "../pages/SignupUser";
import ApplyWithItems from "../pages/apply/ApplyWithItems";
import MainBusiness from "../pages/main/MainBusiness";
import AuthorMyPage from "../pages/mypage/AuthorMyPage";
import AuthorEditItem from "../pages/mypage/AuthorEditItem";
import SpaceMyPage from "../pages/mypage/SpaceMyPage";
import LoginAdmin from "../pages/admin/LoginAdimin";
import MainAdmin from "../pages/admin/MainAdmin";
import ResetPassBusiness from "../pages/login/ResetPassBusiness";
import ResetPassUser from "../pages/login/ResetPassUser";

// 페이지 이동 경로는 여기에만 작성하기
// 주의 : url 경로는 소문자만 작성하기
const Routers = () => {
  return (
    <>
      <Routes>
        {/* 메인 */}
        <Route path="/" element={<MainUser />} />
        <Route path="/mainuser" element={<MainUser />} />
        <Route path="/mainbusiness" element={<MainBusiness />} />

        {/* 유저페이지 */}
        <Route path="/findiduser" element={<FindIdUser />} />
        <Route path="/findpassuser" element={<FindPassUser />} />
        <Route path="/mypageuser" element={<MypageUser />} />
        <Route path="/exhibititeminfo/:id" element={<ExhibitItemInfo />} />
        <Route path="/buyingticket" element={<BuyingTicket />} />
        <Route path="/buyingresult" element={<BuyingResult />} />

        {/* 회원가입 */}
        <Route path="/signupuser" element={<SignupUser />} />
        <Route path="/signupbusiness" element={<Signupbusiness />} />

        {/* 로그인 */}
        <Route path="/loginuser" element={<LoginUser />} />
        <Route path="/loginauthor" element={<LoginAuthor />} />
        <Route path="/loginbusiness" element={<LoginBusiness />} />
        <Route path="/loginspace" element={<LoginSpace />} />

        {/* id, pw찾기 */}
        <Route path="/findiduser" element={<FindIdUser />} />
        <Route path="/findidbusiness" element={<FindIdBusiness />} />

        <Route path="/findpwuser" element={<FindPassUser />} />
        <Route path="/findpwbusiness" element={<FindPassBusiness />} />
        <Route path="/resetpwbusiness" element={<ResetPassBusiness />} />

        <Route path="/resetpwbusiness" element={<ResetPassBusiness />} />
        <Route path="/resetpwuser" element={<ResetPassUser />} />

        {/* 사업자 아이템(작가, 사업자 둘다) 자세히보기 */}
        <Route path="/businessiteminfo/:id" element={<BusinessItemInfo />} />
        {/*  사업자들끼리 신청하기 */}
        <Route path="/applywithitems/:id" element={<ApplyWithItems />} />

        {/* 마이페이지 */}
        <Route path="/authormypage" element={<AuthorMyPage />} />
        <Route path="/spacemypage" element={<SpaceMyPage />} />
        {/* 작가 아이템수정 */}
        <Route path="/authoredititem/:id" element={<AuthorEditItem />} />

        {/* 관리자 페이지 */}
        <Route path="/loginadmin" element={<LoginAdmin />} />
        <Route path="/mainadmin" element={<MainAdmin />} />
      </Routes>
    </>
  );
};
export default Routers;
