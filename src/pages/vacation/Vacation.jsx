import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CreatePostVacation from "../../components/createPostVacation/CreatePostVacation";
import Posts from "../../components/posts/Posts";

import "./vacation.scss";
import { useGlobalSearch } from "../../context/Search&Notification";
import Introduces from "../../components/introduces/Introduce";
import MemberVacation from "./MemberVacation";

const Vacation = () => {
  const { openIntroduce, openImageVacation } = useGlobalSearch();

  const posts = [
    {
      id: 1,
      name: "John Doe",
      userId: 1,
      profilePic:
        "https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      img: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 2,
      name: "Kien Ngu",
      userId: 2,
      profilePic:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
      desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
    },
    {
      id: 3,
      name: "HieuNongBong",
      userId: 3,
      profilePic:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      img: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    },
    {
      id: 4,
      name: "KienTop8",
      userId: 4,
      profilePic:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      img: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    },
    {
      id: 5,
      name: "Huy Cai",
      userId: 5,
      profilePic:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      img: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    },
    {
      id: 6,
      name: "kiki",
      userId: 6,
      profilePic:
        "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      img: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    },
    {
      id: 7,
      name: "heheee",
      userId: 7,
      profilePic:
        "https://images.unsplash.com/photo-1637664067109-a6a00840d894?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      img: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    },
    {
      id: 8,
      name: "huhu",
      userId: 7,
      profilePic:
        "https://images.unsplash.com/photo-1691531315982-f6bccf4bd875?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      img: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    },
    {
      id: 9,
      name: "vcnawee",
      userId: 7,
      profilePic:
        "https://images.unsplash.com/photo-1690375159022-5f08b2ac9d2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      img: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    },
    {
      id: 10,
      name: "heheee",
      userId: 7,
      profilePic:
        "https://images.unsplash.com/photo-1687360440102-78d15c3e5045?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      img: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    },
    {
      id: 11,
      name: "hieutop1",
      userId: 7,
      profilePic:
        "https://images.unsplash.com/photo-1687360440648-ec9708d52086?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=676&q=80",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      img: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    },
    {
      id: 12,
      name: "caitop2",
      userId: 7,
      profilePic:
        "https://images.unsplash.com/photo-1687360441348-1bb4a85824e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      img: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    },
  ];

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
          <Introduces posts={posts} />
          <MemberVacation posts={posts} />
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
            <div className="more" onClick={openIntroduce}>
              <span>Tìm hiểu thêm</span>
            </div>
          </div>
          {/* <div className="imageVacation">
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
            <div className="more" onClick={openImageVacation}>
              <span>Xem tất cả</span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Vacation;
