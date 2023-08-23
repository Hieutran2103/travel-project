import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useGlobalContextAuth } from "../../context/AuthContext";
import "./comments.scss";
import SendIcon from "@mui/icons-material/Send";
import customFetch from "../../utils/url";
import { useGlobalPage } from "../../context/Page";
import moment from "moment";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const Comments = ({ postID, user }) => {
  const { currentUser } = useGlobalContextAuth();
  const { pageComment, limitComment, setComment, comment } = useGlobalPage();
  const [descomment, setDescomment] = useState("");
  const [hasEnteredFirstValue, setHasEnteredFirstValue] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: createComment } = useMutation({
    mutationFn: (comment) => customFetch.post("/comments", comment),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      setComment(comment + 1);
      setDescomment("");
    },
    onError: (error) => {
      toast.error(error.response.data.errors.comment.msg);
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["comments"],
    queryFn: () =>
      customFetch.get(
        `/comments/${postID}?limit=${limitComment}&page=${pageComment}`
      ),
  });
  if (!data) {
    return null;
  }
  const reponse = data.data.data;

  const handleComment = async (e) => {
    e.preventDefault();
    createComment({
      status_id: postID,
      comment: descomment,
    });
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    // Nếu chưa nhập lần đầu và giá trị nhập vào có chứa khoảng trắng, loại bỏ khoảng trắng
    if (!hasEnteredFirstValue && newValue.includes(" ")) {
      setDescomment(newValue.replace(/\s/g, ""));
    } else {
      setDescomment(newValue);
      setHasEnteredFirstValue(true);
    }
  };
  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="Write a comment..."
          value={descomment}
          onChange={handleInputChange}
        />
        <span onClick={handleComment}>
          <SendIcon style={{ fontSize: "20px" }} />
        </span>
      </div>
      {reponse.map((comment, index) => {
        return (
          <div className="comment" key={index}>
            <img
              src={
                !comment.user.avatar
                  ? "https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg"
                  : comment.user.avatar
              }
              alt=""
            />
            <div className="info">
              <Link
                to={`/profile/${comment.user_id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span>{comment.user.name}</span>
              </Link>
              <p>{comment.comment}</p>
            </div>
            <span className="date">{moment(comment.updated_at).fromNow()}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
