import { useState } from "react";
import { useGlobalPage } from "../../context/Page";
import { useGlobalSearch } from "../../context/Search&Notification";
import "./specific.scss";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils/url";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const SpecificEdit = ({ setAnchorEl, infoUser }) => {
  const [t, i18] = useTranslation("global");

  const [imageEdit, setImageEdit] = useState(0);
  const { editSpecific, closeEditSpecific } = useGlobalSearch();
  const { imagePost } = useGlobalPage();
  const [hasEnteredFirstValue, setHasEnteredFirstValue] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: EditPost } = useMutation({
    mutationFn: (posts) => customFetch.put(`/posts/${idEdit}`, posts),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["postsNF"] });
      queryClient.invalidateQueries({ queryKey: ["postsVacation"] });
      setDesc("");
      setAnchorEl(null);
      closeEditSpecific();
      toast.success(t("toast.EditPostNF"));
    },
    onError: (error) => {
      toast.error(error.response.data.errors.content.msg);
    },
  });
  if (!imagePost) {
    return null;
  }
  const rs = imagePost?.data?.data?.medias;
  const contentPost = imagePost?.data?.data?.content;
  const [desc, setDesc] = useState(contentPost);
  const idEdit = imagePost?.data?.data?._id;
  if (!idEdit) {
    return null;
  }
  if (!rs) {
    return null;
  }
  if (!infoUser) {
    return null;
  }

  const handleDec = (event) => {
    const newValue = event.target.value;
    // Nếu chưa nhập lần đầu và giá trị nhập vào có chứa khoảng trắng, loại bỏ khoảng trắng
    if (!hasEnteredFirstValue && newValue.includes(" ")) {
      setDesc(newValue.replace(/\s/g, ""));
    } else {
      setDesc(newValue);
      setHasEnteredFirstValue(true);
    }
  };
  const checkNumber = (number) => {
    if (number > rs.length - 1) {
      return (number = 0);
    }
    if (number < 0) {
      return (number = rs.length - 1);
    }
    return number;
  };

  const prevSlide = () => {
    setImageEdit((oldPerson) => {
      const rerult = oldPerson - 1;
      return checkNumber(rerult);
    });
  };

  const nextSlide = () => {
    setImageEdit((oldPerson) => {
      const rerult = oldPerson + 1;
      return checkNumber(rerult);
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    EditPost({
      type: 0,
      audience: 0,
      hashtags: [],
      content: desc,
      medias: rs,
      mentions: [],
      parent_id: null,
    });
  };

  return (
    <div className={editSpecific ? "show-specificEdit" : "specificEdit"}>
      <div className="edittt">
        <form>
          <div className="tren">
            <div
              className="cancel"
              style={{ color: "black" }}
              onClick={closeEditSpecific}
            >
              Cancel
            </div>
            <div className="EditInfo" style={{ color: "black" }}>
              Edit info
            </div>
            <button type="submit" onClick={handleEdit}>
              Done
            </button>
          </div>
          <div className="duoi">
            <div className="showImage">
              {rs?.map((z, indexxX) => {
                return (
                  <div
                    className="slideT"
                    style={{
                      transform: `translateX(${100 * (indexxX - imageEdit)}%)`,
                    }}
                    key={1}
                  >
                    <img className="person-imgT" src={z.url} alt="" />
                  </div>
                );
              })}
              {rs?.length > 1 ? (
                <>
                  <button type="button" className="prevT" onClick={prevSlide}>
                    {" "}
                    <ChevronLeftOutlinedIcon />
                  </button>
                  <button type="button" className="nextT" onClick={nextSlide}>
                    {" "}
                    <ChevronRightOutlinedIcon />
                  </button>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="writeEdit">
              <div className="userCurrent">
                <img
                  src={
                    !infoUser?.avatar
                      ? "https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg"
                      : infoUser?.avatar
                  }
                  alt=""
                />
                <div className="nameUser">{infoUser?.name}</div>
              </div>
              <textarea
                id="w3review"
                name="w3review"
                rows="20"
                cols="50"
                onChange={handleDec}
                value={desc}
                style={{
                  width: "90%",
                  outline: "transparent",
                  border: "transparent",
                  margin: "0 16px",
                  wordWrap: "break-word",
                }}
                placeholder="Write a caption..."
              >
                {contentPost}
              </textarea>
              {/* <input
                type="text"
                style={{
                  width: "90%",
                  outline: "transparent",
                  border: "transparent",
                  margin: "0 16px",
                  wordWrap: "break-word",
                }}
                onChange={handleDec}
                placeholder="Write a caption..."
                value={desc}
              /> */}
            </div>
          </div>
        </form>{" "}
      </div>
    </div>
  );
  s;
};

export default SpecificEdit;
