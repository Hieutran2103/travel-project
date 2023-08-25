import "./listAdd.scss";

const ListAdd = ({ selectUser, data }) => {
  return (
    <div className="listAdd">
      {data?.map((result, id) => {
        return (
          <div className="userAdd" key={id} onClick={() => selectUser(result)}>
            <img
              src={
                !result?.avatar
                  ? "https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg"
                  : result?.avatar
              }
              alt=""
            />
            <div className="detailAdd">
              <span className="nameAdd">{result?.name}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListAdd;
