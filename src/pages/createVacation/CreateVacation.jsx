import { useRef, useState } from "react";
import LeftVacation from "./LeftVacation";
import RightVacation from "./RightVacation";
import "./createVacation.scss";

const CreateVacation = () => {
  const inputRef = useRef(null);
  const [isPublic, setIsPublic] = useState("Công khai");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [something, setSomething] = useState("");
  const [intro, setIntro] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleSomething = (e) => {
    setSomething(e.target.value);
  };
  const handleIntro = (e) => {
    setIntro(e.target.value);
  };

  const handleImageClick = () => {
    inputRef.current.click();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(file);
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
