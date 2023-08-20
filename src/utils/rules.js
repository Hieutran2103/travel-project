import * as yup from "yup";

export const schema = yup.object({
  username: yup
    .string()
    .required("username is required")
    .min(3, "Do dai ky tu 3-100")
    .max(100, "Do dai ky tu 3-100"),
  email: yup
    .string()
    .required("email is required")
    .email("email khong dung dinh dang")
    .min(5, "Do dai ky tu 5-100")
    .max(100, "Do dai ky tu 5-100"),
  password: yup
    .string()
    .required("password is required")
    .min(5, "Do dai ky tu 5-15")
    .max(15, "Do dai ky tu 5-15"),
  confirm_password: yup
    .string()
    .required("confirm_password is required")
    .min(5, "Do dai ky tu 5-15")
    .max(15, "Do dai ky tu 5-15")
    .oneOf([yup.ref("password")], "nhap lai mk chua khop"),
});

const handleConfirmPassword = (refString) => {
  return yup
    .string()
    .required("confirm_password is required")
    .min(5, "Do dai ky tu 5-15")
    .max(15, "Do dai ky tu 5-15")
    .oneOf([yup.ref(refString)], "nhap lai mk chua khop");
};

export const userSchema = yup.object({
  old_password: schema.fields["password"],
  password: schema.fields["password"],
  confirm_password: handleConfirmPassword("password"),
});

export const schemaEmail = yup.object({
  email: schema.fields["email"]
})


export const resetPasswordSchema = yup.object({
  password: schema.fields["password"],
  confirm_password: handleConfirmPassword("password")
})
