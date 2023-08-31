import { useRef, useState } from "react";
import LeftVacation from "./LeftVacation";
import RightVacation from "./RightVacation";
import "./createVacation.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils/url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const CreateVacation = () => {
  const inputRef = useRef(null);
  const [isPublic, setIsPublic] = useState("Công khai");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [something, setSomething] = useState("");
  const [intro, setIntro] = useState("");
  const [items, setItems] = useState([]);
  const [idUser, IdUser] = useState([]);
  const navigate = useNavigate();
  const [t, i18] = useTranslation("global");

  const [information, setInfomation] = useState({
    name: "",
    something: "",
    intro: "",
    option: "Công khai",
    image: "",
    userAdd: idUser,
  });
  const handleName = (e) => {
    const newName = e.target.value;
    if (newName.length <= 20) {
      setName(newName);
      setInfomation({ ...information, [e.target.name]: newName });
    }
  };
  const handleSomething = (e) => {
    const newSomething = e.target.value;
    if (newSomething.length <= 300) {
      setSomething(newSomething);
      setInfomation({ ...information, [e.target.name]: newSomething });
    }
  };
  const handleIntro = (e) => {
    const newIntro = e.target.value;
    if (newIntro.length <= 200) {
      setIntro(newIntro);
      setInfomation({ ...information, [e.target.name]: newIntro });
    }
  };

  const handleImageClick = () => {
    inputRef.current.click();
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file);
    let res = await customFetch.post("/medias/upload-single-image", formData);

    setInfomation({
      ...information,
      [e.target.name]: res.data.result,
    });
    console.log(res);
    setImage(res.data.result);
  };
  const handleOption = (e) => {
    setIsPublic(e.target.value);
    setInfomation({ ...information, [e.target.name]: e.target.value });
  };

  const selectUser = (e) => {
    if (items.includes(e)) return;
    const newItems = [...items, e];
    const newItemsID = [...idUser, e._id];
    console.log(items);
    setItems(newItems);
    IdUser(newItemsID);
    setInfomation({ ...information, userAdd: newItemsID });
  };

  const deleteUser = (id) => {
    const newUser = items.filter((item) => item._id !== id);
    const newItemsID = idUser.filter((item) => item !== id);
    setItems(newUser);
    IdUser(newItemsID);
    setInfomation({ ...information, userAdd: newItemsID });
  };

  const queryClient = useQueryClient();
  const { mutate: createTask } = useMutation({
    mutationFn: (taskTitle) =>
      customFetch.post(`/vacations`, {
        vacation_name: taskTitle.name,
        vacation_description: taskTitle.something,
        audience: taskTitle.option === "Công khai" ? 0 : 1,
        mentions: taskTitle.userAdd,
        vacation_avatar: taskTitle.image,
        vacation_intro: taskTitle.intro,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["createVacation"] });
      toast.success(t("vacation.success"));
      setTimeout(() => {
        navigate(`/vacation/${data.data.data._id}`);
        window.location.reload();
      }, 1000);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!e.target.elements.image.value) {
      return toast.error(t("vacation.image"));
    }
    if (!e.target.elements.name.value) {
      return toast.error(t("vacation.name"));
    }
    if (!e.target.elements.something.value) {
      return toast.error(t("vacation.title"));
    }
    if (!e.target.elements.intro.value) {
      return toast.error(t("vacation.intro"));
    }
    console.log(information);
    createTask(information);
  };

  return (
    <div className="createVacation">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
        items={items}
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
      />
    </div>
  );
};

export default CreateVacation;
