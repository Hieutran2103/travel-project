import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils/url";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "./createAlbum.scss";
import { ImageList, ImageListItem } from "@mui/material";
import { Link } from "react-router-dom";

function CreateAlbum() {
  // const [input, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  const [imageNames, setImageNames] = useState([]);

  const queryClient = useQueryClient();

  let userID = "";
  const userJSON = localStorage.getItem("user");
  if (userJSON) {
    userID = JSON.parse(userJSON);
  }

  const { mutate: createTask } = useMutation({
    mutationFn: (album) => customFetch.post("/albums", album),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["albumsNF"] });
      setName("");
      setDesc("");
      setFile("");
      toast.success("Successfully created album");
      console.log(data);
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
        formData.append("image", file[0]);
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
    const selectedFiles = Array.from(e.target.files);
    setFile(selectedFiles);
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
        autoClose={3000}
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
          to={`/profile/${userID.id}/`}
          className="link"
          style={{ textDecoration: "none" }}
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
          fontSize: "35px",
        }}
      >
        Create Album
      </div>
      <div className="mainCon">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="input">
            <input
              type="file"
              id="file"
              multiple
              onChange={handleImg}
              style={{
                display: "none",
              }}
            />
            <label className="labelInput" htmlFor="file">
              Upload Photo
            </label>
          </div>
          <div class="container">
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
      {file && (
        <ImageList
          cols={3}
          gap={10}
          style={{ marginTop: "20px", marginLeft: "5px", marginRight: "5px" }}
        >
          {file.map((selectedFile, index) => (
            <ImageListItem key={index}>
              <img
                src={URL.createObjectURL(selectedFile)}
                alt={`Selected ${index + 1}`}
                style={{ width: "100%" }}
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
