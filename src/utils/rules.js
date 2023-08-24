import * as yup from "yup";

export const schema = yup.object({
  name: yup
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

export const userSchema2 = yup.object({
  username: yup
    .string()
    .required("username is required")
    .min(3, "Do dai ky tu 3-100")
    .max(100, "Do dai ky tu 3-100"),
  telephone: yup
    .string()
    .required("telephone is required")
    .min(8, "Do dai ky tu tu 8-12")
    .max(12, "Do dai ky tu tu 8-12"),
  address: yup.string().required("address is required"),
  date: yup.string().required("date is required"),
});

export const schemaEmail = yup.object({
  email: schema.fields["email"],
  password: schema.fields["password"],
  // linh mới them pasword vào đây ae nhé
});

export const resetPasswordSchema = yup.object({
  password: schema.fields["password"],
  confirm_password: handleConfirmPassword("password"),
});
export const schemaLogin = yup.object({
  email: schema.fields["email"],
  password: schema.fields["password"],
});
