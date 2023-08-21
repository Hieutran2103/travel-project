import { useContext, useEffect, useState } from "react";
import "./createPost.scss";
import { useGlobalContextAuth } from "../../context/AuthContext";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import customFetch from "../../utils/url";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useGlobalPage } from "../../context/Page";
const CreatePost = () => {
  const { currentUser } = useGlobalContextAuth();
  const [t, i18] = useTranslation("global");
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const { setPage } = useGlobalPage();

  const queryClient = useQueryClient();
  const { mutate: createTask } = useMutation({
    mutationFn: (posts) => customFetch.post("/posts", posts),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["postsNF"] });
      setPage(1);
      setDesc("");
      setFile("");
      toast.success("Successfully created post");
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
      toast.error("error");
    },
  });

  const UpLoadImg = async () => {
    try {
      const formData = new FormData();
      for (let i = 0; i < file.length; i++) {
        formData.append("image", file[i]);
      }
      const res = await customFetch.post("/medias/upload-image", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) {
      imgUrl = await UpLoadImg();
    }
    createTask({
      type: 0,
      audience: 0,
      hashtags: [],
      content: desc,
      medias: imgUrl.result,
      mentions: [],
      parent_id: null,
    });
  };

  const handleImg = (e) => {
    setFile(e.target.files);
  };
  const handleDec = (e) => {
    setDesc(e.target.value);
  };

  return (
    <div className="createPost" id="createPosts">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={currentUser.profilePic} alt="" />
            <input
              type="text"
              placeholder={`${t("newfeed.inputPost")} ${currentUser.name}?`}
              onChange={handleDec}
              value={desc}
            />
          </div>

          <div className="right">
            {file && (
              <img
                src={file ? URL.createObjectURL(file[0]) : null}
                className="file"
                alt=""
              />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              multiple
              onChange={handleImg}
            />
            <label htmlFor="file">
              <div className="item">
                <span className="logo">
                  <AddPhotoAlternateOutlinedIcon />
                </span>
                <span>{t("newfeed.addPost")}</span>
              </div>
            </label>
            <div className="item">
              <span className="logo">
                <CollectionsOutlinedIcon />
              </span>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/createVacation"
              >
                <span>{t("newfeed.createPost")}</span>
              </Link>
            </div>
          </div>
          <div className="right" onClick={handleShare}>
            <button>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
