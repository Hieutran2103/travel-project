import { ToastContainer } from "react-toastify";
import CreatePost from "../../components/createPost/createPost";
import Posts from "../../components/posts/Posts";
import "./home.scss";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  return (
    <div className="home">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <CreatePost />
      <Posts />
    </div>
  );
};

export default Home;
