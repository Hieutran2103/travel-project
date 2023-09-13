import { Link } from "react-router-dom";
import "./setting.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputUser from "../../components/input/inputUsers";
import { userSchema2 } from "../../utils/rules";
import { useMutation, useQuery } from "@tanstack/react-query";
import customFetch from "../../utils/url";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useGlobalContextAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Setting = () => {
  const inputRef = useRef(null);
  const { currentUser, setCurrentUser } = useGlobalContextAuth();
  const [image, setImage] = useState(currentUser?.avatar);
  // const [t, i18] = useTranslation("global");
  

  const previewImage = useMemo(() => {
    return image
      ? image
      : '';
  }, [image]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(userSchema2),
    defaultValues: {
      name: "",
      bio: "",
      location: "",
      website: "",
      date_of_birth: new Date(1990, 1, 1),
      username: "",
      // avatar: "",
    },
  });

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file);
    let res = await customFetch.post("/medias/upload-single-image", formData);

    // setValue('avatar', res.data.result)
    // console.log(res);
    setImage(res.data.result);
  };

  const settingAccount = useMutation({
    mutationFn: (data) =>
      customFetch.patch("/users/update-user-infor", {
        name: data.name,
        location: data.location,
        website: data.website,
        bio: data.bio,
        date_of_birth: data.date_of_birth?.toISOString(),
        username: data.username,
        avatar: image,
      }),
    onSuccess: (data) => {
      console.log(data);
      // toast.success(t("auth.success"));
      
      setCurrentUser(
        localStorage.setItem("user", JSON.stringify(data.data.data))
      );
      refetch()
      window.location.reload();
    },
  });

  const formSubmit = handleSubmit((data) => {
    settingAccount.mutate(data);

    // console.log(data)
  });

  const { data, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: () => customFetch.get("/users/get-profile")
  })

  const profile = data?.data.user

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('location', profile.location)
      setValue('website', profile.website)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
      // setValue('avatar', profile.avatar)
      setValue('bio', profile.bio)
      setValue('username', profile.username)
    }
  }, [profile, setValue])

  const getAvtUser = () => {
    return currentUser?.avatar? currentUser?.avatar : "https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg"
  }

  return (
    <>
      <div className="container-set">
      
        <h1>Settings</h1>
        <div className="form-box">
          <div className="nav">
            <div className="icon">
              <i className="fa-solid fa-gear" />
            </div>
            <button>Account infor</button>
            <button>
              <Link to="/setting/password" className="link-setting">
                Password
              </Link>
            </button>
          </div>
          <div className="menu-detail">
            <div className="left">
              <div className="form">
                <form noValidate onSubmit={formSubmit}>
                  <h2>Account infor</h2>
                  <InputUser
                    spanName="Name"
                    placeholder="enter your name..."
                    name="name"
                    type="text"
                    register={{ ...register("name") }}
                    errormessage={errors.username?.message}
                  />
                  <InputUser
                    spanName="Username"
                    placeholder="enter your username..."
                    name="username"
                    type="text"
                    register={{ ...register("username") }}
                    errormessage={errors.username?.message}
                  />
                  <InputUser
                    spanName="Bio"
                    placeholder="enter your bio..."
                    name="bio"
                    type="text"
                    register={{ ...register("bio") }}
                    errormessage={errors.bio?.message}
                  />
                  <InputUser
                    spanName="Location"
                    placeholder="enter your location..."
                    name="location"
                    type="text"
                    register={{ ...register("location") }}
                    errormessage={errors.location?.message}
                  />
                  <InputUser
                    spanName="Website"
                    placeholder="enter your website..."
                    name="website"
                    type="text"
                    register={{ ...register("website") }}
                    errormessage={errors.website?.message}
                  />

                  <InputUser
                    spanName="Date"
                    // placeholder="enter your name..."
                    name="date_of_birth"
                    type="date"
                    register={{ ...register("date_of_birth") }}
                    errormessage={errors.date?.message}
                  />

                  <button type="submit">Save</button>
                </form>
              </div>
            </div>
            <div className="right">
              <img
                src={previewImage || getAvtUser()}
                // src={
                //   !image ? currentUser?.avatar : previewImage 
                // }
                alt=""
              />
              {/* <button>Set avatar</button> */}
              <div className="uploadImage" onClick={handleImageClick}>
                Set avatar
                <input
                  type="file"
                  ref={inputRef}
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  name="image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
