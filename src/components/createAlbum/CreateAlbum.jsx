import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils/url";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

function CreateAlbum() {
  const [input, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");

  const queryClient = useQueryClient();
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
      album_name: input.name,
      album_description: input.description,
      audience: 0,
      medias: imgUrl.result,
    });
  };

  const handleImg = (e) => {
    setFile(e.target.files);
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <div>
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
      <div>
        <div>
          Name
          <input type="text" name="name" onChange={handleChange} />
        </div>
        <div>
          Desc
          <input type="text" name="description" onChange={handleChange} />
        </div>
        <input type="file" id="file" multiple onChange={handleImg} />
      </div>
      <button onClick={handleCreate}>Create</button>
    </div>
  );
}

export default CreateAlbum;
