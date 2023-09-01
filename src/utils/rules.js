import * as yup from "yup";

export const schema = yup.object({
  name: yup
    .string()
    .required("username is required")
    .min(3, "Độ dài ký tự từ 3-100")
    .max(100, "Độ dài ký tự từ 3-100"),
  email: yup
    .string()
    .required("email is required")
    .email("email không đúng định dạng")
    .min(5, "Độ dài ký tự từ 5-100")
    .max(100, "Độ dài ký tự từ 5-100"),
  password: yup
    .string()
    .required("password is required")
    .min(5, "Độ dài ký tự từ 5-15")
    .max(15, "Độ dài ký tự từ 5-15"),
  confirm_password: yup
    .string()
    .required("confirm_password is required")
    .min(5, "Độ dài ký tự từ 5-15")
    .max(15, "Độ dài ký tự từ 5-15")
    .oneOf([yup.ref("password")], "Nhập lại mật khẩu chưa khớp"),
});

const handleConfirmPassword = (refString) => {
  return yup
    .string()
    .required("confirm_password is required")
    .min(5, "Độ dài ký tự từ 5-15")
    .max(15, "Độ dài ký tự từ 5-15")
    .oneOf([yup.ref(refString)], "Nhập lại mật khẩu chưa khớp");
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
    .min(3, "Độ dài ký tự từ 3-100")
    .max(100, "Độ dài ký tự từ 3-100"),
  location: yup
    .string()
    .required("location is required")
    .min(8, "Độ dài ký tự từ 8-12")
    .max(12, "Độ dài ký tự từ 8-12"),
  avatar: yup.string(),
  website: yup.string().required("website is required"),
  bio: yup.string().required("bio is required"),
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
