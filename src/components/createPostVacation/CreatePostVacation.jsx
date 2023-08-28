import { useState } from "react";
import { useGlobalContextAuth } from "../../context/AuthContext";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { useTranslation } from "react-i18next";
import customFetch from "../../utils/url";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useGlobalPage } from "../../context/Page";

const CreatePostVacation = ({ dataVacation }) => {
  const { currentUser } = useGlobalContextAuth();
  const [t, i18] = useTranslation("global");
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const { setPage } = useGlobalPage();

  const queryClient = useQueryClient();
  const { mutate: createPostVC } = useMutation({
    mutationFn: (posts) =>
      customFetch.post("/vacations/vacation-status", posts),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["postsVacation"] });
      setPage(1);
      setDesc("");
      setFile("");
      toast.success(t("toast.successPostNF"));
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
    createPostVC({
      type: 0,
      audience: 0,
      hashtags: [],
      content: desc,
      medias: imgUrl.result,
      mentions: [],
      parent_id: null,
      vacation_id: dataVacation._id,
    });
  };

  const handleImg = (e) => {
    setFile(e.target.files);
  };
  const handleDec = (e) => {
    setDesc(e.target.value);
  };

  return (
    <div className="createPost">
      <div className="container">
        <div className="top">
          <div className="left">
            <img
              src={
                !currentUser?.avatar
                  ? "https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg"
                  : currentUser?.avatar
              }
              alt=""
            />

            <input
              type="text"
              placeholder={`${t("newfeed.inputPost")} ${currentUser?.name}?`}
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
          </div>
          <div className="right" onClick={handleShare}>
            <button>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostVacation;
