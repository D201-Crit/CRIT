import { Link } from "react-router-dom";
import { SStartPageWrapper, SStartButton,SStartImage3, SLogoImage, SStartImage } from '../styles/pages/SStartPage';


const StartPage = () => {
  
  return (
    <div>


    <SStartPageWrapper>
    <SStartImage3 src={process.env.PUBLIC_URL + "/startimg1.png"} alt="placeholder" />

      <SLogoImage src={process.env.PUBLIC_URL + "/logo.png"} alt="placeholder" />
      <Link style={{ textDecoration: "none" }} to={`/IntroPage`}>
        <SStartButton>GO&nbsp;{">"}</SStartButton>
      </Link>

    </SStartPageWrapper>
    </div>

  );
};

export default StartPage;
