import "./listAdd.scss";

const ListAdd = ({ results, selectUser }) => {
  return (
    <div className="listAdd">
      {results.map((result, id) => {
        return (
          <div className="userAdd" key={id} onClick={() => selectUser(result)}>
            <img src={result.profilePic} alt="" />
            <div className="detailAdd">
              <span className="nameAdd">{result.name}</span>
              <span className="followerAdd">100 follower</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListAdd;
