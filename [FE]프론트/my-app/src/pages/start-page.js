import { Link } from "react-router-dom";
import { SStartPageWrapper, SStartButton, SLogoImage, SStartImage } from '../styles/pages/SStartPage';


const StartPage = () => {
  
  return (
    <SStartPageWrapper>
      <SLogoImage src={process.env.PUBLIC_URL + "/logo.png"} alt="placeholder" />
      <Link style={{ textDecoration: "none" }} to={`/IntroPage`}>
        <SStartButton>GO&nbsp;{">"}</SStartButton>
      </Link>
      <SStartImage src={process.env.PUBLIC_URL + "/startimg1.png"} alt="placeholder" />
      <SStartImage src={process.env.PUBLIC_URL + "/startimg2.png"} style={{ left : "-600px" , top : "-700px"}} alt="placeholder" />

    </SStartPageWrapper>
  );
};

export default StartPage;
