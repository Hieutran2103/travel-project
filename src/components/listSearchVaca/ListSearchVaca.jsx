import "./listSearchVaca.scss";
import { Link } from "react-router-dom";

import logoNewfeed from "../../assets/NotFound.svg";
import { useGlobalSearch } from "../../context/Search&Notification";
const ListSearchVaca = ({ dataVacation }) => {
  console.log(dataVacation);
  const { closeSearch } = useGlobalSearch();

  return (
    <div className="listSearchz">
      <div className="listUserz">
        {dataVacation?.length == 0 ? (
          <div className="divz">
            <img src={logoNewfeed} alt="" />
          </div>
        ) : (
          dataVacation?.map((post) => {
            return (
              <div className="userz" key={post?._id}>
                <Link
                  to={`/vacation/${post?._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={closeSearch}
                >
                  <img src={post?.vacation_avatar} alt="" />
                </Link>

                <div className="detailz">
                  <Link
                    to={`/vacation/${post?._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={closeSearch}
                  >
                    <div className="namez">{post?.vacation_name}</div>
                    <div className="namezFounder"> by {post?.user?.name}</div>
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

export default ListSearchVaca;
