/* eslint-disable react/prop-types */

export default function InputUser({
  spanName,
  register,
  errormessage,
  placeholder,
  type,
}) {
  // const registerResult = register && name ? register(name) : null;
  return (
    <div className="input-group">
      <span>{spanName}</span>
      <input type={type} placeholder={placeholder} {...register} />
      <div style={{ minHeight: 20, color: "#FF0000" }}>{errormessage}</div>
    </div>
  );
}
