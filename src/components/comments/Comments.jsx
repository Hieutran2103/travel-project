import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useGlobalContextAuth } from "../../context/AuthContext";
import "./comments.scss";
import SendIcon from "@mui/icons-material/Send";
import customFetch from "../../utils/url";
import { useGlobalPage } from "../../context/Page";
import moment from "moment";
import { Link } from "react-router-dom";
import { useState } from "react";

const Comments = ({ postID }) => {
  const { currentUser } = useGlobalContextAuth();
  const { pageComment, limitComment } = useGlobalPage();
  const [descomment, setDescomment] = useState("");

  const queryClient = useQueryClient();
  const { mutate: createComment } = useMutation({
    mutationFn: (comment) => customFetch.post("/comments", comment),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      setDescomment("");
    },
    onError: (error) => {
      console.log(error);
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

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="Write a comment..."
          value={descomment}
          onChange={(e) => setDescomment(e.target.value)}
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
