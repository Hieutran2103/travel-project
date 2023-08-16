import { useRef, useState } from "react";
import LeftVacation from "./LeftVacation";
import RightVacation from "./RightVacation";
import "./createVacation.scss";
import { ToastContainer, toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils/url";

const CreateVacation = () => {
  const inputRef = useRef(null);
  const [isPublic, setIsPublic] = useState("Công khai");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [something, setSomething] = useState("");
  const [intro, setIntro] = useState("");
  const arrayBegin = [];
  const UserID = [];

  let userAdded = useRef([]);
  let userIDD = useRef([]);

  const [information, setInfomation] = useState({
    name: "",
    something: "",
    intro: "",
    option: "Công khai",
    image: "",
    userAdd: userIDD,
  });
  const handleName = (e) => {
    setName(e.target.value);
    setInfomation({ ...information, [e.target.name]: e.target.value });
  };
  const handleSomething = (e) => {
    setSomething(e.target.value);
    setInfomation({ ...information, [e.target.name]: e.target.value });
  };
  const handleIntro = (e) => {
    setIntro(e.target.value);
    setInfomation({ ...information, [e.target.name]: e.target.value });
  };

  const handleImageClick = () => {
    inputRef.current.click();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setInfomation({
      ...information,
      [e.target.name]: URL.createObjectURL(file),
    });
    setImage(file);
  };
  const handleOption = (e) => {
    setIsPublic(e.target.value);
    setInfomation({ ...information, [e.target.name]: e.target.value });
  };

  const selectUser = (e) => {
    arrayBegin.push(e);
    UserID.push(e.userId);
    let uniqueSet = [...new Set(arrayBegin)];
    let userID = [...new Set(UserID)];
    userIDD.current = userID;
    userAdded.current = uniqueSet;
  };

  const deleteUser = (id) => {
    const newUser = userAdded.current.filter((item) => item.userId !== id);
    userAdded.current = newUser;
    setInfomation({ ...information, userAdd: newUser });
  };

  const queryClient = useQueryClient();
  const { mutate: createTask } = useMutation({
    mutationFn: (taskTitle) =>
      customFetch.post(`/vacations`, {
        vacation_name: taskTitle.name,
        vacation_description: taskTitle.something,
        audience: taskTitle.option === "Công khai" ? 0 : 1,
        mentions: taskTitle.userAdd.current,
        vacation_avatar: taskTitle.image,
        vacation_intro: taskTitle.intro,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["createVacation"] });
      console.log(data);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // setInfomation({ ...information, userAdd: userAdded.current });
    // if (!e.target.elements.image.value) {
    //   return toast.success("Please provide image");
    // }
    // if (!e.target.elements.name.value) {
    //   return toast.error("Please provide name");
    // }
    // if (!e.target.elements.something.value) {
    //   return toast.error("Please provide title");
    // }
    // if (!e.target.elements.intro.value) {
    //   return toast.error("Please provide intro");
    // }
    console.log(information);
    createTask(information);
  };

  return (
    <div className="createVacation">
      <LeftVacation
        handleImageClick={handleImageClick}
        handleImageChange={handleImageChange}
        setImage={setImage}
        isPublic={isPublic}
        inputRef={inputRef}
        setIsPublic={setIsPublic}
        handleName={handleName}
        handleSomething={handleSomething}
        handleIntro={handleIntro}
        handleSubmit={handleSubmit}
        handleOption={handleOption}
        information={information}
        selectUser={selectUser}
        userAdded={userAdded}
        deleteUser={deleteUser}
      />
      <RightVacation
        image={image}
        isPublic={isPublic}
        setName={setName}
        setSomething={setSomething}
        setIntro={setIntro}
        name={name}
        something={something}
        intro={intro}
        name={name}
        something={something}
        intro={intro}
      />
    </div>
  );
};

export default CreateVacation;
