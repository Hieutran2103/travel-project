import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CreatePostVacation from "../../components/createPostVacation/CreatePostVacation";

import "./vacation.scss";
import { useGlobalSearch } from "../../context/Search&Notification";
import Introduces from "../../components/introduces/Introduce";
import MemberVacation from "./MemberVacation";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils/url";
import PostsVacation from "./PostsVacation";
import { ToastContainer, toast } from "react-toastify";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AutoFixNormalOutlinedIcon from "@mui/icons-material/AutoFixNormalOutlined";
import { useState } from "react";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
const Vacation = () => {
  const { openIntroduce } = useGlobalSearch();
  const z = useParams(); // id của vacation
  const idVacation = z.id; // id của vacation
  const [currentIdVacation, setCurrentIdVacation] = useState(null);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(dataVacation._id);
    setCurrentIdVacation(dataVacation._id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDele = () => {
    setAnchorEl(null);
    DeleteVC();
  };

  const handleImg = (e) => {
    handleEditVC(e.target.files[0]);
  };
  const UpLoadImg = async (e) => {
    try {
      const formData = new FormData();
      formData.append("image", e);
      let res = await customFetch.post("/medias/upload-single-image", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditVC = async (e) => {
    setAnchorEl(null);
    try {
      let imgUrl = await UpLoadImg(e);
      if (imgUrl) {
        console.log(imgUrl);
        await EditVC({
          audience: dataVacation.audience,
          mentions: namesArray,
          vacation_avatar: imgUrl.result,
          vacation_description: dataVacation.vacation_description,
          vacation_intro: dataVacation.vacation_intro,
          vacation_name: dataVacation.vacation_name,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { data } = useQuery({
    queryKey: ["vacation"],
    queryFn: () => customFetch.get(`/vacations/${idVacation}`),
  });

  const queryClient = useQueryClient();
  const { mutate: EditVC } = useMutation({
    mutationFn: (posts) =>
      customFetch.put(`/vacations/${currentIdVacation}`, posts),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["vacation"] });
      toast.success("hehe");
      console.log(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { mutate: DeleteVC } = useMutation({
    mutationFn: (posts) =>
      customFetch.delete(`/vacations/${currentIdVacation}`),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["vacation"] });
      navigate("/");
      console.log(data);
    },
    onError: (error) => {
      console.log(error.message);
      // toast.error(error.response.data.errors.content.msg);
    },
  });

  if (!data) {
    return null;
  }
  const idUser = data.data.data[0].mentions;
  const namesArray = idUser.map((item) => item._id);
  const dataVacation = data.data.data[0];

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
        <div className="inviteUser">
          <GroupAddOutlinedIcon /> INVITE
        </div>
        <div className="buttonEditVacation">
          <Button
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            style={{ color: "black", fontSize: "16px", fontWeight: "500" }}
          >
            <AutoFixNormalOutlinedIcon /> Edit
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem>
              <input
                type="file"
                id="filez"
                style={{ display: "none" }}
                onChange={handleImg}
              />
              <label htmlFor="filez">
                <div className="item">Upload Photo</div>
              </label>
            </MenuItem>
            <MenuItem onClick={handleDele}>Detele Vacaion</MenuItem>
          </Menu>
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
