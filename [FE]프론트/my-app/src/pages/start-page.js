import { Link } from "react-router-dom";

const StartPage = () => {
  return (
    <>
      <h1>StartPage 입니다.</h1>
      <Link to={`/IntroPage`}>
        <button>GO✨</button>
      </Link>
    </>
  );
};

export default StartPage;
