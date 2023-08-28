import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CreatePostVacation from "../../components/createPostVacation/CreatePostVacation";

import "./vacation.scss";
import { useGlobalSearch } from "../../context/Search&Notification";
import Introduces from "../../components/introduces/Introduce";
import MemberVacation from "./MemberVacation";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import customFetch from "../../utils/url";
import PostsVacation from "./PostsVacation";
import { ToastContainer } from "react-toastify";

const Vacation = () => {
  const { openIntroduce, openImageVacation } = useGlobalSearch();
  const z = useParams(); // id của vacation
  const idVacation = z.id; // id của vacation

  const { data, isLoading } = useQuery({
    queryKey: ["vacation"],
    queryFn: () => customFetch.get(`/vacations/${idVacation}`),
  });
  // console.log(data);

  if (!data) {
    return null;
  }

  const dataVacation = data.data.data[0];
  console.log(dataVacation);

  return (
    <div className="vacation">
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
      <div className="introduce">
        <img src={dataVacation.vacation_avatar} alt="123" />
        <div className="overlay"></div>
        <div className="detail">
          <img src={dataVacation.vacation_avatar} alt="123" />

          <div className="topic">
            <div className="name">{dataVacation.vacation_name}</div>
            <div className="something">{dataVacation.vacation_description}</div>
          </div>
        </div>
      </div>
      <div className="detailVacation">
        <div className="postVacation">
          <CreatePostVacation dataVacation={dataVacation} />
          <PostsVacation dataVacation={dataVacation} />
          <Introduces dataVacation={dataVacation} />
          <MemberVacation dataVacation={dataVacation} />
        </div>
        <div className="rightVacation">
          <div className="member">
            <div className="topDetail">
              <span className="title">Giới thiệu</span>
              <span className="detail">{dataVacation.vacation_intro}</span>
            </div>
            <div className="bottonDetail">
              {dataVacation.audience == 0 ? (
                <>
                  {" "}
                  <div className="item">
                    <div className="icon">
                      <PublicOutlinedIcon />
                    </div>
                    <div className="detail">
                      <span className="title"> Công khai</span>
                      <span className="nd">
                        Bất kì ai cũng có thể thấy mọi người trong nhóm và những
                        bài đăng
                      </span>
                    </div>
                  </div>
                  <div className="item">
                    <div className="icon">
                      <VisibilityOutlinedIcon />
                    </div>

                    <div className="detail">
                      <span className="title"> Hiển thị</span>
                      <span className="nd">
                        Ai cũng có thể tìm thấy nhóm này
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div className="item">
                    <div className="icon">
                      <PublicOutlinedIcon />
                    </div>
                    <div className="detail">
                      <span className="title"> Riêng tư</span>
                      <span className="nd">
                        Chỉ thành viên mới nhìn thấy mọi người trong nhóm và
                        những bài đăng
                      </span>
                    </div>
                  </div>
                  <div className="item">
                    <div className="icon">
                      <VisibilityOutlinedIcon />
                    </div>

                    <div className="detail">
                      <span className="title"> Hiển thị</span>
                      <span className="nd">
                        Chỉ thành viên mới có thể tìm thấy nhóm này
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="more" onClick={openIntroduce}>
              <span>Tìm hiểu thêm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vacation;
