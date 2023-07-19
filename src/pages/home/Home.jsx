import CreatePost from "../../components/createPost/createPost";
import Posts from "../../components/posts/Posts";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <CreatePost />
      <Posts />
    </div>
  );
};

export default Home;
