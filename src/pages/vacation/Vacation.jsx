import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CreatePostVacation from "../../components/createPostVacation/CreatePostVacation";
import Posts from "../../components/posts/Posts";
import "./vacation.scss";

const Vacation = () => {
  const images = [
    {
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    },
    {
      img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      img: "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
  ];
  return (
    <div className="vacation">
      <div className="introduce">
        <img
          src="https://images.unsplash.com/photo-1542114740389-9b46fb1e5be7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80"
          alt="123"
        />
        <div className="overlay"></div>
        <div className="detail">
          <img
            src="https://images.unsplash.com/photo-1542114740389-9b46fb1e5be7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80"
            alt="123"
          />

          <div className="topic">
            <div className="name">Singapore</div>
            <div className="something">
              Singapore is a small island nation located in the southern part of
              the Malay Peninsula in Southeast Asia. Despite its small size,
              Singapore is known as a modern, booming country with a strong
              economy and advanced infrastructure.
            </div>
          </div>
        </div>
      </div>
      <div className="detailVacation">
        <div className="postVacation">
          <CreatePostVacation />
          {/* <Posts /> */}
        </div>
        <div className="rightVacation">
          <div className="member">
            <div className="topDetail">
              <span className="title">Giới thiệu</span>
              <span className="detail">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab,
                ipsam? Modi, possimus magnam minus fugit earum eius voluptas
                deleniti provident optio obcaecati debitis{" "}
              </span>
            </div>

            <div className="bottonDetail">
              <div className="item">
                <div className="icon">
                  <PublicOutlinedIcon />
                </div>
                <div className="detail">
                  <span className="title"> Công khai</span>
                  <span className="nd">
                    Bất kì ai cũng có thể thấy mọi người trong nhóm và những bài
                    đăng
                  </span>
                </div>
              </div>
              <div className="item">
                <div className="icon">
                  <VisibilityOutlinedIcon />
                </div>

                <div className="detail">
                  <span className="title"> Hiển thị</span>
                  <span className="nd">Ai cũng có thể tìm thấy nhóm này</span>
                </div>
              </div>
            </div>
            <div className="more">
              <span>Tìm hiểu thêm</span>
            </div>
          </div>
          <div className="imageVacation">
            <div className="title">Ảnh được chia sẻ</div>
            <div className="post">
              {images.map((image) => {
                return (
                  <div className="image" key={1}>
                    <img src={image.img} alt="" />
                  </div>
                );
              })}
            </div>
            <div className="more">
              <span>Xem tất cả</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vacation;
