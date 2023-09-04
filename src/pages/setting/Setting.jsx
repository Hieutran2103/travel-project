import { Link, useLocation } from "react-router-dom";
import "./setting.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputUser from "../../components/input/inputUsers";
import { userSchema2 } from "../../utils/rules";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../utils/url";

const Setting = () => {
  const location = useLocation();
  console.log(location.state);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema2),
    defaultValues: {
      username: "",
      bio: "",
      location: "",
      website: "",
      date: "",
    },
  });

  const settingAccount = useMutation({
    mutationFn: (data) =>
      customFetch.patch("/users/update-user-infor", {
        name: data.name,
        location: data.location,
        website : data.website,
        bio:data.bio,
        date: data.date,
      }),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const formSubmit = (data) => {
    settingAccount.mutate(data);
  };
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
                <form noValidate onSubmit={handleSubmit(formSubmit)}>
                  <h2>Account infor</h2>
                  <InputUser
                    spanName="Username"
                    placeholder="enter your name..."
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
                    name="date"
                    type="date"
                    register={{ ...register("date") }}
                    errormessage={errors.date?.message}
                  />

                  <button>Save</button>
                </form>
              </div>
            </div>
            <div className="right">
              <img
                src="https://toigingiuvedep.vn/wp-content/uploads/2022/01/anh-meo-cute.jpg"
                alt=""
              />
                <button>Set avatar</button>

             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
