import { grey } from "@mui/material/colors";
import "../styles/Footer.css";
import instagram from "../assets/instagram.png";
import facebook from "../assets/facebook.png";
import youtube from "../assets/youtube.png";

const CuFooter = () => {
  return (
    <footer>
      <div className="footer-container">
        <div class="left-section">
          <h3 className="footer-logo">WOORI ARTE</h3>
          <p>서울 마포구 월드컵북로 434 상암 IT Tower</p>
          <p>사업자등록번호 663-81-07443</p>
          <p>© 2024 WOORI ARTE. All Rights Reserved. Design by WOORI FISA</p>
        </div>
        <div className="customer-center">
          <p>Customer Center</p>
          <p>T. 02-123-4567</p>
          <p>E. wooriarte@gmail.com</p>
        </div>
        <div className="right-section">
          <img src={instagram}></img>
          <img src={facebook}></img>
          <img src={youtube}></img>
        </div>
      </div>
    </footer>
  );
};
export default CuFooter;
