import React, {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import customFetch from "../../utils/url";
import {toast} from "react-toastify";
import {ToastContainer} from "react-toastify";
import {ImageList, ImageListItem} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import {useGlobalContextAuth} from "../../context/AuthContext";
import "./createAlbum.scss";

function CreateAlbum() {
  const {currentUser} = useGlobalContextAuth();
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  const [imageNames, setImageNames] = useState([]);
  const [unSelectedFile, setunSelectedFile] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const userID = currentUser._id;

  const {mutate: createTask} = useMutation({
    mutationFn: (album) => customFetch.post("/albums", album),
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ["albumsNF"]});
      setName("");
      setDesc("");
      setFile("");
      toast.success("Successfully created album");
      setTimeout(() => {
        navigate(`/profile/${userID}/albums`);
      }, 3000);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error");
    },
  });

  const UpLoadImg = async () => {
    try {
      const formData = new FormData();
      for (let i = 0; i < file.length; i++) {
        formData.append("image", file[i]);
      }
      const res = await customFetch.post("/medias/upload-image", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) {
      imgUrl = await UpLoadImg();
    }
    createTask({
      album_name: name,
      album_description: desc,
      audience: 0,
      medias: imgUrl.result,
    });
  };

  const handleImg = (e) => {
    if (e.dataTransfer && e.dataTransfer.files) {
      const selectedFiles = Array.from(e.dataTransfer.files);
      setFile(selectedFiles);
      setunSelectedFile(selectedFiles.length > 0);
    } else if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFile(selectedFiles);
      setunSelectedFile(selectedFiles.length > 0);
    }
  };

  const handleDropAreaDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropAreaDrop = (e) => {
    e.preventDefault();
    handleImg(e);
  };

  const handleDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleImageNameChange = (index, newName) => {
    const updatedNames = [...imageNames];
    updatedNames[index] = newName;
    setImageNames(updatedNames);
  };

  return (
    <div className="createAlbum">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div class="container">
        <Link
          to={`/profile/${userID}/albums`}
          className="link"
          style={{textDecoration: "none"}}
        >
          <div class="button button--piyo">
            <div class="button__wrapper">
              <span class="button__text">BACK</span>
            </div>
          </div>
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "50px",
          fontWeight: 600,
        }}
      >
        Create Album
      </div>
      <div className="mainCon">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            cursor: "pointer",
          }}
        >
          <div onClick={handleCreate} class="button button--piyo">
            <div class="button__wrapper">
              <span class="button__text">CREATE</span>
            </div>
            <div class="characterBox">
              <div class="character wakeup">
                <div class="character__face"></div>
              </div>
              <div class="character wakeup">
                <div class="character__face"></div>
              </div>
              <div class="character">
                <div class="character__face"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="input">
          <input
            type="text"
            id="album_name"
            name="album_name"
            onChange={handleName}
            placeholder="Album Name "
            className="inputText"
            value={name}
          />
          <input
            type="text"
            id="album_description"
            name="album_description"
            onChange={handleDesc}
            placeholder="Album Description"
            className="inputText"
            value={desc}
          />
        </div>
      </div>
      <hr className="line" />
      {!unSelectedFile && (
        <div
          onDragOver={handleDropAreaDragOver}
          onDrop={handleDropAreaDrop}
          onChange={handleImg}
          className="uploadFile"
        >
          <div className="input">
            <input
              type="file"
              id="file"
              multiple
              style={{
                display: "none",
              }}
            />
            <label
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                fontWeight: 800,
                paddingBottom: "40px",
              }}
              className="labelInput"
              htmlFor="file"
            >
              Choose a file or drag it here.
              <div>
                <FileUploadOutlinedIcon
                  className="icon"
                  sx={{fontSize: "100px"}}
                />
              </div>
            </label>
          </div>
        </div>
      )}
      {file && (
        <ImageList
          cols={4}
          gap={10}
          style={{marginTop: "20px", marginLeft: "5px", marginRight: "5px"}}
        >
          {file.map((selectedFile, index) => (
            <ImageListItem key={index}>
              <img
                src={URL.createObjectURL(selectedFile)}
                alt={`Selected ${index + 1}`}
                style={{width: "100%"}}
              />
              <div
                style={{
                  height: "100px",
                  background: "#d6d6d6",
                  borderRadius: "10px",
                  borderTopRightRadius: "0px",
                  borderTopLeftRadius: "0px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <input
                  required=""
                  type="text"
                  name="text"
                  autoComplete="none"
                  value={imageNames[index] || ""}
                  onChange={(e) => handleImageNameChange(index, e.target.value)}
                  style={{
                    width: "90%",
                    height: "70px",
                    border: "none",
                  }}
                  placeholder="Description"
                />
              </div>
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </div>
  );
}

export default CreateAlbum;
