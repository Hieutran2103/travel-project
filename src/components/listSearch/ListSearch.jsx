/* eslint-disable react/prop-types */
import {Link, useNavigate} from "react-router-dom";
import "./listSearch.scss";
import logoNewfeed from "../../assets/NotFound.svg";
import {useGlobalSearch} from "../../context/Search&Notification";

const ListSearch = ({dataUser}) => {
  console.log(dataUser);
  const {closeSearch} = useGlobalSearch();
  const navigate = useNavigate();

  return (
    <div className="listSearch">
      <div className="listUser">
        {dataUser?.length == 0 ? (
          <div className="div">
            <img src={logoNewfeed} alt="" />
          </div>
        ) : (
          dataUser?.map((post) => {
            return (
              <div
                className="user"
                key={post._id}
                onClick={() => {
                  navigate(`/profile/${post._id}/posts`);
                  window.location.reload();
                }}
              >
                <Link
                  to={`/profile/${post._id}/posts`}
                  style={{textDecoration: "none", color: "inherit"}}
                >
                  <img
                    src={
                      !post?.avatar
                        ? "https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg"
                        : post?.avatar
                    }
                    alt=""
                  />
                </Link>

                <div className="detail">
                  <Link
                    to={`/profile/${post._id}/posts`}
                    style={{textDecoration: "none", color: "inherit"}}
                    onClick={closeSearch}
                  >
                    <span className="name">{post?.name}</span>
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ListSearch;
