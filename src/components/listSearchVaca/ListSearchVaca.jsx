import "./listSearchVaca.scss";
import { useNavigate } from "react-router-dom";
import logoNewfeed from "../../assets/NotFound.svg";

const ListSearchVaca = ({ dataVacation }) => {
  const navigate = useNavigate();
  console.log(dataVacation);

  const navigaVacation = (e) => {
    navigate(`/vacation/${e?._id}`);
    window.location.reload();
  };

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
              <div
                className="userz"
                key={post?._id}
                onClick={() => {
                  navigaVacation(post);
                }}
              >
                <img src={post?.vacation_avatar} alt="" />
                <div className="detailz">
                  <div className="namez">{post?.vacation_name}</div>
                  <div className="namezFounder"> by {post?.user?.name}</div>
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
