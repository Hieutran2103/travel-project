import { useGlobalPage } from "../../context/Page";
import "./button.scss";

const Button = () => {
  const { handleNextPage } = useGlobalPage();

  return (
    <div className="NextPage">
      <div className="buttonNextPage">
        <a
          href="#createPosts"
          onClick={handleNextPage}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          See more
        </a>
      </div>
    </div>
  );
};

export default Button;
